
    function enviar_pdf(numero) 
    {
    var url = "http://192.168.125.20:8086/Embarque/reportes/Reporte_embarque.jsp?numero="+numero;
    window.open(url);
    }
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
    // Install input filters.
    setInputFilter(document.getElementById("txt_nro_fact"), function (value) {
    return /^-?\d*$/.test(value);
});
 
    function a() {
    $(".ocultar").hide();
    }
    function cargar_grilla(cod_lote,tipo,nro_carrito,item_codigo,cantidad,fecha_puesta,estado,identificador) {
    

    if (checkId(identificador)) {
        return aviso_duplicado();
    }

      //  registrar_pendientes(cod_lote,tipo,nro_carrito,item_codigo,cantidad,fecha_puesta,estado,identificador);
        $("#myTable").dataTable().fnDestroy(); //DESTRUYE LA FUNCION DE DATATABLE.
        // CLASE SELECTED ELIMINA DEFINITIVAMENTE     
        $('#myTable tbody').append('<tr class="suma "  id="row' +identificador + '" > \n\
        <td class="ocultar">'+cod_lote+'</td>\n\
        <td>'+tipo+'</td>\n\
        <td>'+nro_carrito+'</td>\n\
        <td class="ocultar">'+item_codigo+'</td>\n\
        <td>'+cantidad+'</td>\n\
        <td>'+fecha_puesta+'</td>\n\
        <td> <input type="button" onclick="eliminar_fila_embarque_pendientes('+identificador+');" value="ELIMINAR" name="remove" id="' + identificador+'"  class="btn btn-danger btn_remove"></td><td>' +estado + '</td>\n\
        <td for="id">' + identificador + '</td></tr> ');
        activar_datatable();
    } 

    function checkId(id) {
    let ids = document.querySelectorAll('#myTable td[for="id"]');

    return [].filter.call(ids, td => td.textContent === id).length === 1;
}

    function validar_factura(numero) {

if (numero == "") {


    }

    else {
        $.get('select_facturas.jsp', { numero: numero  }, function (res) {
            //$("#contenido_principal").html(res);
           // var resultado = parseInt(res.trim())
           // res = res.replace(/\s/g, '');
            var split=res.codigo;
            var A="";
            var B="";
            var C="";
            var D="";
            var S="";
            var J="";
            var G="";
            if (split== 'A_0,B_0,C_0,D_0,S_0,J_0,G_0') {

                swal.fire({
                    type: 'error',
                    title: "ERROR, FACTURA NO EXISTE O YA HA SIDO CERRADA",
                    confirmButtonText: "CERRAR"
                });

                $('#txt_nro_fact').val('');
             $('#total_a').val('0');
             $('#total_b').val('0');
             $('#total_c').val('0');
             $('#total_d').val('0');
             $('#total_s').val('0');
             $('#total_j').val('0');
             $('#total_g').val('0');
             
             colorear_blanco();

             }
            else {
                
                var arr=split.split(',');
      var i=0;
                for(  i=0; i<arr.length; i++)
                  {
                   A=arr[0];
                   B=arr[1];
                   C=arr[2];
                   D=arr[3];
                   S=arr[4];
                   J=arr[5];
                   G=arr[6];
                  }
             $('#total_a').val(A.substring(2));
             $('#total_b').val(B.substring(2));
             $('#total_c').val(C.substring(2));
             $('#total_d').val(D.substring(2));
             $('#total_s').val(S.substring(2));
             $('#total_j').val(J.substring(2));
             $('#total_g').val(G.substring(2));
             $('#total_factura_carros').val(res.total);
                colorear();
                
              
             }

        });

    }
    
                                    }
    
    function resultado_aviso(resultado) {
    resultado = resultado.replace(/\s/g, '');
  
     $('#txt_lote').val(resultado);
 }
 
    function validar(area, usuario_sap, pass_sap, nombre_usuario) {
    var cbox_chofer = $('#cbox_chofer').val();
    var calendario = $('#calendario_embarque').val();
    var cbox_camion = $('#cbox_camion').val();
    var txt_union_filas = $('#resultado').val();

    if (cbox_chofer == "-" || calendario == "" || cbox_camion == "-" || txt_union_filas == "") {
        aviso_error();
    }
    else {
        confirmar_registro();

    }

}

    function registrar_embarque() {

 var cajon_a=$('#tipo_cja').val()*360;
 var carro_a= $('#tipo_ca').val()*4320;
 var total_cajon_a= $('#tipo_cja').val();
 var total_carro_a= $('#tipo_ca').val();
 
 var cajon_b=$('#tipo_cjb').val()*360;
 var carro_b= $('#tipo_cb').val()*4320;
 var total_cajon_b=$('#tipo_cjb').val();
 var total_carro_b= $('#tipo_cb').val();
 
 var cajon_c= $('#tipo_cjc').val()*360;
 var carro_c= $('#tipo_cc').val()*4320;
 var total_cajon_c= $('#tipo_cjc').val();
 var total_carro_c= $('#tipo_cc').val();
 
 var cajon_d= $('#tipo_cjd').val()*360;
 var carro_d= $('#tipo_cd').val()*4320;
 var total_cajon_d= $('#tipo_cjd').val();
 var total_carro_d= $('#tipo_cd').val();
 
 var cajon_s= $('#tipo_cjs').val()*360;
 var carro_s= $('#tipo_cs').val()*4320;
 var total_cajon_s= $('#tipo_cjs').val();
 var total_carro_s= $('#tipo_cs').val();
 
 var cajon_j= $('#tipo_cjj').val()*360;
 var carro_j= $('#tipo_cj').val()*4320;
 var total_cajon_j= $('#tipo_cjj').val();
 var total_carro_j= $('#tipo_cj').val();
 
 var cajon_g= $('#tipo_cjg').val()*180;
 var carro_g= $('#tipo_cg').val()*2160; 
 var total_cajon_g= $('#tipo_cjg').val();
 var total_carro_g= $('#tipo_cg').val();
 
 var total_a_grilla=cajon_a+carro_a;
 var total_b_grilla=cajon_b+carro_b;
 var total_c_grilla=cajon_c+carro_c;
 var total_d_grilla=cajon_d+carro_d;
 var total_s_grilla=cajon_s+carro_s;
 var total_j_grilla=cajon_j+carro_j;
 var total_g_grilla=cajon_g+carro_g;
  
 var fac_a=$('#total_a').val();
 var fac_b=$('#total_b').val();
 var fac_c= $('#total_c').val();
 var fac_d= $('#total_d').val();
 var fac_s= $('#total_s').val();
 var fac_j= $('#total_j').val();
 var fac_g= $('#total_g').val();
 
    var total_carros=parseInt(total_carro_a)+parseInt(total_carro_b)+parseInt(total_carro_c)+parseInt(total_carro_d)+parseInt(total_carro_s)+parseInt(total_carro_j)+parseInt(total_carro_g);
    var total_cajones=(parseInt(total_cajon_a)+parseInt(total_cajon_b)+parseInt(total_cajon_c)+parseInt(total_cajon_d)+parseInt(total_cajon_s)+parseInt(total_cajon_j)+parseInt(total_cajon_g))/12;
      
    $('#total_carros_grilla').val(parseInt(total_carros)+parseInt(total_cajones));
 var total_carros_factura=  $('#total_factura_carros').val();
 var total_carros_grilla=  $('#total_carros_grilla').val();
 
 
/*if(parseInt(total_carros_factura)===parseInt(total_carros_grilla))
{*/
    if (total_a_grilla>fac_a)         
     {aviso_cantidad_mayor('A',(fac_a/360));}
     
    else if ( total_b_grilla>fac_b )
    {aviso_cantidad_mayor('B',(fac_b/360));  }
 
    else if ( total_c_grilla>fac_c)
    {aviso_cantidad_mayor('C',(fac_c/360));}
  
    else if (total_d_grilla>fac_d )
    {aviso_cantidad_mayor('D',(fac_d/360));}
  
    else if ( total_s_grilla>fac_s )
    {aviso_cantidad_mayor('S',(fac_s/360));}
  
    else if (total_j_grilla>fac_j )
    {aviso_cantidad_mayor('J',(fac_j/360));}
  
    else if (total_g_grilla>fac_g)
    {aviso_cantidad_mayor('G',(fac_g/360));}
 
 
 else{
     
     
  
    var filas = document.querySelectorAll("#myTable tbody tr");
    var cod_lote;
    var cod_carrito;
    var cantidad;
    var tipo_huevo;
    var estado;
    var c = 0;
    var valores = '';
    var tipos = '';
    var identificador;

    // recorremos cada una de las filas
  /*  filas.forEach(function (e) {
    // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        cod_lote        = columnas[0].textContent;
        cod_carrito     = columnas[2].textContent;
        cantidad        = columnas[4].textContent;
        tipo_huevo      = columnas[3].textContent;
        estado          = columnas[7].textContent;
        identificador   = columnas[8].textContent;

        var arr = cod_lote + '-' + tipo_huevo + '-' + cantidad+ '-' + estado+ '-' + identificador+ '-' + cod_carrito;
        var arr2 =tipo_huevo;

        if (c == 0) {
            valores = arr;
            tipos = arr2;
        }
        else {
            valores = valores + ',' + arr;

            if (tipos.includes(tipo_huevo)) {
            }
            else {
                tipos = tipos + ',' + arr2;
            }
           
        }
        c++;
    });*/
   
    
    
//alert(valores);
  
   var table = $('#myTable').DataTable();
 var data = table.rows({selected:  true}).data();
var newarray=[];       
        for (var i=0; i < data.length ;i++){
            newarray.push(data[i][0]+"-"+data[i][2]+"-"+data[i][4]+"-"+data[i][3]+"-"+data[i][7]+"-"+data[i][8]);
         }
 
var sData = newarray.join();
 $('#resultado').val(valores);
    $('#tipo_grilla').val(tipos);
alert(sData);
   // validar();
 }
 

/*}
 
  else if (parseInt(total_carros_factura)<parseInt(total_carros_grilla)) {
        swal.fire({
        type:'error',
        title: "ERROR, CANTIDAD EXCEDIDA",
        confirmButtonText: "CERRAR"
    });
    
      //  alert(total_carros_factura+'  '+total_carros_grilla);
     
 }
  else if (parseInt(total_carros_factura)>parseInt(total_carros_grilla)) {
        swal.fire({
        type:'error',
        title: "ERROR, CARROS FALTANTES, FAVOR VERIFICAR",
        confirmButtonText: "CERRAR"
    });
    
      //  alert(total_carros_factura+'  '+total_carros_grilla);
     
 }

 */
 

}

    function colorear() {
    var inputVal = document.getElementById("txt_nro_fact");
    inputVal.style.backgroundColor = "#68FF33";
    $('#div_embarque_carga').show();
    }

    function colorear_blanco() {
    var inputVal = document.getElementById("txt_nro_fact");
    inputVal.style.backgroundColor = "#ffffff";
    }
    
    ﻿function calcular_tipo_carros() {
 
    var total_tipoCC = 0;
    var total_tipoCA = 0;
    var total_tipoCB = 0;
    var total_tipoCD = 0;
    var total_tipoCS = 0;
    var total_tipoCG = 0;
    var total_tipoCJ = 0;
 // recorremos cada una de las filas
    $('#tipo_ca').val('0');
    $('#tipo_cb').val('0');
    $('#tipo_cc').val('0');
    $('#tipo_cd').val('0');
    $('#tipo_cs').val('0');
    $('#tipo_cj').val('0');
    $('#tipo_cg').val('0');
    
    var table = $('#myTable').DataTable();
    var data = table.rows({selected:  true}).data();
    for (var i=0; i < data.length ;i++){
        var cantidad_tipoCC = parseFloat(data[i][4]);
        var cantidad_tipoCA = parseFloat(data[i][4]);
        var cantidad_tipoCB = parseFloat(data[i][4]);
        var cantidad_tipoCD = parseFloat(data[i][4]);
        var cantidad_tipoCS = parseFloat(data[i][4]);
        var cantidad_tipoCJ = parseFloat(data[i][4]);
        var cantidad_tipoCG = parseFloat(data[i][4]);
        var tipo_carro = parseFloat(data[i][3]);   
         
        if (tipo_carro == '1' &&  cantidad_tipoCG=="2160") {
            total_tipoCG += cantidad_tipoCG;
            $('#tipo_cg').val(parseInt(total_tipoCG) / 2160);
        }
       if (tipo_carro == '2' && cantidad_tipoCJ == "4320") {
            total_tipoCJ += cantidad_tipoCJ;
            $('#tipo_cj').val(parseInt(total_tipoCJ) / 4320);

        }
        if (tipo_carro == '3' && cantidad_tipoCS == "4320") {
            total_tipoCS += cantidad_tipoCS;
            $('#tipo_cs').val(parseInt(total_tipoCS) / 4320);
        }
        if (tipo_carro == '4' && cantidad_tipoCA == "4320") {
            total_tipoCA += cantidad_tipoCA;
            $('#tipo_ca').val(parseInt(total_tipoCA) / 4320);
        }
        if (tipo_carro == '5' && cantidad_tipoCB == "4320") {
            total_tipoCB += cantidad_tipoCB;
            $('#tipo_cb').val(parseInt(total_tipoCB) / 4320);
        }
        
          if (tipo_carro == '6' && cantidad_tipoCC == "4320") {
            total_tipoCC += cantidad_tipoCC;
            $('#tipo_cc').val(parseInt(total_tipoCC) / 4320);

        }
        if (tipo_carro == '7' && cantidad_tipoCD == "4320") {
            total_tipoCD += cantidad_tipoCD;
            $('#tipo_cd').val(parseInt(total_tipoCD) / 4320);
        }
      
    }
     calcular_tipo_cajones(); 
}

    function calcular_tipo_cajones() {
    // obtenemos todas las filas del tbody
    var total_tipoCJC = 0;
    var total_tipoCJA = 0;
    var total_tipoCJB = 0;
    var total_tipoCJD = 0;
    var total_tipoCJS = 0;
    var total_tipoCJG = 0;
    var total_tipoCJJ = 0;
    // recorremos cada una de las filas
    $('#tipo_cja').val('0');
    $('#tipo_cjb').val('0');
    $('#tipo_cjc').val('0');
    $('#tipo_cjd').val('0');
    $('#tipo_cjs').val('0');
    $('#tipo_cjj').val('0');
    $('#tipo_cjg').val('0');
    
    var table = $('#myTable').DataTable();
    var data = table.rows({selected:  true}).data();
    for (var i=0; i < data.length ;i++){
         // obtenemos los valores de la cantidad y importe
        var cantidad_tipoCJC    = parseFloat(data[i][4]);
        var cantidad_tipoCJA    = parseFloat(data[i][4]);
        var cantidad_tipoCJB    = parseFloat(data[i][4]);
        var cantidad_tipoCJD    = parseFloat(data[i][4]);
        var cantidad_tipoCJS    = parseFloat(data[i][4]);
        var cantidad_tipoCJJ    = parseFloat(data[i][4]);
        var cantidad_tipoCJG    = parseFloat(data[i][4]);
        var tipo_cajon          = parseFloat(data[i][3]);  
    
        if (tipo_cajon == '1' && cantidad_tipoCJG != "2160") {
            total_tipoCJG += cantidad_tipoCJG;
            $('#tipo_cjg').val(parseInt(total_tipoCJG) / 180);
            }
        if (tipo_cajon == '2' && cantidad_tipoCJJ != "4320") {
            total_tipoCJJ += cantidad_tipoCJJ;
            $('#tipo_cjj').val(parseInt(total_tipoCJJ) / 360);
            }
        if (tipo_cajon == '3' && cantidad_tipoCJS != "4320") {
            total_tipoCJS += cantidad_tipoCJS;
            $('#tipo_cjs').val(parseInt(total_tipoCJS) / 360);
            }
        if (tipo_cajon == '4' && cantidad_tipoCJA != "4320") {
            total_tipoCJA += cantidad_tipoCJA;
            $('#tipo_cja').val(parseInt(total_tipoCJA) / 360);
            }
        if (tipo_cajon == '5' && cantidad_tipoCJB != "4320") {
            total_tipoCJB += cantidad_tipoCJB;
            $('#tipo_cjb').val(parseInt(total_tipoCJB) / 360);
            }
        if (tipo_cajon == '6' && cantidad_tipoCJC != "4320") {
            total_tipoCJC += cantidad_tipoCJC;
            $('#tipo_cjc').val(parseInt(total_tipoCJC) / 360);
            }
        if (tipo_cajon == '7' && cantidad_tipoCJD != "4320") {
            total_tipoCJD += cantidad_tipoCJD;
            $('#tipo_cjd').val(parseInt(total_tipoCJD) / 360);
            }
    };
        }
        
    function calcular_tipo() {
            var total_tipoC = 0;
            var total_tipoA = 0;
            var total_tipoB = 0;
            var total_tipoD = 0;
            var total_tipoS = 0;
            var total_tipoG = 0;
            var total_tipoJ = 0;
 
            $('#tipo_a').val('0');
            $('#tipo_b').val('0');
            $('#tipo_c').val('0');
            $('#tipo_d').val('0');
            $('#tipo_s').val('0');
            $('#tipo_j').val('0');
            $('#tipo_g').val('0');

            var table = $('#myTable').DataTable();//OBTENEMOS LOS DATOS QUE SE HAN CARGADO EN LA MEMORIA DEL DATATABLE.
            var data = table.rows({selected:  true}).data();
            for (var i=0; i < data.length ;i++){
                 // obtenemos los valores de la cantidad y importe
                var cantidad_tipoC  = parseFloat(data[i][4]);
                var cantidad_tipoA  = parseFloat(data[i][4]);
                var cantidad_tipoB  = parseFloat(data[i][4]);
                var cantidad_tipoG  = parseFloat(data[i][4]);
                var cantidad_tipoD  = parseFloat(data[i][4]);
                var cantidad_tipoS  = parseFloat(data[i][4]);
                var cantidad_tipoJ  = parseFloat(data[i][4]);
                var tipo            = parseFloat(data[i][3]);  

                if (tipo == '1') {
                    total_tipoG += cantidad_tipoG;
                    $('#tipo_g').val(parseInt(total_tipoG) / 180);
                    }
                if (tipo == '2') {
                    total_tipoJ += cantidad_tipoJ;
                    $('#tipo_j').val(parseInt(total_tipoJ) / 360);
                }
                if (tipo == '3') {
                    total_tipoS += cantidad_tipoS;
                    $('#tipo_s').val(parseInt(total_tipoS) / 360);
                }
                if (tipo == '4') {
                    total_tipoA += cantidad_tipoA;
                    $('#tipo_a').val(parseInt(total_tipoA) / 360);
                }
                if (tipo == '5') {
                    total_tipoB += cantidad_tipoB;
                    $('#tipo_b').val(parseInt(total_tipoB) / 360);
                }
                if (tipo == '6') {
                    total_tipoC += cantidad_tipoC;
                    $('#tipo_c').val(parseInt(total_tipoC) / 360);
                }
                if (tipo == '7') {
                    total_tipoD += cantidad_tipoD;
                    $('#tipo_d').val(parseInt(total_tipoD) / 360);
                }
            };

            var total = 0; 
            total = parseInt(total_tipoA) + parseInt(total_tipoB) + parseInt(total_tipoC) + parseInt(total_tipoD) + parseInt(total_tipoS) + parseInt(total_tipoJ) + parseInt(total_tipoG);
            $('#total_cajones').val(total/ 360);
            $('#total_carros').val(parseInt(total)/4320);
            
            calcular_tipo_carros();
    }