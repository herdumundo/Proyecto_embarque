 
 
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}


 
 
function cargar_grillat_sub() {
    var item_codigo = $("#item_codigot_sub").val();
    var tipo = $("#tipot_sub").val();
    var nro_carrito = $("#nro_carritot_sub").val();
    var cod_lote = $("#cod_lotet_sub").val();
    var cantidad = $("#cantidadt_sub").val();
    var fecha_puesta = $("#fecha_puestat_sub").val();

     if (checkIdt(cod_lote)) {
        return aviso_duplicado();
    }

    $('#grilla_principal_sub tbody').append('<tr class="suma" id="row' + cod_lote + '" > <td class="ocultar" for="id">' + cod_lote + '</td><td>' + tipo + '</td><td>' + nro_carrito + '</td>><td class="ocultar">' + item_codigo + '</td>><td>' + cantidad + '</td>><td>' + fecha_puesta + '</td><td> <input type="button" value="ELIMINAR" name="remove" id="' + cod_lote + '"    class="btn btn-danger btn_remove"></td></tr>');
    sumar_lotes();
    //calcular_tipo_t();
    //calcular_tipo_carros_t();
    //calcular_tipo_cajones_t();
    $(".ocultar").hide();
    //obtener_fila(); 
} 


function checkIdt(id) {
    let ids = document.querySelectorAll('#grilla_principal_sub td[for="id"]');

    return [].filter.call(ids, td => td.textContent === id).length === 1;
}




function loader() {

    $.preloader.start({
        modal: true,
        src: '301.png'
    });

}








 



function validart_sub() {
     
    var calendario = $('#calendario_transferencia_sub').val();
     var cbox_destino = $('#cbox_destino_sub').val();
    var txt_union_filas = $('#resultadot_sub').val();
    var cbox_encargado = $('#cbox_encargado_sub').val();

    if ( calendario == "" || cbox_destino == "-" || txt_union_filas == "" || cbox_encargado=="-") {
        aviso_error();
    }
    else {

        enviar_datos_transferencia_sub( 
            $('#total').val(),
            
            $('#cbox_destino_sub').val(),
            $('#resultadot_sub').val(),
            $('#calendario_transferencia_sub').val(),
            $('#cbox_encargado_sub').val());
        loader();
       
            }

}
function enviar_datos_transferencia_sub(
    total,
    cbox_destino,
    resultado,
    calendario,
    encargado) {

    $.get('control_transferencia_sub.aspx', {
        total: total,
        cbox_destino: cbox_destino,
        resultado: resultado,
        calendario: calendario,
        encargado: encargado
    },
        function (res) {

            $("#contenido_transferencia").html(res);
        });
}  
 

function obtener_filat_sub() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#grilla_principal_sub tbody tr");
    var cod_lote;
    var cantidad;
    var tipo_huevo;
    var c = 0;
    var valores = '';
    // recorremos cada una de las filas

    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        cod_lote = columnas[0].textContent;
        cantidad = columnas[4].textContent;
        tipo_huevo = columnas[3].textContent;

        var arr = cod_lote + '-' + tipo_huevo + '-' + cantidad;
        if (c == 0) {
            valores = arr;
        }
        else {
            valores = valores + ',' + arr;

        }
        c++;
    })
    $('#resultadot_sub').val(valores);



}

