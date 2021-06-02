let Spectra;
let targetSpec;
let tissueChart;
const button_update = document.getElementById('update');
const button_refSpec = document.getElementById('selectRefSpec');

button_update.addEventListener('click', async event => {
    updateTissueChart();
});

button_refSpec.addEventListener('click', async event => {
    changeRefSpectrum();
});

getData()
    .then(response => {
        Spectra = response;
        targetSpec = Spectra.ref.abs[0];
        charSpectra()
            .then(response => {
                tissueChart = response;
            });
        //console.log(absSpectra);
    });

function updateTissueChart() {
    const cBlood = document.getElementById('BloodConc').value;
    const cWater = document.getElementById('WaterConc').value;
    const cLipid = document.getElementById('LipidConc').value;
    const Saturation = document.getElementById('BloodSat').value;
    const absorption = calcTissueAbs(cBlood,cWater,cLipid,Saturation,Spectra.chrom);
    tissueChart.data.datasets[1].data = absorption;

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

    tissueChart.options.scales.x.min = wv_min;
    tissueChart.options.scales.x.max = wv_max;
    tissueChart.update();
};

function changeScale(){
    const x = document.getElementById("check_log");
    if (x.checked) {
        tissueChart.options.scales.y.type = 'logarithmic';
    } else {
        tissueChart.options.scales.y.type = 'linear';
    }
    tissueChart.update();
}

async function getData() { // load the data for the absorption spectra 
    const data1 = await fetch("abs_spec.json");
    const ref = await data1.json();

    const data2 = await fetch("absorptionSpectra.json");
    const chrom = await data2.json();

    return {ref, chrom};
}

async function changeRefSpectrum() {
    const specNumber = parseInt(document.getElementById("refSpecNumber").value);
    targetSpec = Spectra.ref.abs[specNumber-1];
    tissueChart.data.datasets[0].data = targetSpec;
    tissueChart.update();
}

async function charSpectra() {
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