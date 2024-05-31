function suma($x, $y) {
    let $suma
    $suma = $x + $y
    return $suma
}
function botonSumar() {
    let $x
    let $y
    $x = prompt('Primer número de la suma')
    $y = prompt('Segundo número de la suma')
    return salida.value=suma($x, $y)
}
function resta($x, $y) {
    let $resta
    $resta = $x - $y
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