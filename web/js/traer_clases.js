
function login() {

    
        $(Document).ready(function () {
            traer_contenedor_menu();
           no_volver_atras();
             });
     
    
}

function no_volver_atras() {

    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () { window.location.hash = "no-back-button"; }

}

 

function traer_contenedor_menu() {
    $("#contenido_principal").html("");
    $("#contenido").html("");
    $("#contenido_principal").show();
    $.get('contenedor_menu.jsp', function (res) {
        $("#contenido_principal").html(res);
    });
}


function traer_embarque(id_camion,nro_factura,cod_chofer,fecha) {
        $.ajax({
        type: "POST",
        url: 'embarque.jsp',
        beforeSend: function () {
            $("#contenido_principal").html("");
            $("#contenido").html("");
        },
        success: function (data) {
            $("#contenido").show();
            $("#contenido").html(data);
            $("#cbox_camion").val(id_camion).change();
            $("#cbox_chofer").val(cod_chofer).change();
            $('#txt_nro_fact').val(nro_factura);
            $('#calendario_embarque').val(fecha);
            $('#txt_lote').focus();
            llenar_grilla_pendientes(nro_factura); 
            validar_factura(nro_factura);
            $('#chkToggle2').bootstrapToggle();
            factura_togle(); 
         //   teclado_formateado();
            cargar_estilo_calendario();
            $('#myTable').bootstrapTable();
           
            
         }
    });
    
  
    
}





function traer_transferencia() {
    $("#contenido_principal").html("");
    $("#contenido").html("");
    $("#contenido").show();
    $.get('transferencia.aspx', function (res) {

        $("#contenido").html(res);
        cargar_estilo_calendario();

        $('#grilla_principal').bootstrapTable();
        $('#tabla_cajones_transferencia').bootstrapTable();
    });
   
}




function traer_informe_factura() {
    $("#contenido_principal").html("");
    $("#contenido").html("");
    $("#contenido").show();
    $.get('informe_factura.jsp', function (res) {

        $("#contenido").html(res);
       

       // $('#grilla_principal_sub').bootstrapTable();
         
    });

}


function ir_informe_embarque() {
    $("#contenido_principal").html("");
    $("#contenido").html("");
    $("#contenido").show();
    $.get('contenedor_reporte_embarque.jsp', function (res) {

        $("#contenido").html(res);
               cargar_estilo_calendario();


       // $('#grilla_principal_sub').bootstrapTable();
         
    });

}



function MantenSesion() {

    var CONTROLADOR = "MantenSesionHandler.ashx";

    var head = $("head").item(0);

    script = document.createElement("script");

    script.src = CONTROLADOR;

    script.setAttribute('type', 'text / javascript');

    script.defer = true;

    head.appendChild(script);

} 



