  function procesar(tipo_registro) {
                             
                            
                              var tipo_huevo=$('#tipo_huevo').val();
                              //var text_resultado = $('#text_resultado').val();
                              var cbox_reproceso = $('#cbox_reproceso').val();
                              var txt_liberado = $('#txt_liberado').val();
                              var txt_responsable = $('#txt_responsable').val();
                              var txt_cantidad = $('#txt_cantidad').val();
                              var cod_carrito = $('#cod_carrito').val();
                              var cbox_zona_liberado = $('#cbox_zona_liberado').val();
                              var categoria = $('#categoria').val();
                              var hora_desde = $('#hora_desde').val();
                              var hora_hasta = $('#hora_hasta').val();
                              var tipo_aviario = $('#tipo_aviario').val();
                              var cbox_sub = $('#cbox_sub').val();
                              var tipo_almacenamiento = $('#tipo_almacenamiento').val();
                              var nro_empacadora = $('#nro_empacadora').val();
      
      if(tipo_registro==="control_registro"){
       
            if(txt_cantidad.length===0||
                       tipo_huevo===0||cod_carrito.length===0||tipo_aviario.length===0||categoria.length===0
                      ||hora_desde.length===0||hora_hasta.length===0||tipo_almacenamiento.length===0
                      ||nro_empacadora.length===0||txt_liberado.length===0){     
                  mensaje_error();
                   }
              else{
                            
          enviar_datos_lotes(tipo_registro);
               
                                     } 
                           } 
  
 if(tipo_registro==="control_retenidos"){
     
  
                 if(txt_cantidad.length===0||
                      tipo_huevo===0||txt_responsable===0||cbox_reproceso===0||cod_carrito.length===0||
                      tipo_aviario.length===0||categoria.length===0
                      ||hora_desde.length===0||hora_hasta.length===0||tipo_almacenamiento.length===0
                      ||nro_empacadora.length===0 ){     
                  mensaje_error();
                   }
              else{
                            
          enviar_datos_lotes(tipo_registro);
               
                                     } 
 
                                       } 
 
  }  

 
 
 
 
 
 
 
 
 
 
  
                function calculo() {
        
        var valor_combo,valor_cantidad,resultado;
        valor_combo=document.getElementById('unidad_medida').value;
        valor_cantidad=document.getElementById('txt_cantidad').value;
        resultado=valor_combo*valor_cantidad;
        document.getElementById('txt_resultado_multiplicacion').value=resultado;
                                    }
                                    
                                    
        function limpiar_cantidad() {
        var cantidad1,cantidad2;
        medida=$("#unidad_medida");    
     
        if  (medida.val()==="180"||medida.val()==="360" ) {
         cantidad2= document.getElementById("txt_cantidad").value="";
                                                        } 
        else  {
        cantidad1= document.getElementById("txt_cantidad").value="1";}
                            }

    function contar()   {
        var input=  document.getElementById('cod_carrito');
        input.addEventListener('input',function(){
        if (this.value.length > 9) 
        this.value = this.value.slice(0,9); 
                                                 }); 
                        }

    function soloNumeros(e)
    {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48 && key <= 57) || (key==8))
    }


