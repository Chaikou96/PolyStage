    /**
    * Chart(<load_options>);
    */
    (function(C,h,a,r,t){"use strict";a=[];r=!1;t=!1;window.Chart=function(x){a.push(x);if(t){t()}else if(!r&&!t){r=C.createElement('SCRIPT');r.src='https://www.gstatic.com/charts/loader.js';r.onload=function(){t=function(){while(a.length>0){google.charts.load('current',a.shift())}};t()};C.getElementsByTagName(h)[0].appendChild(r)}}})(document,'body');
    
    // Attente du chargement complet de la page
    window.addEventListener('load', function() {

        // Utilisation du plugin Chart
        Chart({
            // Définition du package pour le graphique
            packages: ['corechart'],

            // Fonction à exécuter lorsque l'API est téléchargée
            callback: function() {

                // Création de la visualisation "PieChart"
                var chart = new google.visualization.PieChart(document.getElementById('stat'));

                // Formatage des options du graphique
                var options = {
                title : 'Titre du graphique',
                width : 400,
                height: 300
                };

                // Formatage des données
                var data = new google.visualization.DataTable();

                /*data.addColumn('number', 'Year');
                data.addColumn('number', 'Number of internships');
                for(let i = 0; i < 2; i++) {
                    data.addRows([
                        [annee.annee[i], annee.nbr_stage[i]],
                    ]);
                }*/
                data.addColumn('string', 'Libellé de série');
                data.addColumn('number', 'Valeurs de série 1');
                data.addColumn('number', 'Valeurs de série 2');
                data.addRows([
                    ['Valeur 1', 1, 2],
                    ['Valeur 2', 2, 3],
                    ['Valeur 3', 3, 4],
                    ['Valeur 4', 4, 5],
                    ['Valeur 5', 5, 6],
                ]);

                // Dessin du graphique avec les données et les options
                chart.draw(data, options);
            }
        });
    });