function login() {
    fetch('http://127.0.0.1:5000/api')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

        const numLongPasswords = {
            5: data.filter(user => user.password.length === 5).length,
            6: data.filter(user => user.password.length === 6).length,
            7: data.filter(user => user.password.length === 7).length,
            8: data.filter(user => user.password.length === 8).length,
            9: data.filter(user => user.password.length === 9).length,
            10: data.filter(user => user.password.length === 10).length,
            11: data.filter(user => user.password.length === 11).length,
            12: data.filter(user => user.password.length === 12).length
        };

        // Crear traza de barras
        const trace = {
            x: Object.keys(numLongPasswords),
            y: Object.values(numLongPasswords),
            type: 'bar',
            marker: {
                color: 'rgba(55, 128, 191, 0.7)', // Color de las barras
                line: {
                    color: 'rgba(55, 128, 191, 1)', // Color del borde de las barras
                    width: 1.5 // Ancho del borde de las barras
                }
            }
        };

        // Configuración del diseño del gráfico
        const layout = {
            title: 'Usuarios con contraseñas de longitud mayor a 8',
            xaxis: {
                title: 'Longitud de la contraseña'
            },
            yaxis: {
                title: 'Cantidad de usuarios'
            }
        };

        // Renderizar el gráfico utilizando Plotly
        Plotly.newPlot('passwordsChart', [trace], layout);


        // Obtener dominios únicos de correo electrónico
        const emailDomains = new Set();
        data.forEach(email => {
            const domain = email.email.split('@').pop();
            emailDomains.add(domain);
        });

        // Contar la cantidad de usuarios por dominio de correo electrónico
        const numUsersByDomain = {};
        data.forEach(email => {
            const domain = email.email.split('@').pop();
            numUsersByDomain[domain] = (numUsersByDomain[domain] || 0) + 1;
        });

        // Crear traza de barras
        const trace1 = {
            x: Object.keys(numUsersByDomain),
            y: Object.values(numUsersByDomain),
            type: 'bar',
            marker: {
                color: 'rgba(55, 128, 191, 0.7)', // Color de las barras
                line: {
                    color: 'rgba(55, 128, 191, 1)', // Color del borde de las barras
                    width: 1.5 // Ancho del borde de las barras
                }
            }
        };

        // Configuración del diseño del gráfico
        const layout1 = {
            title: 'Cantidad de Usuarios por cada Dominio de Correo Electrónico',
            xaxis: {
                title: 'Dominio de correo electrónico'
            },
            yaxis: {
                title: 'Cantidad de usuarios'
            }
        };

        // Renderizar el gráfico utilizando Plotly
        Plotly.newPlot('domainChart', [trace1], layout1);


        })
        .catch(function(error) {
            console.log(error);
        })
}