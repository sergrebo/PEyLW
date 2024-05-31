function operar($operacion) {
    let $x
    let $y
    $x = prompt('Ingrese el primer número')
    $y = prompt('Ingrese el segundo número')
    let $resultado

    switch ($operacion) {
        case suma:
            $resultado=suma($x, $y)
            break;
    
        case resta:
            $resultado=resta($x, $y)
            break;
    
        case multiplicacion:
            $resultado=multiplicacion($x, $y)
            break
        
        case division:
            $resultado=division($x, $y)
            break
    }
    return salida.value=$resultado
}
/*
function botonSumar() {
    let $x
    let $y
    $x = prompt('Primer número de la suma')
    $y = prompt('Segundo número de la suma')
    return salida.value=suma($x, $y)
}
*/
function suma($x, $y) {
    let $suma
    $suma = parseInt($x) + parseInt($y)
    return $suma
}
function resta($x, $y) {
    let $resta
    $resta = parseInt($x) - parseInt($y)
    return $resta
}
function multiplicacion($x, $y) {
    let $producto
    $producto = $x * $y
    return $producto
}
function division($x, $y) {
    let $cociente
    $cociente = $x / $y
    return $cociente
}
function potencia($x, $y){
    let $potencia
    let $base = $x
    let $exponente = $y
    $potencia = $base ** $exponente
    return $potencia
}
function cuadrado($x){
    let $cuadrado
    $cuadrado = $x + $x
    return $cuadrado
}