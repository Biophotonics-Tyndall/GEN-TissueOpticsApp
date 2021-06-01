let absSpectra;
let tissueChart;
const button = document.getElementById('update');

button.addEventListener('click', async event => {
    updateTissueChart();
});

getData()
    .then(response => {
        absSpectra = response;
        chartData_chrom();
        chartData_tissue()
            .then(response => {
                tissueChart = response;
            });
    });

function updateTissueChart() {
    const cBlood1 = document.getElementById('BloodConc_1').value;
    const cWater1 = document.getElementById('WaterConc_1').value;
    const cLipid1 = document.getElementById('LipidConc_1').value;
    const Saturation1 = document.getElementById('BloodSat_1').value;
    const absorption1 = calcTissueAbs(cBlood1,cWater1,cLipid1,Saturation1,absSpectra);
    tissueChart.data.datasets[0].data = absorption1;

    const cBlood2 = document.getElementById('BloodConc_2').value;
    const cWater2 = document.getElementById('WaterConc_2').value;
    const cLipid2 = document.getElementById('LipidConc_2').value;
    const Saturation2 = document.getElementById('BloodSat_2').value;
    const absorption2 = calcTissueAbs(cBlood2,cWater2,cLipid2,Saturation2,absSpectra);
    tissueChart.data.datasets[1].data = absorption2;

    const cBlood3 = document.getElementById('BloodConc_3').value;
    const cWater3 = document.getElementById('WaterConc_3').value;
    const cLipid3 = document.getElementById('LipidConc_3').value;
    const Saturation3 = document.getElementById('BloodSat_3').value;
    const absorption3 = calcTissueAbs(cBlood3,cWater3,cLipid3,Saturation3,absSpectra);
    tissueChart.data.datasets[2].data = absorption3;

    tissueChart.update();
};
async function getData() { // load the data for the absorption spectra 
    const data = await fetch("absorptionSpectra.json");
    const absSpectra_json = await data.json();
    return absSpectra_json;
}

function calcTissueAbs(cBlood,cWater,cLipid,Saturation,spectra) {
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

async function chartData_tissue() {
    //const absSpectra = await getData();

    const cBlood1 = document.getElementById('BloodConc_1').value;
    const cWater1 = document.getElementById('WaterConc_1').value;
    const cLipid1 = document.getElementById('LipidConc_1').value;
    const Saturation1 = document.getElementById('BloodSat_1').value;
    const absorption1 = calcTissueAbs(cBlood1,cWater1,cLipid1,Saturation1,absSpectra);

    const cBlood2 = document.getElementById('BloodConc_2').value;
    const cWater2 = document.getElementById('WaterConc_2').value;
    const cLipid2 = document.getElementById('LipidConc_2').value;
    const Saturation2 = document.getElementById('BloodSat_2').value;
    const absorption2 = calcTissueAbs(cBlood2,cWater2,cLipid2,Saturation2,absSpectra);

    const cBlood3 = document.getElementById('BloodConc_3').value;
    const cWater3 = document.getElementById('WaterConc_3').value;
    const cLipid3 = document.getElementById('LipidConc_3').value;
    const Saturation3 = document.getElementById('BloodSat_3').value;
    const absorption3 = calcTissueAbs(cBlood3,cWater3,cLipid3,Saturation3,absSpectra);

    const ctx = document.getElementById('chart_tissue').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: absSpectra.wavelength,
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
    return myChart;
}

async function chartData_chrom() { // plot the data for the absorption spectra 
    const absSpectra = await getData();
//    console.log(absSpectra);
    const ctx = document.getElementById('chart_chromophores').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: absSpectra.wavelength,
            datasets: [
                {
                    label: 'HbO2',
                    data: absSpectra.hbo2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Hb',
                    data: absSpectra.hb,
                    backgroundColor: 'rgba(99, 132, 255, 0.2)',
                    borderColor: 'rgba(99, 132, 255, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Water',
                    data: absSpectra.water,
                    backgroundColor: 'rgba(99, 0, 255, 0.2)',
                    borderColor: 'rgba(99, 0, 255, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Lipids',
                    data: absSpectra.lipid,
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
