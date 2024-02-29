function consumir_api() {
    // Obtener el endpoint ingresado por el usuario
    var endpoint = document.getElementById("api").value;

    // Realizar la solicitud a la API
    fetch(endpoint)
        .then(function(response){
            return response.json()
        })
        .then(function(data) {
            // Inicializar los arrays para cada región
            var paisesEurope = [];
            var poblacionEurope = [];
            var paisesAfrica = [];
            var poblacionAfrica = [];
            var paisesSouthAmerica = [];
            var poblacionSouthAmerica = [];

            for(var i=0; i < data.length; i++){
                var region = data[i].region;
                var subregion = data[i].subregion;

                // Asignar los países y las poblaciones a su respectiva región
                if (region === "Europe") {
                    paisesEurope.push(data[i].name.common);
                    poblacionEurope.push(data[i].population);
                } else if (region === "Africa") {
                    paisesAfrica.push(data[i].name.common);
                    poblacionAfrica.push(data[i].population);
                } else if (subregion === "South America") {
                    paisesSouthAmerica.push(data[i].name.common);
                    poblacionSouthAmerica.push(data[i].population);
                }
            }

            // Crear la gráfica para cada región
            var grafica =[
                {
                    x: paisesEurope,
                    y: poblacionEurope,
                    type: 'bar',
                    name: 'Europe',
                    marker: { color: 'blue' }
                },
                {
                    x: paisesAfrica,
                    y: poblacionAfrica,
                    type: 'bar',
                    name: 'Africa',
                    marker: { color: 'green' }
                },
                {
                    x: paisesSouthAmerica,
                    y: poblacionSouthAmerica,
                    type: 'bar',
                    name: 'South America',
                    marker: { color: 'orange' }
                }
            ];

            // Configurar el diseño de la gráfica
            var layout = {
                barmode: 'group',
                title: 'Población por país y región',
                xaxis: { 
                    title: 'Países',
                    tickangle: -45, // Rotar los nombres de los países 45 grados
                    tickfont: { // Ajustar el tamaño de la letra
                        size: 7.5
                    }
                },
                yaxis: { title: 'Población' }
            };

            Plotly.newPlot('api_chart', grafica, layout);
        })
        .catch(function (error) {
            console.error('Error al consumir la API:', error);
            // Puedes manejar el error de alguna manera aquí
        });
}


