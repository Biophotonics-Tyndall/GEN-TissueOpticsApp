// JavaScript code for the page tissue_abs.html
// Part of the TissueOpticsApp
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

// Variable declaration
let Spectra; // Variable containing the Spectra used in the app
let tissueChart; // Variable pointing to the chart object

// Operation donn when the page is opened
getData()
    .then(response => {
        Spectra = response;
        plotSpectra_chrom();
        plotSpectra_tissue()
            .then(response => {
                tissueChart = response;
            });
    });

// Functions
async function getData() { // Function to load all the data necessary for the application
    const data = await fetch("ChromophoresAbsorptionSpectra.json");
    const chrom = await data.json();
    return chrom;
}

async function plotSpectra_tissue() { // Function to initiliase the plot of the tissue absorption
    const x = document.getElementById("check_log");
    x.checked = true;

    const cBlood1 = document.getElementById('BloodConc_1').value;
    const cWater1 = document.getElementById('WaterConc_1').value;
    const cLipid1 = document.getElementById('LipidConc_1').value;
    const Saturation1 = document.getElementById('BloodSat_1').value;
    const absorption1 = calcTissueAbs(cBlood1,cWater1,cLipid1,Saturation1,Spectra);

    const cBlood2 = document.getElementById('BloodConc_2').value;
    const cWater2 = document.getElementById('WaterConc_2').value;
    const cLipid2 = document.getElementById('LipidConc_2').value;
    const Saturation2 = document.getElementById('BloodSat_2').value;
    const absorption2 = calcTissueAbs(cBlood2,cWater2,cLipid2,Saturation2,Spectra);

    const cBlood3 = document.getElementById('BloodConc_3').value;
    const cWater3 = document.getElementById('WaterConc_3').value;
    const cLipid3 = document.getElementById('LipidConc_3').value;
    const Saturation3 = document.getElementById('BloodSat_3').value;
    const absorption3 = calcTissueAbs(cBlood3,cWater3,cLipid3,Saturation3,Spectra);

    const ctx = document.getElementById('chart_tissue').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    label: 'Tissue 1',
                    data: absorption1,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Tissue 2',
                    data: absorption2,
                    backgroundColor: 'rgba(0, 99, 132, 0.2)',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Tissue 3',
                    data: absorption3,
                    backgroundColor: 'rgba(255, 0, 132, 0.2)',
                    borderColor: 'rgba(255, 0, 132, 1)',
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
                    min: 10,
                    title: {
                        display: 'true',
                        text: 'Absorption (1/m)'
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

async function plotSpectra_chrom() { // Function to initiliase the plot of the chromophore absorption
 //   const absSpectra = await getData();
//    console.log(absSpectra);
    const ctx = document.getElementById('chart_chromophores').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.wavelength,
            datasets: [
                {
                    label: 'HbO2',
                    data: Spectra.hbo2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Hb',
                    data: Spectra.hb,
                    backgroundColor: 'rgba(99, 132, 255, 0.2)',
                    borderColor: 'rgba(99, 132, 255, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Water',
                    data: Spectra.water,
                    backgroundColor: 'rgba(99, 0, 255, 0.2)',
                    borderColor: 'rgba(99, 0, 255, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Lipids',
                    data: Spectra.lipid,
                    backgroundColor: 'rgba(99, 132, 0, 0.2)',
                    borderColor: 'rgba(99, 132, 0, 1)',
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
                    min: 0.01,
                    title: {
                        display: 'true',
                        text: 'Absorption'
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
}

function updateTissueChart() { // Function to update the chart
    const cBlood1 = document.getElementById('BloodConc_1').value;
    const cWater1 = document.getElementById('WaterConc_1').value;
    const cLipid1 = document.getElementById('LipidConc_1').value;
    const Saturation1 = document.getElementById('BloodSat_1').value;
    const absorption1 = calcTissueAbs(cBlood1,cWater1,cLipid1,Saturation1,Spectra);
    tissueChart.data.datasets[0].data = absorption1;

    const cBlood2 = document.getElementById('BloodConc_2').value;
    const cWater2 = document.getElementById('WaterConc_2').value;
    const cLipid2 = document.getElementById('LipidConc_2').value;
    const Saturation2 = document.getElementById('BloodSat_2').value;
    const absorption2 = calcTissueAbs(cBlood2,cWater2,cLipid2,Saturation2,Spectra);
    tissueChart.data.datasets[1].data = absorption2;

    const cBlood3 = document.getElementById('BloodConc_3').value;
    const cWater3 = document.getElementById('WaterConc_3').value;
    const cLipid3 = document.getElementById('LipidConc_3').value;
    const Saturation3 = document.getElementById('BloodSat_3').value;
    const absorption3 = calcTissueAbs(cBlood3,cWater3,cLipid3,Saturation3,Spectra);
    tissueChart.data.datasets[2].data = absorption3;

    tissueChart.update();
};

function changeScale(){ // Function to change the scale from linear to logarithmic
    const x = document.getElementById("check_log");
    if (x.checked) {
        tissueChart.options.scales.y.type = 'logarithmic';
    } else {
        tissueChart.options.scales.y.type = 'linear';
    }
    tissueChart.update();
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

    tissueChart.options.scales.x.min = wv_min;
    tissueChart.options.scales.x.max = wv_max;
    tissueChart.update();
}

