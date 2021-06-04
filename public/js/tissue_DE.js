// JavaScript code for the page tissue_DE.html
// Part of the TissueOpticsApp
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

// Variable declaration
let Spectra; // Variable containing the Spectra used in the app
let muChart; // Variable pointing to the chart object containing mua and mus
let DEChart; // Variable pointing to the chart object containing the diffusion equation results

// Initialise buttons to update the graph
const button = document.getElementById('update');
button.addEventListener('click', async event => {
    updateCharts();
});

// Operation donn when the page is opened
getData()
    .then(response => {
        Spectra = response;
        plotMuaMus()
            .then(response => {
                muChart = response;
                plotDE()
                    .then(response => {
                        DEChart = response;
                    });
            });
    });

// Functions
async function getData() { // Function to load all the necessary data
    const data = await fetch("ChromophoresAbsorptionSpectra.json");
    const chrom = await data.json();
    return chrom;
}

async function plotMuaMus() { // Function to plot the graph with mua and mus
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);

    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);

    const ctx = document.getElementById('chart_mua_mus').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    yAxisID: 'y_abs',
                    label: 'Absorption',
                    data: absorption,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {   
                    yAxisID: 'y_scat',
                    label: 'Scattering',
                    data: mus,
                    backgroundColor: 'rgba(99, 0, 255, 0.2)',
                    borderColor: 'rgba(99, 0, 255, 1)',
                    borderWidth: 1
                },
            ]
        },
        options: {
            elements:{
                point: {
                    radius: 0
                }
            },
            scales: {
                y_abs: {
                    position: 'left',
                    type: 'logarithmic',
                    min: 10,
                    title: {
                        display: 'true',
                        text: 'Absorption'
                    },
                },
                y_scat: {
                    position: 'right',
                    type: 'linear',
                    min: 0.01,
                    title: {
                        display: 'true',
                        text: 'Scattering'
                    },
                },
                x: {
                    title: {
                        display: 'true',
                        text: 'Wavelength (nm)'
                    }
                }
            }
        }
    });
    return myChart;
}

async function plotDE() { // Function to plot the graph with diffusion equation results
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);

    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);

    const SDD = document.getElementById("SDD").value;
    const P0 = document.getElementById("power").value;
    const flu_infinite = CWInfinite(absorption,mus,SDD,P0);

    const Depth = document.getElementById("depth").value;
    const ri = document.getElementById("ri").value;
    const flu_semi = CWsemi(absorption,mus,SDD,Depth,P0,ri);

    const refl = CWout(absorption,mus,SDD,P0,ri);

    const ctx = document.getElementById('chart_DE').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    label: 'Infinite medium',
                    data: flu_infinite,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Semi-infinite medium',
                    data: flu_semi,
                    backgroundColor: 'rgba(0, 99, 132, 0.2)',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Semi-infinite medium',
                    data: refl,
                    backgroundColor: 'rgba(0, 99, 0, 0.2)',
                    borderColor: 'rgba(0, 99, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            elements:{
                point: {
                    radius: 0
                }
            },
            scales: {
                y: {
                    position: 'left',
                    type: 'linear',
                    min: 0,
                    title: {
                        display: 'true',
                        text: 'Fluence rate and reflectance'
                    },
                },
                x: {
                    title: {
                        display: 'true',
                        text: 'Wavelength (nm)'
                    }
                }
            }
        }
    });
    return myChart
}

function updateCharts() { // Function to update the chart
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);
    muChart.data.datasets[0].data = absorption;

    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);
    muChart.data.datasets[1].data = mus;

    const SDD = document.getElementById("SDD").value;
    const P0 = document.getElementById("power").value;
    const flu_infinite = CWInfinite(absorption,mus,SDD,P0);
    DEChart.data.datasets[0].data = flu_infinite;

    const Depth = document.getElementById("depth").value;
    const ri = document.getElementById("ri").value;
    const flu_semi = CWsemi(absorption,mus,SDD,Depth,P0,ri);
    DEChart.data.datasets[1].data = flu_semi;

    const refl = CWout(absorption,mus,SDD,P0,ri);
    DEChart.data.datasets[2].data = refl;

    let minSlidePos = parseInt(document.getElementById('wv_min').value);
    let maxSlidePos = parseInt(document.getElementById('wv_max').value);

    wv_minSlide = 13.20*minSlidePos+260;
    wv_maxSlide = 13.20*maxSlidePos+260;

    wv_min = Math.min(wv_minSlide,wv_maxSlide)
    wv_max = Math.max(wv_minSlide,wv_maxSlide)

    if(wv_min < 260) {
        wv_min = 260;
        document.getElementById('wv_min').value = "260";
    };
    if(wv_max > 1580) {
        wv_max = 1580;
        document.getElementById('wv_min').value = "1580";
    };

    muChart.options.scales.x.min = wv_min;
    muChart.options.scales.x.max = wv_max;
    muChart.update();

    DEChart.options.scales.x.min = wv_min;
    DEChart.options.scales.x.max = wv_max;
    DEChart.update();
};

