$(document).ready(function () {
  const currentUrl = window.location.href;
  const url = "http://127.0.0.1:8000/AdventureWorks/api/dept/";

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json(); // Convertir la réponse en JSON
      } else {
        throw new Error("Erreur de réponse du serveur");
      }
    })
    .then((data) => {
      console.log(data); // Afficher les données JSON récupérées

      // Extraction des données pour le graphique
      const labels = data.map((department) => department[0]);
      const values = data.map((department) => department[1]);

      // Création du graphique avec les données récupérées
      const ctx = document.getElementById("departmentChart");

      new Chart(ctx, {
        type: "bar",
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
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Erreur récupération des départements :", error);
    });
});
