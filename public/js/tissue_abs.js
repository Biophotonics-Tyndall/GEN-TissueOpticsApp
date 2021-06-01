//const absSpectra = getData();
chartData();

async function getData() {
    const data = await fetch("absorptionSpectra.json");
    const absSpectra_json = await data.json();
    return absSpectra_json
}

async function chartData() {
    const absSpectra = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: absSpectra.wavelength,
            datasets: [
                {
                    label: 'HbO2 absorption',
                    data: absSpectra.hbo2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {   
                    label: 'Hb absorption',
                    data: absSpectra.hb,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
    });
}