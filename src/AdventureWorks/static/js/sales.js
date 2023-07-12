$(document).ready(function () {

    const currentUrl = window.location.origin;
    console.log(currentUrl)

    $.ajax({
        url:  currentUrl+'/AdventureWorks/api/sales/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0])
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Chiffres d\'affaire',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            type: 'logarithmic',
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
