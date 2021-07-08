// JavaScript code for the page tissue_mueff.html
// Part of the TissueOpticsApp 
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

// Variable declaration
let Spectra; // Variable containing the Spectra used in the app
let muChart; // Variable pointing to the chart object containing mua and mus
let mueffChart; // Variable pointing to the chart object containing mueff

// Operation done when the page is opened
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

async function plotMuaMus() { // Function to generate the plots of mua and mus
    const x = document.getElementById("check_log");
    x.checked = true;

    // Get the absorption properties from the page and calculate the mua
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);

    // Get the scattering properties from the page and calculate mus
    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);

    // Generate the chart object for mua and mus
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
                    backgroundColor: 'rgba(183, 28, 28, 1)',
                    borderColor: 'rgba(183, 28, 28, 1)',
                    borderWidth: 1
                },
                {   
                    yAxisID: 'y_scat',
                    label: 'Scattering',
                    data: mus,
                    backgroundColor: 'rgba(1, 87, 155, 1)',
                    borderColor: 'rgba(1, 87, 155, 1)',
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
                        text: 'Absorption (1/m)'
                    },
                },
                y_scat: {
                    position: 'right',
                    type: 'linear',
                    min: 0.01,
                    title: {
                        display: 'true',
                        text: 'Scattering  (1/m)'
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

async function plotMueff() { // Function to generate the plots of mueff

    // Get the absorption properties from the page and calculate the mua
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const mua = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);

    // Get the scattering properties from the page and calculate mus
    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);

    // Calculate mueff from mua and mus
    const mueff = calcTissueMueff(mua,mus);

    // Generate the chart object for mueff
    const ctx = document.getElementById('chart_mueff').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    label: 'Effective attenuation',
                    data: mueff,
                    backgroundColor: 'rgba(81, 45, 168, 1)',
                    borderColor: 'rgba(81, 45, 168, 1)',
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
                        text: 'Effective attenuation  (1/m)'
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

function updateCharts() { // Function to update the charts 

    // Get the absorption properties from the page and calculate the mua
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra);
    muChart.data.datasets[0].data = absorption;

    // Get the scattering properties from the page and calculate mus
    const a_Rayleigh = document.getElementById('RayProbFactor').value;
    const a_Mie = document.getElementById('MieProbFactor').value;
    const b_Mie = document.getElementById('MieSizeParam').value;
    const mus = calcTissueScat(a_Rayleigh,a_Mie,b_Mie,Spectra.wavelength);
    muChart.data.datasets[1].data = mus;

    // Calculate the new value of mueff
    const mueff = calcTissueMueff(absorption,mus);
    mueffChart.data.datasets[0].data = mueff;

    // Update the charts
    muChart.update();
    mueffChart.update();
};

function changeScale(){ // Function to change the scale from linear to logarithmic
    const x = document.getElementById("check_log");
    if (x.checked) {
        muChart.options.scales.y_abs.type = 'logarithmic';
        mueffChart.options.scales.y.type = 'logarithmic';
    } else {
        muChart.options.scales.y_abs.type = 'linear';
        mueffChart.options.scales.y.type = 'linear';
    }
    muChart.update();
    mueffChart.update();
}

function calcTissueScat(a_Ray,a_Mie,b_Mie,wl) { // Function to calculate mus from the scattering properties
    var Sca = [];
    var i;

    for (i = 0; i < wl.length; i++) {
        const s = a_Ray*Math.exp(-4*Math.log(wl[i]/500))+a_Mie*Math.exp(-b_Mie*Math.log(wl[i]/500));
        Sca.push(s);
    }
    return Sca;
}

function calcTissueMueff(mua,mus) { // Function to calculate mueff from mua and mus
    var mueff = [];
    var i;

    for (i=0; i<mua.length; i++){
        const m = Math.sqrt(3*mua[i]*mus[i]);
        mueff.push(m);
    }
    return mueff;
}

function calcTissueAbs(cBlood,cWater,cLipid,Saturation,spectra) { // Function to calculate mua from the absorption properties
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

function changeWV() { // Function to react to the modification of the wavelength sliders
    let minSlidePos = parseInt(document.getElementById('wv_min').value);
    let maxSlidePos = parseInt(document.getElementById('wv_max').value);

    let wv_minSlide = 13.20*minSlidePos+260;
    let wv_maxSlide = 13.20*maxSlidePos+260;

    var min_label = document.getElementById("min_label");
    var max_label = document.getElementById("max_label");
    min_label.innerHTML = wv_minSlide.toFixed(0);
    max_label.innerHTML = wv_maxSlide.toFixed(0);

    minSlidePos.oninput = function() {
        min_label.innerHTML = wv_minSlide.toFixed(0);
    }
    maxSlidePos.oninput = function() {
        max_label.innerHTML = wv_maxSlide.toFixed(0);
    }

    let wv_min = Math.round(Math.min(wv_minSlide,wv_maxSlide));
    let wv_max = Math.round(Math.max(wv_minSlide,wv_maxSlide));

    muChart.options.scales.x.min = wv_min;
    muChart.options.scales.x.max = wv_max;
    muChart.update();

    mueffChart.options.scales.x.min = wv_min;
    mueffChart.options.scales.x.max = wv_max;
    mueffChart.update();
}