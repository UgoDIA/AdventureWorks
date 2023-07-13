$(document).ready(function () {

    const currentUrl = window.location.origin;

    // Effectuer une requête à l'API pour obtenir les données
    $.ajax({
        url: currentUrl + '/api/nvClient/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0]);
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('nvclient');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total nouveaux Clients',
                        data: data, // Utiliser les valeurs du dataset de l'API ici
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },

                    },
                    scales: {
                        y: {
                            grid: {
                                display: false,
                            },
                            beginAtZero: true,
                            ticks: {
                                color: 'white',
                            },
                            type: "logarithmic",
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                            beginAtZero: true,
                            ticks: {
                                color: 'white',
                            },
                        },

                    },
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });

});
