$(document).ready(function () {

    const currentUrl = window.location.href;

    // Effectuer une requête à l'API pour obtenir les données
    // Assurez-vous de remplacer 'URL_DE_L_API' par l'URL réelle de votre API
    $.ajax({
        url: 'http://127.0.0.1:8000/AdventureWorks/api/deptFinance/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0])
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('deptfin');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'DeptFinance',
                        data: data, // Utiliser les valeurs du dataset de l'API ici
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });

});
