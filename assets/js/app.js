window.onload = iniciar;

function iniciar() {
    document.getElementById('btnAnalizar').addEventListener('click', analisis);
};

function analisis() {
    let dato = document.getElementById('hexadecimal').value;
    let arregloColores = transformar(dato);
    if (arregloColores == false) {
        document.getElementById('resultado').innerHTML = `<div class="text-alert">No hay un valor ingresado.</div>`;
    } else {
        if (neuronalML(arregloColores[0], arregloColores[1], arregloColores[2]) == 'Es un color CLARO') {
            document.getElementById('resultado').innerHTML = `<div style="color: rgb(230, 223, 171)"> ${neuronalML(arregloColores[0], arregloColores[1], arregloColores[2])} </div>`;
        } else {
            document.getElementById('resultado').innerHTML = `<div style="color: rgb(104, 136, 167)"> ${neuronalML(arregloColores[0], arregloColores[1], arregloColores[2])} </div>`;
        }
    }
};

function transformar(valor) {
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/ig.test(valor)) {
        var hex = valor.substr(1);
        hex = hex.length == 3 ? hex.replace(/(.)/g, '$1$1') : hex;
        var rgb = parseInt(hex, 16);
        let RGB = [];
        RGB[0] = (rgb >> 16) & 255;
        RGB[1] = (rgb >> 8) & 255;
        RGB[2] = rgb & 255;
        console.log(RGB);
        return RGB;
    }
    return false;
};

function neuronalML(rColor, gColor, bColor) {
    const redNeuronal = new brain.NeuralNetwork();
    const entrenar = [
        {
            // Celeste Claro
            'input': {'R':0.78, 'G':0.90, 'B':1},
            'output': {'Es un color CLARO': 1}
        },
        {
            // Azul Oscuro
            'input': {'R':0, 'G':0.11, 'B':0.2},
            'output': {'Es un color OSCURO': 1}
        },
        {
            // Verde Claro
            'input': {'R':0.48, 'G':0.73, 'B':0.38},
            'output': {'Es un color CLARO': 1}
        },
        {
            // Morado Oscuro
            'input': {'R':0.23, 'G':0, 'B':0.27},
            'output': {'Es un color OSCURO': 1}
        },
    ];
    redNeuronal.train(entrenar);
    return valor = brain.likely({
        'R': rColor/255,
        'G': gColor/255,
        'B': bColor/255
    }, redNeuronal);
};