/*
Roberto Paz Barrera
Fecha de creación: 10/27/25
Calculadora web creada con HTML, CSS y JavaScript que permite realizar operaciones aritméticas básicas y mostrar los resultados en pantalla.
*/

// Variables principales
let expresion = '';            // Guarda la expresión matemática ingresada
let resultadoMostrado = '';    // Controla si el resultado ya fue mostrado
const pantalla = document.getElementById('pantalla'); // Referencia al elemento pantalla

// ---------- Funciones principales ---------- //

// Actualiza el contenido de la pantalla
function actualizarPantalla(valor){
    pantalla.textContent = valor || '0';
}

// Agrega números a la expresión
function agregarNumero(numero){
    if(resultadoMostrado) {
        expresion = '';
        resultadoMostrado = false;
    }

    // Evita ceros iniciales innecesarios
    if(expresion === '0' && numero === '0') return;

    // Reemplaza el 0 inicial si se escribe otro número
    if(expresion === '0' && numero !== '0') {
        expresion = numero;
    } else {
        expresion += numero;
    }

    actualizarPantalla(expresion);
}

// Limpia toda la pantalla
function limpiar() {
    expresion = '';
    resultadoMostrar = false;
    actualizarPantalla('0');
}

// Borra el último carácter
function borrar() {
    if(!resultadoMostrado && expresion !== '') {
        expresion = expresion.slice(0, -1);
        actualizarPantalla(expresion || '0');
    }
}

// Agrega operadores aritméticos
function agregarOperador(operador) {
    if(expresion === '') return;

    // Si hay un resultado previo, permite continuar la operación
    if(resultadoMostrado) {
        resultadoMostrado = false;
    }

    // Evita operadores consecutivos
    const ultimoCaracter = expresion[expresion.length - 1];
    if (['+', '-', '*', '/', '%'].includes(ultimoCaracter)) {
        expresion = expresion.slice(0, -1);
    }

    expresion += operador;
    actualizarPantalla(expresion);
}

// Agrega el punto decimal
function agregarDecimal(){
    if(resultadoMostrado) {
        expresion = '0';
        resultadoMostrado = false;
    }

    // Verifica que no se repita el punto en un mismo número
    const numeros = expresion.split(/[\+\-\*\/\%]/);
    const numeroActual = numeros[numeros.length - 1];

    if(!numeroActual.includes('.')){
        if (numeroActual === '' || expresion === ''){
            expresion += '0.';
        } else {
            expresion += '.';
        }
        actualizarPantalla(expresion);
    }
}

// Evalúa la expresión matemática
function calcular() {
    if (expresion === '') return;

    try {
        let expresionEval = expresion;

        // Convierte los porcentajes en su equivalente decimal
        if(expresionEval.includes('%')){
            expresionEval = expresionEval.replace(/(\d+\.?\d*)%/g, '($1/100)');
        }

        const resultado = eval(expresionEval);

        // Formatear el resultado (quita ceros innecesarios)
        let resultadoFormateado;
        if(Number.isInteger(resultado)){
            resultadoFormateado = resultado.toString();
        } else {
            resultadoFormateado = resultado.toFixed(8).replace(/\.?0+$/, '');
        }

        actualizarPantalla(resultadoFormateado);
        resultadoMostrado = true;
    } catch(error) {
        // Muestra error si la expresión no es válida
        actualizarPantalla('Error');
        expresion = '';
        resultadoMostrado = true;
    }
}

// Función opcional para mostrar operadores con símbolos visuales
function formatearExpresion(exp) {
    return exp.exp.replace(/\*/g, '×').replace(/\//g, '÷');
}
