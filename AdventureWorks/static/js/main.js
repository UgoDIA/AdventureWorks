$(document).ready(function () {

    const currentUrl = window.location.origin;

    $.ajax({
        url: currentUrl + "/api/sales/",
        method: "GET",
        success: function (response) {
            const datasetData = response;
            const labels = datasetData.map((item) => item[0]);
            const data = datasetData.map((item) => item[1]);

            const ctx = document.getElementById("salesChart");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Chiffres d'affaire",
                            data: data,
                            borderWidth: 1,
                        },
                    ],
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
                            type: "logarithmic",
                            ticks: {
                                color: "white",
                            },
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                            beginAtZero: true,
                            ticks: {
                                color: "white",
                            },
                        },
                    },
                },
            });
        },
        error: function (error) {
            console.log(error);
        },
    });


    $.ajax({
        url: currentUrl + '/api/country/',
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

    const url = currentUrl + "/api/dept/";

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json(); // Convertir la réponse en JSON
            } else {
                throw new Error("Erreur de réponse du serveur");
            }
        })
        .then((data) => {
            // Extraction des données pour le graphique
            const labels = data.map((department) => department[0]);
            const values = data.map((department) => department[1]);

            // Création du graphique avec les données récupérées
            const ctx = document.getElementById("departmentChart");

            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Nombre de personnes par département   ",
                            data: values,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (
                                context.type === "data" &&
                                context.mode === "default" &&
                                !delay
                            ) {
                                delay = context.dataIndex * 300 + context.datasetIndex * 100;
                            }
                            return delay;
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: "white",
                            },
                        },
                    },
                },
            });

            // Masquez l'élément de chargement une fois les données récupérées
            loader.style.display = "none";
        })
        .catch((error) => {
            console.error("Erreur récupération des départements :", error);
        });

    // Effectuer une requête à l'API pour obtenir les données
    $.ajax({
        url: currentUrl + '/api/deptFinance/',
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

    $.ajax({
        url: currentUrl + '/api/CACountry/',
        method: 'GET',
        success: function (response) {
            // Récupérer les valeurs du dataset depuis la réponse de l'API
            const datasetData = response;
            const labels = datasetData.map(item => item[0]);
            const data = datasetData.map(item => item[1]);

            const ctx = document.getElementById('colicountry');
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