function changeWV() { // Function to react to the modification of the wavelength sliders
    let minSlidePos = parseInt(document.getElementById('wv_min').value);
    let maxSlidePos = parseInt(document.getElementById('wv_max').value);

    wv_minSlide = 13.20*minSlidePos+260;
    wv_maxSlide = 13.20*maxSlidePos+260;

    wv_min = Math.min(wv_minSlide,wv_maxSlide)
    wv_max = Math.max(wv_minSlide,wv_maxSlide)
    muChart.options.scales.x.min = wv_min;
    muChart.options.scales.x.max = wv_max;
    muChart.update();

    DEChart.options.scales.x.min = wv_min;
    DEChart.options.scales.x.max = wv_max;
    DEChart.update();
}

function CWInfinite(mua,mus,SDD,P0) { // Function to calculate the DE for an infinite medium
    const mueff = calcTissueMueff(mua,mus);
    var i;

    var fluence = [];
    for(i = 0; i < mua.length; i++){
        fl = P0*mueff[i]*mueff[i]/(4*Math.PI*mua[i]*SDD)*Math.exp(-mueff[i]*SDD);
        fluence.push(fl);
    }
    return fluence;

}

function CWout(mua,mus,SDD,P0,ri) { // Function to calculate the DE in reflectance
    const c0 = 299792458;
    const c = c0/ri;

    const mueff = calcTissueMueff(mua,mus);
    const muc = Math.cos(Math.asin(c/c0));
    const r0 = ((c0-c)/(c0+c))*((c0-c)/(c0+c));
    const kappa = ((1-r0)*(1-muc*muc))/(1+r0+(1-r0)*muc*muc*muc);
    const gamma = P0/(4*Math.PI);

    var i;
    var reflectance = [];
    for(i = 0; i<mua.length; i++){
        const diff = 1/(3*mua[i]*mus[i]);
        const ze = 2*diff/kappa;
        const z00 = 1/mus[i];
        const zp0 = -(2*ze+z00);
        const ro2 = Math.sqrt(SDD*SDD+z00*z00);
        const rp2 = Math.sqrt(SDD*SDD+zp0*zp0);

        const refl = gamma*(z00*(mueff[i]+1/ro2)*Math.exp(-mueff[i]*ro2)/(ro2*ro2)-zp0*(mueff[i]+1/rp2)*Math.exp(-mueff[i]*rp2)/(rp2*rp2));
        reflectance.push(refl);
    }
    return reflectance;
}

function CWsemi(mua,mus,SDD,Depth,P0,ri) { // Function to calculate the DE for a semi infinite medium
    const c0 = 299792458;
    const c = c0/ri;
    const mueff = calcTissueMueff(mua,mus);
    const muc = Math.cos(Math.asin(c/c0));
    const r0 = ((c0-c)/(c0+c))*((c0-c)/(c0+c));
    const kappa = ((1-r0)*(1-muc*muc))/(1+r0+(1-r0)*muc*muc*muc);

    var i;
    var fluence = [];

    for(i = 0; i<mua.length; i++){
        const diff = 1/(3*mua[i]*mus[i]);
        const ze = 2*diff/kappa;
        const z00 = 1/mus[i];
        const zp0 = -(2*ze+z00);
        const gamma = P0*mueff[i]*mueff[i]/(4*Math.PI*mua[i]);
        const ro2 = Math.sqrt(SDD*SDD+(z00-Depth)*(z00-Depth));
        const rp2 = Math.sqrt(SDD*SDD+(zp0-Depth)*(zp0-Depth));

        const fl = gamma*(Math.exp(-mueff[i]*ro2)/ro2-Math.exp(-mueff[i]*rp2)/rp2);
        fluence.push(fl);
    }
    return fluence;
}

function calcTissueMueff(mua,mus) {
    var mueff = [];
    var i;

    for (i=0; i<mua.length; i++){
        const m = Math.sqrt(3*mua[i]*mus[i]);
        mueff.push(m);
    }
    return mueff;
}

function calcTissueScat(a_Ray,a_Mie,b_Mie,wl) { // Function to calculate mus
    var Sca = [];
    var i;

    for (i = 0; i < wl.length; i++) {
        const s = a_Ray*Math.exp(-4*Math.log(wl[i]/500))+a_Mie*Math.exp(-b_Mie*Math.log(wl[i]/500));
        Sca.push(s);
    }
    return Sca;
}

function calcTissueMueff(mua,mus) {
    var mueff = [];
    var i;

    for (i=0; i<mua.length; i++){
        const m = Math.sqrt(3*mua[i]*mus[i]);
        mueff.push(m);
    }
    return mueff;
}

function calcTissueAbs(cBlood,cWater,cLipid,Saturation,spectra) { // Function to calculate the absorption spectrum of the tissue
    const absorption = [];
    const cHb = (cBlood*(1-Saturation/100))/100;
    const cHbO = (cBlood*Saturation/100)/100;
    var i;
    for (i = 0; i < spectra.hb.length; i++) {
        const abs = cHb*spectra.hb[i]+cHbO*spectra.hbo2[i]+cWater*spectra.water[i]/100+cLipid*spectra.lipid[i]/100;
        absorption.push(abs);
    }
    return absorption;
}