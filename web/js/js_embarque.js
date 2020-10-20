
//$(function () { $('#chkToggle2').bootstrapToggle() });

 function factura_togle() {

    $('#chkToggle2').change(function () {
        if ($(this).prop("checked") == true) {
            $('#txt_nro_fact').show();
            $('#txt_nro_fact').val('');
        }
        else {
            $('#txt_nro_fact').hide();
            $('#txt_nro_fact').val('');
        }
    });
};


function teclado_formateado() {
  $('#txt_nro_fact').inputmask("[9][9]9999999", {
        numericInput: true,
        "placeholder": "0",
        showMaskOnHover: false,
        greedy: false
    });
}
     $(document).on('click', '.btn_remove', function () {
    var button_id = $(this).attr("id");
    //cuando da click obtenemos el id del boton
    $('#row' + button_id + '').remove(); //borra la fila
    //limpia el para que vuelva a contar las filas de la tabla
    $("#adicionados").text("");
    var nFilas = $("#grilla_principal tr").length;
    $("#adicionados").append(nFilas - 1);
    calcular_tipo_t();
    calcular_tipo_carros_t();
    calcular_tipo_cajones_t();
    // obtener_fila();     
});

$(document).on('click', '.btn_remove', function () {
    var button_id = $(this).attr("id");
    //cuando da click obtenemos el id del boton
    $('#row' + button_id + '').remove(); //borra la fila
    //limpia el para que vuelva a contar las filas de la tabla
    $("#adicionados").text("");
    var nFilas = $("#myTable tr").length;
    $("#adicionados").append(nFilas - 1);
    calcular_tipo();
    calcular_tipo_carros();
    calcular_tipo_cajones();
    // obtener_fila();     
});

function cargar_estilo_calendario() {



    $('.datepicker').pickadate({
        // Escape any “rule” characters with an exclamation mark (!).
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy',
        hiddenPrefix: 'prefix__',
        hiddenSuffix: '__suffix',
        cancel: 'Cancelar',
        clear: 'Limpiar',
        done: 'Ok',
        today: 'Hoy',
        close: 'Cerrar',
        max: true,
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],


    });
}

function cargar_datos_key() {

 
        if (event.keyCode == 13 || event.which == 13) {
           
            traer_control($('#txt_lote').val(), $('#calendario_embarque').val());
           // $('#txt_lote').val('');

            //contar();
        }
    
}



function cargar_datos_key_transferencia() {


    if (event.keyCode == 13 || event.which == 13) {

        traer_controlt($('#txt_lotet').val(), $('#calendario_transferencia').val());
        //$('#txt_lotet').val('');

        //contar();
    }

}