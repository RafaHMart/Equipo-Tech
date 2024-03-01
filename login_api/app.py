from flask import Flask, jsonify
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

mis_nombres = ['Andres', 'Juan', 'Mauricio', 'Alejandra', 'Carlos', 'Daniela', 'Juan', 'Laura', 'Sebastian', 'Maria',
               'David', 'Sofia', 'Esteban', 'Juliana', 'Mateo', 'Valentina', 'Nicolas', 'Isabella', 'Juan Sebastian',
               'Luisa', 'Sergio', 'Manuela', 'Miguel', 'Salome', 'Samuel', 'Jose', 'Jorge', 'Andrea', 'Luis', 'Camila',
               'Diego', 'Paula', 'Juan David', 'Stephanie', 'Jose David', 'Natalia', 'Santiago', 'Melissa', 'Brian', 
               'Jessica', 'Juan Manuel', 'Sara', 'Kevin', 'Maria Fernanda', 'Cristian', 'Mariana', 'Juan Pablo', 
               'Victoria', 'Gabriel', 'Jimena', 'Jairo', 'Paola', 'Julio']
mis_apellidos = ['Rodriguez', 'Gonzalez', 'Gomez', 'Perez', 'Garcia', 'Hernandez', 'Martinez', 'Lopez', 'Sanchez', 
                 'Pereira', 'Ramirez', 'Fernandez', 'Torres', 'Aguilar', 'Jimenez', 'Diaz', 'Ortiz', 'Vargas',
                 'Gutierrez', 'Molina', 'Villa', 'Alvarez', 'Serrano', 'Mendoza', 'Rojas', 'Lozano', 'Cortes',
                 'Figueroa', 'Suarez', 'Rivera', 'Nuñez', 'Reyes', 'Trujillo', 'Marin', 'Castro', 'Rangel',
                 'Cabrera', 'Herrera', 'Mora', 'Paz', 'Ibañez', 'Osorio', 'Estrada', 'Cadavid', 'Gallego', 
                 'Gil', 'Montoya', 'Quintero', 'Bernal', 'Chavez', 'Mendez']
mis_dominios = ['@gmail.com', '@hotmail.com', '@outlook.com', '@hubspot.com', '@mailbox.com', '@yahoo.com', '@yahoo.es', '@outlook.es']

def generar_password(longitud):
    caracteres = string.ascii_letters + string.digits
    password = ''.join(random.choice(caracteres) for i in range(longitud))
    if (any(c.islower() for c in password) and
            any(c.isupper() for c in password) and
            any(c.isdigit() for c in password)):
        return password
    else:
        return generar_password(longitud)

def generar_json(cantidad):
    json_data = []
    for i in range(cantidad):
        nombre = random.choice(mis_nombres) + ' ' + random.choice(mis_apellidos)
        email = f"{nombre.lower().split()[0]}{random.randint(10, 9999)}{random.choice(mis_dominios)}"
        password = generar_password(random.randint(5, 12))
        json_data.append({"nombre": nombre, "email": email, "password": password})
    return json_data

data = generar_json(500000)
data

@app.route("/api", methods=["GET"])
def api():
    return jsonify(data), 200