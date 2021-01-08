simpleApp.factory('statistiqueFactory', function() {
    return {
        getGrapheYear: function(tab) {
            google.charts.load('current', {

                // Définition du package pour le graphique
                packages: ['corechart'],
        
                // Fonction à exécuter lorsque l'API est téléchargée
                callback: function() {
        
                  // Création de la visualisation "PieChart"
                  var chart = new google.visualization.PieChart(document.getElementById('statYear'));
        
                  // Formatage des options du graphique
                  var options = {
                    title : 'Statistique par année',
                    width : 800,
                    height: 700,
                    is3D:true
                  };
              
                  // Formatage des données
                  var data = new google.visualization.DataTable();
              
                  data.addColumn('string', 'Year');
                  data.addColumn('number', 'Number of internships');
                  for(let i = 0; i < tab.length; i++) {
                    data.addRows([
                        [tab[i].annee.toString(), tab[i].nbre_stage],
                    ]);
                  }
                  //console.log(data);
                  // Dessin du graphique avec les données et les options
                  chart.draw(data, options);
              
                }
            });
        },

        getGrapheLevel: function(tab) {
          //console.log(tab[0].niveau);
          google.charts.load('current', {

            // Définition du package pour le graphique
            packages: ['corechart'],
    
            // Fonction à exécuter lorsque l'API est téléchargée
            callback: function() {
    
              // Création de la visualisation "PieChart"
              var chart = new google.visualization.PieChart(document.getElementById('statLevel'));
    
              // Formatage des options du graphique
              var options = {
                title : 'Statistique par niveau',
                width : 800,
                height: 700,
                is3D:true
              };
          
              // Formatage des données
              var data = new google.visualization.DataTable();
          
              data.addColumn('string', 'Level');
              data.addColumn('number', 'Number of students');
              for(let i = 0; i < tab.length; i++) {
                data.addRows([
                    [tab[i].niveau.toString(), tab[i].nbre],
                ]);
              }
              //console.log(data);
              // Dessin du graphique avec les données et les options
              chart.draw(data, options);
          
            }
          });
        }
    }
})