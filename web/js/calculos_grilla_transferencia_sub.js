function sumar_lotes() {
    // obtenemos todas las filas del tbody
    var filas = document.querySelectorAll("#grilla_principal_sub tbody tr");
    var total_tipo = 0;
    $('#total').val("0");
    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        var cantidad_tipo   =       parseFloat(columnas[4].textContent);
        var tipo_carro      =       parseFloat(columnas[3].textContent);

        // mostramos el total por fila

        if (tipo_carro == '8') {
            total_tipo += cantidad_tipo;
            $('#total').val(total_tipo);
                                }
        
    });

  



}
















 