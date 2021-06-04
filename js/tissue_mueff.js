// JavaScript code for the page tissue_mueff.html
// Part of the TissueOpticsApp
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

// Variable declaration
let Spectra; // Variable containing the Spectra used in the app
let muChart; // Variable pointing to the chart object containing mua and mus
let mueffChart; // Variable pointing to the chart object containing mueff

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
                plotMueff()
                    .then(response => {
                    mueffChart = response;
                    });
            });
    });


// Functions
async function getData() { // Function to load all the data necessary for the application
    const data2 = await fetch("ChromophoresAbsorptionSpectra.json");
    const chrom = await data2.json();

    return chrom;
}

async function plotMuaMus() {
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

async function plotMueff() {
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const mua = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);

    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);

    const mueff = calcTissueMueff(mua,mus);

    const ctx = document.getElementById('chart_mueff').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    label: 'Effective absorption',
                    data: mueff,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
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
                    type: 'logarithmic',
                    title: {
                        display: 'true',
                        text: 'Effective Absorption'
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

function updateCharts() { // Function to update the chart ADD THE UPDATE OF THE OTHER CHART
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

    const mueff = calcTissueMueff(absorption,mus);
    console.log(mueff)
    mueffChart.data.datasets[0].data = mueff;

    let wv_min = parseInt(document.getElementById('wv_min').value);
    let wv_max = parseInt(document.getElementById('wv_max').value);

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

    mueffChart.options.scales.x.min = wv_min;
    mueffChart.options.scales.x.max = wv_max;
    mueffChart.update();
};

function changeScale(){ // Function to change the scale from linear to logarithmic
    const x = document.getElementById("check_log");
    if (x.checked) {
        muChart.options.scales.y.type = 'logarithmic';
    } else {
        muChart.options.scales.y.type = 'linear';
    }
    muChart.update();
}

function calcTissueScat(a_Ray,a_Mie,b_Mie,wl) {
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