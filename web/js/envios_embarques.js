
  
  
   $(Document).ready(function () {
    traer_contenedor_menu();
     no_volver_atras();
             });
   
         
    function filtrar_listado_embarque(  calendario) {
        $.get('informe_embarque.jsp', {  calendario: calendario }, function (res) {
        $("#contenedor_embarque_lista").html(res);
    });
    }

    function control_embarque(cbox_chofer, cbox_camion, resultado, calendario, numero_factura, hora_inicio){
           $.ajax({
            type: "POST",
            url: 'control_embarque.jsp',
       
            data: ({
                cbox_chofer: cbox_chofer,
                cbox_camion: cbox_camion, resultado: resultado, calendario: calendario, numero_factura: numero_factura,
                hora_inicio: hora_inicio }),
            
              beforeSend: function() {
              Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()   }, 1000);
                                        }        
                        });
                    },           
            
            success: function (data) 
            {
                aviso_registro_embarque(data.resultad_final,data.out_cod_lote_rec,data.out_area_rec,data.out_numero_fact_rec,data.nro_embarque);
                } 
                });
    }
    function traer_control(id, calendario) 
    {
     $.ajax({
            type: "POST",
            url: 'select_lotes.jsp',
            data: ({ id: id, calendario: calendario,factura:$('#txt_nro_fact').val()}),
            beforeSend: function () {

            },
            success: function (data) 
            {
               //  Swal.close();
             $.each(data,function(i, item)
            {  
            if(item.tipo_mensaje=="0") {
                aviso_error_embarque(item.mensaje);
                }
            else    {
                if(item.cod_lote=="0"){
                    aviso_error_carro(item.nro_carrito);
                   }
                else if(item.estado_liberacion=='R'||item.estado_liberacion=='Z') {
                    aviso_error_carro_retenido();
                   }
                else {
                    cargar_grilla(item.cod_lote,item.tipo,item.nro_carrito,item.item_codigo,item.cantidad,item.fecha_puesta,item.estado,item.identificador_lote);   
                        } 
                    }
            });
            $('#txt_lote').val('');
            }
            }); 
    }
 
 function registrar_pendientes(cod_lote,tipo,nro_carrito,item_codigo,cantidad,fecha_puesta,estado,identificador_lote){
     var numero_factura= $('#txt_nro_fact').val();
     $.ajax({
            type: "POST",
            url: 'control_lotes_pendientes.jsp',
            data: ({
                cod_lote: cod_lote,
                tipo_huevo: tipo, carro: nro_carrito, cod_huevo: item_codigo, cantidad: cantidad,
                fecha_puesta: fecha_puesta,estado_lote:estado,identificador_lote:identificador_lote,numero_factura:numero_factura }),
            //dataType: "html",
            success: function (data) 
            {
              //  aviso_registro_embarque(data.resultad_final,data.out_cod_lote_rec,data.out_area_rec,data.out_numero_fact_rec,data.nro_embarque);
              //  return data;
            },
            timeout: 800000,
            error: function () {
                //aviso_error_conexion();
            }
        });
 }
 
 
 
 

function llenar_grilla_pendientes(nro_factura){
      $.get('control_grilla_recuperada.jsp', {  nro_factura: nro_factura }, function (res) {
      $("#tbody_embarque").html(res.grilla);
      $(".ocultar").hide(); 
      activar_datatable();
    });
  }
function eliminar_fila_embarque_pendientes(id){
      $.get('control_grilla_recuperada_eliminar.jsp', { id:id, nro_factura: $('#txt_nro_fact').val() }, function (res) {
      $(".ocultar").hide();// OCULTA LAS COLUMNAS QUE NO SON NECESARIAS PARA EL USUARIO.
        $(this).addClass('selected');
        var table = $('#myTable').DataTable();
        table.row('#row'+id).remove().draw( false );
        activar_datatable();   
      
      }); 
 
  }


function activar_datatable(){
    $(".ocultar").hide(); 
    $("#myTable").dataTable().fnDestroy(); 
    $('#myTable').DataTable({
        "retrieve": true,
        "scrollX": true,     
        "paging":   false ,
        "ordering": true,
        "info":     false ,  
       "oLanguage": { 
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sSearch":         "Buscar Lote:",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }}  
        });
    calculos_cantidades_grilla();

    }
 