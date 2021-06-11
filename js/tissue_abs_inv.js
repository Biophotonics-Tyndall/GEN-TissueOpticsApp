// JavaScript code for the page tissue_abs_inv.html
// Part of the TissueOpticsApp
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

// Variable declaration
let Spectra; // Variable containing the Spectra used in the app
let targetSpec; // Variable containing the reference spectrum (spectrum that needs to be matched)
let tissueChart; // Variable pointing to the chart object

// Operation donn when the page is opened
getData()
    .then(response => {
        Spectra = response;
        targetSpec = Spectra.ref.abs[0];
        plotSpectra()
            .then(response => {
                tissueChart = response;
            });
    });

// Functions
async function getData() { // Function to load all the data necessary for the application
    const data1 = await fetch("ReferenceAbsorptionSpectra.json");
    const ref = await data1.json();

    const data2 = await fetch("ChromophoresAbsorptionSpectra.json");
    const chrom = await data2.json();

    return {ref, chrom};
}

async function plotSpectra() { // Function to initiliase the plot
    const x = document.getElementById("check_log");
    x.checked = true;

    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra.chrom);

    const ctx = document.getElementById('chart_spectra').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Spectra.ref.wavelength,
            datasets: [
                {
                    label: 'Spetrum to match',
                    data: targetSpec,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Your tissue',
                    data: absorption,
                    backgroundColor: 'rgba(0, 99, 132, 0.2)',
                    borderColor: 'rgba(0, 99, 132, 1)',
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
                    min: 1,
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
    return myChart
}

function updateTissueChart() { // Function to update the chart
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra.chrom);
    tissueChart.data.datasets[1].data = absorption;

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

async function changeRefSpectrum() { // Function to change the reference spectrum
    const specNumber = parseInt(document.getElementById("refSpecNumber").value);
    targetSpec = Spectra.ref.abs[specNumber-1];
    tissueChart.data.datasets[0].data = targetSpec;
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