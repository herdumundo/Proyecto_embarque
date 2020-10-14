function enviar_datos_lotes(tipo_registro){
        var url = tipo_registro+".jsp";                                      

        $.ajax({                        
           type: "POST",                 
           url: url,                    
           data: $("#formulario").serialize(),
           success: function(data)            
           {
             $('#loading-screen').html(data);           
           }
         });
      }
     
      function enviar_datos_retenidos2() {

        $.ajax({
        type: "POST",
        url: "control_insert_retenidos.jsp",
        data: $("#formulario_retenido").serialize(),
        success: function(data) {
         $('#contenido_retenido').html(data);
                                }
                });
 
                                              };
     
     function enviar_datos_carromesa() {

        $.ajax({
          type: "POST",
          url: "control_carro_mesa.jsp",
          data: $("#formulario_carro_mesa").serialize(),
          success: function(data) {
         //   $('#contenido_reporte').html(data);
                                    }
        });

       };  
     
      
      
      function enviar_datos_reproceso() {

        $.ajax({
          type: "POST",
          url: "control_reproceso.jsp",
          data: $("#formulario_reproceso").serialize(),
          success: function(data) {
          $('#contenedor_grilla_reproceso').html(data);
                                    }
        });

       }; 
  
     function insert(lote,comentario){
              
                $.get('control_editar_comentario.jsp',{lote:lote,comentario:comentario},
                function(res){
                    
                     $("#container").html(res);
                });
                
               
            }
            
            
            
               function principal(calendario_informe,estado,tipo_huevo){
          $.get('grilla_normal.jsp',{calendario_informe:calendario_informe,estado:estado,tipo_huevo:tipo_huevo },
                function(res){
                      $("#mobiles").html(res);
                });
                    $('#divid').show();                             }