//PARA REGISTRO DE RETENIDOS

    /*function visualizar_div_retenido() {
     
 
    
    if ($("#disposicion_registro_retenido").val()==="1"||$("#disposicion_registro_retenido").val()==="2"){
        
                $('#div_alimentacion').show();
                $("#calendario_alimentacion_registro_retenido").prop('required',true);
                $("#mesa_traslado_registro_retenido").prop('required',true);
    }
    else {
        $('#div_alimentacion').hide();
        $("#calendario_alimentacion_registro_retenido").prop('required',false);
        $("#mesa_traslado_registro_retenido").prop('required',false);
        $('#calendario_alimentacion_registro_retenido').datepicker('update','');  
        $("#mesa_traslado_registro_retenido").val('');
          
                 } 
                                        }*/

    function visualizar_codigo_borroso_retenido() {
    
    if (                $("#categoria_registro_recogida").val()==="LDO"){
        
                        $('#div_codigo_borroso_registro_recogida').show();
         
     }
     
     else {
                        $('#div_codigo_borroso_registro_recogida').hide();
           
        } }
    
    function setear_si (){
        var arr =       $('[name="codigo_borroso_registro_retenido"]:checked').map(function(){
                      return this.value;
                        }).get();
                        $('#txt_codigo_borroso_registro_retenido').val(arr);
                    
                    
    if (  $("#categoria_registro_recogida").val()!=="LDO"){
        $("#codigo_borroso_registro_retenido").prop('checked', false);
        $('#txt_codigo_borroso_registro_retenido').val('');  
     }
     
     else {
                
           
        } }
 
 //LIBERADOS
 
    function visualizar_zona_liberado() {
    
    
    var tipo_huevo=$("#tipo_huevo");
   
    if (tipo_huevo.val()==="SC"){
        
               // $('#div_zona_liberado').show();
                $('#div_reproceso_liberado').hide();
                $('#div_sub_liberado').hide();
                $('#div_grupo_aviario_almacenamiento').hide();
                $('#div_empacadora').hide();
               
                $('#div_responsable_liberado').hide();
                $('#div_estado_liberado_registro').hide();
                $("#cbox_zona_liberado").prop('required',true);
                $("#cbox_reproceso").prop('required',false);
                $("#cbox_zona_liberado").prop('required',false);
               
                  $("#txt_liberado").prop('required',false);
                  $("#tipo_aviario").prop('required',false);
                  $("#tipo_almacenamiento").prop('required',false);
                  $("#txt_liberado").val('');
                  $("#nro_empacadora").prop('required',false);
                    setear_cbox_almacenamiento();
                    setear_cbox_tipo_aviario();

            limpiar_codigo_rotos();
      }
      
      
      
      
      if (tipo_huevo.val()==="9"){
        
           // $('#div_zona_liberado').show();
            $('#div_reproceso_liberado').hide();
            $('#div_sub_liberado').hide();
            $('#div_grupo_aviario_almacenamiento').hide();
            $('#div_empacadora').hide();
               
             $('#div_responsable_liberado').hide();
             $('#div_estado_liberado_registro').hide();
             $("#cbox_zona_liberado").prop('required',true);
             $("#cbox_reproceso").prop('required',false);
             $("#cbox_zona_liberado").prop('required',false);
               
                  $("#txt_liberado").prop('required',false);
                  $("#tipo_aviario").prop('required',false);
                  $("#tipo_almacenamiento").prop('required',false);
                  $("#txt_liberado").val('');
                  $("#nro_empacadora").prop('required',false);
                    setear_cbox_almacenamiento();
                    setear_cbox_tipo_aviario();
        setear_codigo_rotos();
          
      }
      
      
      
      
      
      
      if (tipo_huevo.val()==="RP"){
          
          //  $('#div_zona_liberado').hide();
            $('#div_reproceso_liberado').show();
            $('#div_sub_liberado').hide();
            $('#div_empacadora').hide();
            $('#div_grupo_aviario_almacenamiento').hide();
            $('#div_estado_liberado_registro').hide();
            $('#txt_liberado').hide();
            
                          $("#cbox_reproceso").prop('required',true);
                          $("#nro_empacadora").prop('required',false);
                          $("#tipo_aviario").prop('required',false);
                          $("#tipo_almacenamiento").prop('required',false);
                          $("#cbox_sub").prop('required',false);
                          $("#cbox_zona_liberado").prop('required',false);
                          $("#txt_liberado").prop('required',false);
                          $("#txt_liberado").val('');
                        setear_cbox_almacenamiento();
                        setear_cbox_tipo_aviario();
                        limpiar_codigo_rotos();
                                    }
     
      
        if (tipo_huevo.val()==="8"){
          
          //  $('#div_zona_liberado').hide();
            $('#div_reproceso_liberado').hide();
            $('#div_sub_liberado').show();
            $('#div_empacadora').hide();
            $('#div_estado_liberado_registro').hide();
            $('#txt_liberado').hide();
            $('#div_grupo_aviario_almacenamiento').hide();
            $("#cbox_sub").prop('required',true);
            $("#cbox_zona_liberado").prop('required',false);
            $("#cbox_reproceso").prop('required',false);
            
                 
                         $("#txt_liberado").prop('required',false);
                         $("#tipo_aviario").prop('required',false);
                         $("#tipo_almacenamiento").prop('required',false);
                         $("#txt_liberado").val('');
                         $("#nro_empacadora").prop('required',false);

                    setear_cbox_almacenamiento();
                    setear_cbox_tipo_aviario();
                    limpiar_codigo_rotos();
                                        }
      
            if (tipo_huevo.val()==="1"||tipo_huevo.val()==="2"||tipo_huevo.val()==="3"||tipo_huevo.val()==="4"
                ||tipo_huevo.val()==="5"||tipo_huevo.val()==="6"||tipo_huevo.val()==="7") {
          
                // $('#div_zona_liberado').hide();
                 $('#div_reproceso_liberado').hide();
                 $('#div_sub_liberado').hide();
                 $('#div_empacadora').show();
                 $('#div_responsable_liberado').show();
   
            setear_detalle_almacenamiento();
            setear_detalle_tipo_aviario();
    
                $('#div_estado_liberado_registro').show();
                $('#div_grupo_aviario_almacenamiento').show();
                $('#txt_liberado').show();
                $("#cbox_reproceso").prop('required',false);
                $("#cbox_zona_liberado").prop('required',false);
                $("#cbox_sub").prop('required',false);
                $("#txt_liberado").prop('required',true);
                $("#tipo_aviario").prop('required',true);
                $("#tipo_almacenamiento").prop('required',true);
                $("#nro_empacadora").prop('required',true);
                limpiar_codigo_rotos();
                                                                                                            }
                                    }
    
                function setear_cbox_almacenamiento (){
                var  descripcion = "-"; 
                var  valor = "-"; 
                $('#tipo_almacenamiento').children().remove();  
                $('#tipo_almacenamiento').append('<option value="' + valor + '">' +   descripcion + '</option>');
    
                                                       }
    
    
                function setear_cbox_tipo_aviario (){
                var  descripcion = "-"; 
                var  valor = "-"; 
                $('#tipo_aviario').children().remove();  
                $('#tipo_aviario').append('<option value="' + valor + '">' +   descripcion + '</option>');
    
                                                    }
    
    
                function setear_detalle_tipo_aviario(){
            var  descripcion1; 
            var  descripcion  = new Array(); 
            var  valor = new Array(); 

            descripcion1 = "Tipo Aviario"; 
            descripcion[0] = "M";
            valor[0] = "M"; 
            descripcion[1] = "T";
            valor[1] = "T";
         
            $('#tipo_aviario').children().remove();  
            $('#tipo_aviario').append('<option selected disabled>' +   descripcion1+ '</option>');
            for(var i=0; i< descripcion.length; i++) {
            $('#tipo_aviario').append('<option value="' + valor[i] + '">' +   descripcion[i] + '</option>');
                                                     } 
                                                        }
    
    
            function setear_detalle_almacenamiento(){
            var  descripcion1,valor1; 
            var  descripcion  = new Array(); 
            var  valor = new Array(); 

            descripcion1 = "Tipo almacenamiento"; 
            descripcion[0] = "C";
            valor[0] = "C"; 
            descripcion[1] = "P";
            valor[1] = "P";
            descripcion[2] = "M";
            valor[2] = "M";
            $('#tipo_almacenamiento').children().remove();  
            $('#tipo_almacenamiento').append('<option selected disabled>' +   descripcion1+ '</option>');
            for(var i=0; i< descripcion.length; i++) {
            $('#tipo_almacenamiento').append('<option value="' + valor[i] + '">' +   descripcion[i] + '</option>');
                                                        }
  
                                                        }
     
                    function setear_codigo_rotos()
                    {
                    var mesa;
                    mesa= $('#id_date').val()+"_"+$('#id_clasificadora').val();
                    $('#cod_carrito').val(mesa);
                        }
    
                    function limpiar_codigo_rotos(){
        
                    $('#cod_carrito').val('');
        
                                                        }