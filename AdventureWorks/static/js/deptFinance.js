$(document).ready(function () {

    const currentUrl = window.location.origin;

    // Effectuer une requête à l'API pour obtenir les données
    $.ajax({
        url: currentUrl+'/api/deptFinance/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0])
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('deptfin');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'DeptFinance',
                        data: data, // Utiliser les valeurs du dataset de l'API ici
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'white'
                            }
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
