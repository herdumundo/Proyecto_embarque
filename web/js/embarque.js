
function enviar_pdf(numero) 
{
    var url = "http://192.168.6.162:8086/Embarque/reportes/Reporte_embarque.jsp?numero="+numero;
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

    
    registrar_pendientes(cod_lote,tipo,nro_carrito,item_codigo,cantidad,fecha_puesta,estado,identificador);
               
     $('#myTable tbody').append('<tr class="suma" id="row' +identificador + '" > <td class="ocultar"><b>' + cod_lote + '</b></td><td><b>' + tipo +
            '</b></td><td><b>' +nro_carrito + '</b></td>><td class="ocultar"><b>' + item_codigo + '</b></td>><td><b>' + cantidad 
            + '</b></td><td><b>' + fecha_puesta + '</b></td><td> <input type="button" onclick="eliminar_fila_embarque_pendientes('+identificador+');" value="ELIMINAR" name="remove" id="' + identificador 
            + '"  class="btn btn-danger btn_remove"></td><td ><b>' +estado + '</b></td><td for="id"><b>' + identificador + '</b></td></tr> ');
 
 
    calcular_tipo();
    calcular_tipo_carros();
    calcular_tipo_cajones();
   $(".ocultar").hide();
} 

 
function checkId(id) {
    let ids = document.querySelectorAll('#myTable td[for="id"]');

    return [].filter.call(ids, td => td.textContent === id).length === 1;
}




function loader() {

    $.preloader.start({
        modal: true,
        src: '301.png'
    });

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
 /*  if(resultado=="0"){
       
       swal.fire({
            type: 'error',
            title: "ERROR, FACTURA NO EXISTE O YA HA SIDO CERRADA",
            confirmButtonText: "CERRAR"
        });
          $('#txt_lote').val('155');
   }
   else   {
       
       $('#txt_lote').val(resultado);
       
   }*/
     $('#txt_lote').val(resultado);
 }
 


function validar(area, usuario_sap, pass_sap, nombre_usuario) {
    var cbox_chofer = $('#cbox_chofer').val();
    var calendario = $('#calendario_embarque').val();
    var cbox_camion = $('#cbox_camion').val();
    var txt_union_filas = $('#resultado').val();
    var hora_inicio = $('#hora_inicio').val();

    if (cbox_chofer == "-" || calendario == "" || cbox_camion == "-" || txt_union_filas == "") {
        aviso_error();
    }
    else {
        confirmar_registro();

    }

}
function calcular_tipo() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#myTable tbody tr");
    var total_tipoC = 0;
    var total_tipoA = 0;
    var total_tipoB = 0;
    var total_tipoD = 0;
    var total_tipoS = 0;
    var total_tipoG = 0;
    var total_tipoJ = 0;


    // recorremos cada una de las filas
    $('#tipo_a').val('0');
    $('#tipo_b').val('0');
    $('#tipo_c').val('0');
    $('#tipo_d').val('0');
    $('#tipo_s').val('0');
    $('#tipo_j').val('0');
    $('#tipo_g').val('0');
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
    });

    var total = 0; 
  //  var total_txt_tipo_A = $('#tipo_a').val();
    var total_txt_tipo_A = $('#tipo_a').val();
    var total_txt_tipo_B = $('#tipo_b').val();
    var total_txt_tipo_C = $('#tipo_c').val();
    var total_txt_tipo_D = $('#tipo_d').val();
    var total_txt_tipo_S = $('#tipo_s').val();
    var total_txt_tipo_J = $('#tipo_j').val();
    var total_txt_tipo_G = $('#tipo_g').val();

    total = parseInt(total_txt_tipo_A) + parseInt(total_txt_tipo_B) + parseInt(total_txt_tipo_C) + parseInt(total_txt_tipo_D) + parseInt(total_txt_tipo_S) + parseInt(total_txt_tipo_J) + parseInt(total_txt_tipo_G);

    $('#total_cajones').val(total);
    $('#total_carros').val(parseInt(total)/12);
    
    

}

function obtener_fila() {

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
 
 
if(parseInt(total_carros_factura)===parseInt(total_carros_grilla))
{
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
    filas.forEach(function (e) {
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
    });
    $('#resultado').val(valores);
    $('#tipo_grilla').val(tipos);

    validar();
 }
 

}
 
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