$(document).ready(function () {
  const currentUrl = window.location.origin;
  const url = currentUrl+ "/AdventureWorks/api/dept/";

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
          plugins: {
            legend: {
              display: true,
              labels:{
                color:'white'
              }
            },

          },
        },
      });
    })
    .catch((error) => {
      console.error("Erreur récupération des départements :", error);
    });
});
