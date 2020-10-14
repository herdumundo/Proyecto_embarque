 
 
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


 
 
function cargar_grillat() {
    var item_codigo = $("#item_codigot").val();
    var tipo = $("#tipot").val();
    var nro_carrito = $("#nro_carritot").val();
    var cod_lote = $("#cod_lotet").val();
    var cantidad = $("#cantidadt").val();
    var fecha_puesta = $("#fecha_puestat").val();

    if (checkIdt(cod_lote)) {
        return aviso_duplicado();
    }

    $('#grilla_principal tbody').append('<tr class="suma" id="row' + cod_lote + '" > <td class="ocultar" for="id">' + cod_lote + '</td><td>' + tipo + '</td><td>' + nro_carrito + '</td>><td class="ocultar">' + item_codigo + '</td>><td>' + cantidad + '</td>><td>' + fecha_puesta + '</td><td> <input type="button" value="ELIMINAR" name="remove" id="' + cod_lote + '"    class="btn btn-danger btn_remove"></td></tr>');
    calcular_tipo_t();
    calcular_tipo_carros_t();
    calcular_tipo_cajones_t();
    $(".ocultar").hide();
    //obtener_fila();
} 


function checkIdt(id) {
    let ids = document.querySelectorAll('#grilla_principal td[for="id"]');

    return [].filter.call(ids, td => td.textContent === id).length === 1;
}




function loader() {

    $.preloader.start({
        modal: true,
        src: '301.png'
    });

}








 



function validart() {
     
    var calendario = $('#calendario_transferencia').val();
   // var cbox_origen = $('#cbox_origen').val();
    var cbox_destino = $('#cbox_destino').val();
    var txt_union_filas = $('#resultadot').val();
    var cbox_encargado = $('#cbox_encargado').val();

    if ( calendario == "" || cbox_destino == "-" || txt_union_filas == "" || cbox_encargado=="-") {
        aviso_error();
    }
    else {

        enviar_datos_transferencia($('#tipo_at').val(),
            $('#tipo_bt').val(),
            $('#tipo_ct').val(),
            $('#tipo_dt').val(),
            $('#tipo_st').val(),
            $('#tipo_jt').val(),
            $('#tipo_gt').val(),
            $('#cbox_destino').val(),
            $('#resultadot').val(),
            $('#calendario_transferencia').val(),
            $('#cbox_encargado').val());
        loader();
       
            }

}
function enviar_datos_transferencia(
    tipo_a,
    tipo_b,
    tipo_c,
    tipo_d,
    tipo_s,
    tipo_j,
    tipo_g,
    cbox_destino,
    resultado,
    calendario,
    encargado) {

    $.get('control_transferencia.aspx', {
        tipo_a: tipo_a,
        tipo_b: tipo_b,
        tipo_c: tipo_c,
        tipo_d: tipo_d,
        tipo_s: tipo_s,
        tipo_j: tipo_j,
        tipo_g: tipo_g,
        cbox_destino: cbox_destino,
        resultado: resultado,
        calendario: calendario,
        encargado: encargado
    },
        function (res) {

            $("#contenido_transferencia").html(res);
        });
}  

function calcular_tipo_t() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#grilla_principal tbody tr");
    var total_tipoC = 0;
    var total_tipoA = 0;
    var total_tipoB = 0;
    var total_tipoD = 0;
    var total_tipoS = 0;
    var total_tipoG = 0;
    var total_tipoJ = 0;


    // recorremos cada una de las filas
    $('#tipo_at').val('0');
    $('#tipo_bt').val('0');
    $('#tipo_ct').val('0');
    $('#tipo_dt').val('0');
    $('#tipo_st').val('0');
    $('#tipo_jt').val('0');
    $('#tipo_gt').val('0');
    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        var cantidad_tipoC = parseFloat(columnas[4].textContent);
        var cantidad_tipoA = parseFloat(columnas[4].textContent);
        var cantidad_tipoB = parseFloat(columnas[4].textContent);
        var cantidad_tipoC = parseFloat(columnas[4].textContent);
        var cantidad_tipoD = parseFloat(columnas[4].textContent);
        var cantidad_tipoS = parseFloat(columnas[4].textContent);
        var cantidad_tipoJ = parseFloat(columnas[4].textContent);
        var cantidad_tipoG = parseFloat(columnas[4].textContent);
        var tipo = parseFloat(columnas[3].textContent);
        // var importe=parseFloat(columnas[2].textContent);
        // mostramos el total por fila

        if (tipo == '1') {
            total_tipoG += cantidad_tipoG;
            $('#tipo_gt').val(parseInt(total_tipoG) / 180);

        }

        if (tipo == '2') {
            total_tipoJ += cantidad_tipoJ;
            $('#tipo_jt').val(parseInt(total_tipoJ) / 360);

        }
        if (tipo == '3') {
            total_tipoS += cantidad_tipoS;
            $('#tipo_st').val(parseInt(total_tipoS) / 360);

        }
        if (tipo == '4') {
            total_tipoA += cantidad_tipoA;
            $('#tipo_at').val(parseInt(total_tipoA) / 360);

        }
        if (tipo == '5') {
            total_tipoB += cantidad_tipoB;
            $('#tipo_bt').val(parseInt(total_tipoB) / 360);

        }
        if (tipo == '6') {

            total_tipoC += cantidad_tipoC;
            $('#tipo_ct').val(parseInt(total_tipoC) / 360);

        }
        if (tipo == '7') {
            total_tipoD += cantidad_tipoD;

            $('#tipo_dt').val(parseInt(total_tipoD) / 360);
        }
    });

    var total = 0; var total_txt_tipo_A = $('#tipo_at').val();
    var total_txt_tipo_A = $('#tipo_at').val();
    var total_txt_tipo_B = $('#tipo_bt').val();
    var total_txt_tipo_C = $('#tipo_ct').val();
    var total_txt_tipo_D = $('#tipo_dt').val();
    var total_txt_tipo_S = $('#tipo_st').val();
    var total_txt_tipo_J = $('#tipo_jt').val();
    var total_txt_tipo_G = $('#tipo_gt').val();

    total = parseInt(total_txt_tipo_A) + parseInt(total_txt_tipo_B) + parseInt(total_txt_tipo_C) + parseInt(total_txt_tipo_D) + parseInt(total_txt_tipo_S) + parseInt(total_txt_tipo_J) + parseInt(total_txt_tipo_G);

    $('#total_cajonest').val(total);



}

function obtener_filat() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#grilla_principal tbody tr");
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
    $('#resultadot').val(valores);



}

