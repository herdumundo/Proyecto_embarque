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
                aviso_registro_embarque(data.resultad_final,data.out_cod_lote_rec,data.out_area_rec,data.out_numero_fact_rec,data.nro_embarque,data.mensaje);
                } 
                });
    }
    
    
    function control_sincronizar_lotes(){
           $.ajax({
            type: "POST",
            url: 'control_sincro_lotes.jsp',
       
            data: ({ test: '' }),
            
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
                aviso_lotes_sincronizados(data.tipo,data.mensaje);
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
 
    function eliminar_fila_embarque_pendientes(){
        
       $('.table').on( 'click', '.remove', function () 
            {   // EN ESTE PROCESO LO QUE SE BUSCA HACER ES, PRIMERO, RECUPERAR EL ID DE LA FILA CLICKEADA PARA LUEGO MANDAR EL ID AL CONTROL ELIMINAR, 
                //LUEGO ELIMINA LA FILA EN EL DATATABLE.
                var table = $('#myTable').DataTable();//OBTENGO EL ID DE MI TABLA.
                var id_carro=table.cell( $(this).closest('tr'), 8 ).data();// OBTENGO EL VALOR DE LA POSICION 8 DE LA FILA SELECCIONADA PARA ELIMINAR, EN ESTE CASO SELECCIONO EL ID DEL LOTE.
           
                
                $.get('control_grilla_recuperada_eliminar.jsp', { id:id_carro, nro_factura: $('#txt_nro_fact').val() }, 
                function (res) {
      
                    table.row($('#row'+id_carro)).remove().draw();
                    calculos_cantidades_grilla();  
                    }); 
                
               
            });  
        
  }


function activar_datatable(){
 
    $('#myTable').DataTable({
        "retrieve": true,
        "scrollX": true,     
        "paging":   false ,
        "info":     false 
        ,  'order' : [[9,'desc']],
       "oLanguage": { 
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningun dato disponible en esta tabla",
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
            } }  
        }) ;
    calculos_cantidades_grilla();

    }
 