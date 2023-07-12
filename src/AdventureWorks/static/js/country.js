$(document).ready(function () {

    const currentUrl = window.location.href;

    // Effectuer une requête à l'API pour obtenir les données
    // Assurez-vous de remplacer 'URL_DE_L_API' par l'URL réelle de votre API
    $.ajax({
        url: 'http://127.0.0.1:8000/AdventureWorks/api/country/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0]);
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('colipays');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Clients',
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
                            type: 'logarithmic',
                            ticks: {
                                color: 'white',
                            },
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
