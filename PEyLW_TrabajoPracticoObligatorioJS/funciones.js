

function validar()
{
    //Captura de los elementos del formulario
    var nombre = document.getElementById('nombre')
    var apellido = document.getElementById('apellido')
    var email = document.getElementById('email')
    var obra_social = document.getElementById('obras_sociales')
    var dia = document.getElementById('dia')
    var mes = document.getElementById('mes')
    var anio = document.getElementById('anio')

    var elementos = {}      //¿Serviria hacer un objeto/arreglo de los elementos del formulario para hacer su analisis mas simple?


    //Analisis de los valores de los campos del formularios para que no sean vacios
    //Validacion de nombre
    if(!nombre.value.trim()){                                   //trim() elimina los espacios, tabs, etc (un espacio es interpretado como el booleano true)
        valida_error(nombre, 'Campo de nombre vacío.')
    } else {
        valida_correcto(nombre)
    }

    //Validación de apellido
    if(!apellido.value.trim()){                                   
        valida_error(apellido, 'Campo de apellido vacío.')
    } else {
        valida_correcto(apellido)
    }

    //Validación de email
    if(!email.value.trim()){
        valida_error(email, 'Campo de email vacío.')
    } else if (!valida_email(email.value)) {
        valida_error(email, 'El email ingresado no es válido.')
    } else {
        valida_correcto(email)
    }

    //Validación de obra social
    if(!obra_social.value.trim()){
        valida_error(obra_social, 'Campo obras sociales vacío. Debe seleccionar una obra social.')
    } else {
        valida_correcto(obra_social)
    }

    //Validación de fecha
    var fechaActual = new Date()
    var anioActual = fechaActual.getFullYear()

    if (!anio.value.trim()){
        valida_error(anio, 'Campo año vacío')
    } else if (isNaN(anio.value)) {
        valida_error(anio, 'Campo año no es un número.')
    } else if (anio.value<1) {
        valida_error(anio, 'Campo año debe tener un número mayor a cero')
    } else if (!valida_entero(anio)) {
        valida_error(anio, 'Campo año debe tener un número entero')
    } else if (anio.value > anioActual) {
        valida_error(anio, 'Campo año superior al año actual')
    } else {
        valida_correcto(anio)
    }

    if (!mes.value.trim()){
        valida_error(mes, 'Campo mes vacío')
    } else if (isNaN(mes.value)) {
        valida_error(mes, 'Campo mes no es un número.')
    } else if (mes.value<1) {
        valida_error(mes, 'Campo mes debe tener un número positivo')
    } else if (!valida_entero(mes)) {
        valida_error(mes, 'Campo mes debe tener un número entero')
    } else if (mes.value>12) {
        valida_error(mes, 'Campo mes superior a 12')
    } else {
        valida_correcto(mes)
    }

    if (!dia.value.trim()) {
        valida_error(dia, 'Campo día vacío.')
    } else if (isNaN(dia.value)) {
        valida_error(dia, 'Campo día no es un número.')
    } else if (dia.value<1) {
        valida_error(dia, 'Campo día debe tener un número positivo')
    } else if (!valida_entero(dia)) {
        valida_error(dia, 'Campo día debe tener un número entero')
    } else if (dia.value > 31) {
        valida_error(dia, 'Campo día demasiado alto')
    } else {
        valida_correcto(dia)
    }

    verificarFecha(dia, mes, anio)


}


/** Recibe como parametro el elemento imput y el mensaje a retornar al usuario. Cuando existe un error en la carga de datos se lo hace saber al usuario cambiando el estilo de input
 *  e insertando un mensaje debajo del mismo. 
 * 
 */
function valida_error(input, mensaje){
    input.className = 'error'                                   //Agrega el atributo "class" con valor "error" al input
    var p_mensaje = document.createElement('p')                 //Crea un elemento <p> en la variable p_mensaje
    p_mensaje.textContent = mensaje                             //Ingresa el contenido textual a p_mensaje
    p_mensaje.className = 'mensaje_error'                       //Agrega el atributo "class" con valor "mensaje_error" a p_mensaje
    var siguiente_nodo = input.nextSibling                      //nextSibling busca el siguiente elemento hijo despues de input en el arbol del DOM y se lo asigna a la variable siguiente_hijo
    var contenedor_padre = input.parentNode                     //parentNode busca el elemento padre de input y lo asigna a contenedor_padre
    contenedor_padre.insertBefore(p_mensaje, siguiente_nodo)    //insertBefore agrega p_mensaje antes de siguiente_nodo que esta en contenedor_padre
}


function valida_correcto(input){
    input.className = 'correcto'                                //Agrega el atributo "class" con valor "error" al input
}


function valida_email(email){
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email) 
                                                                //test comprueba si se cumplen las condiciones de la expresión regular en email retornando en booleano
}


function valida_entero(numero){ 
    numeroValor = numero.value
    respuesta = /^[1-9]\d*$/.test(numeroValor)
    return respuesta
}

function verificarFecha(dia, mes, anio){
    var diaValor = dia.value
    var mesValor = mes.value
    var anioValor = anio.value

    if (mesValor == 1 || mesValor == 3 || mesValor == 5 || mesValor == 7 || mesValor == 8 || mesValor == 10 || mesValor == 12){
        if (diaValor > 31) {
            valida_error(dia, 'El campo día es mayor al número de días del mes (31)')
        } else {
            valida_correcto(dia)
        }
    } else if (mesValor == 4 || mesValor == 6 || mesValor == 9 || mesValor == 11) {
        if (diaValor > 30) {
            valida_error(dia, 'El campo día es mayor al número de días del mes (30)')
        } else {
            valida_correcto(dia)
        }
    } else if (mesValor == 2) {
        if ((anioValor % 4 == 0) && (!(anioValor % 100 == 0) || (anioValor % 400 == 0))) {
            if (diaValor > 29) {
                valida_error(dia, 'El campo día es mayor al número de días del mes (29 pues '+anioValor+' es bisiesto)')
            } else {
                valida_correcto(dia)
            }
        } else if (diaValor > 28) {
            valida_error(dia, 'El campo día es mayor al número de días del mes (28)')
        } else {
            valida_correcto(dia)
        }
    }
}