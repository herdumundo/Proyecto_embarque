

function aviso(mensaje) {

    swal.fire({
        title: mensaje,
        confirmButtonText: "CERRAR"
    });
    traer_embarque();

}

function aviso_error() {
     swal.fire({
        type: 'error',
        title: "ERROR, COMPLETAR DATOS ",
        confirmButtonText: "CERRAR"
    });
 }


function aviso_cantidad_mayor(tipo,cantidad) {
 
    swal.fire({
        type: 'error',
        title: "TIPO "+tipo+" SUPERA LA CANTIDAD REQUERIDA",
        text: "CANTIDAD REQUERIDA '"+cantidad +" CAJONES' ",

        confirmButtonText: "CERRAR"
    });
    
    
}

function aviso_error_conexion() {
    Swal.fire({
        title: 'ERROR, DE CONEXION CON LA BASE DE DATOS, INTENTE DE NUEVO',
        type: 'error',
        animation: false,
        customClass: {
            popup: 'animated tada'
        }
    })


}



function error_verificar() {
    Swal.fire({
        title: 'ERROR, VERIFICAR DATOS',
        type: 'error',
        animation: false,
        customClass: {
            popup: 'animated tada'
        }
    })


}

function aviso_error_carro(c) {

    swal.fire({
        type: 'error',
        title: "ERROR, NO SE ENCUENTRA EL CARRO NRO. "+c,
        confirmButtonText: "CERRAR"
    });

}

function aviso_error_carro_retenido() {

    swal.fire({
        type: 'error',
        title: "EL CARRO SE ENCUENTRA RETENIDO " ,
        confirmButtonText: "CERRAR"
    });

}
function aviso_error_embarque(mensaje) {

    swal.fire({
        type: 'error',
        title: mensaje ,
        confirmButtonText: "CERRAR"
    });

}
function aviso_error_factura() {

    swal.fire({
        type: 'error',
        title: "ERROR, FACTURA NO EXISTE O YA HA SIDO CERRADA",
        confirmButtonText: "CERRAR"
    });

}
function aviso_duplicado() {

    swal.fire({
        type: 'error',
        title: "ERROR, CODIGO DUPLICADO",
        confirmButtonText: "CERRAR"
    });

}

function confirmar_registro(datos_grilla) {
    var total = $('#total_cajones').val();

        Swal.fire({
            title: 'REGISTRO DE EMBARQUE TOTAL EN CAJONES:' + total,
            text: "DESEA REGISTRAR LOS DATOS INGRESADOS?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, REGISTRAR!',
            cancelButtonText: 'NO, CANCELAR!' }).then((result) => {
        if (result.value) {
        control_embarque( $('#cbox_chofer').val(), $('#cbox_camion').val(), datos_grilla, $('#calendario_embarque').val(), $('#txt_nro_fact').val(), $('#hora_inicio').val());
        }
        });

     
}


function aviso_registrado_em(numero) {
    
    
       Swal.fire({
        title: "REGISTRADO CON EXITO",
        text: "DESEA IMPRIMIR?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, IMPRIMIR!',
        cancelButtonText: 'NO, CANCELAR!'
    }).then((result) => {
        if (result.value) {
           enviar_pdf(numero);
        }
    });
    
     
}



function aviso_registro_embarque(resultad_final,out_cod_lote_rec,out_area_rec,out_numero_fact_rec,numero) {
  //  var resultado = parseInt(resultad_final);
    var resultado =  resultad_final ;

    if (resultado == 1) 
    {
 
       Swal.fire({
        title: "REGISTRADO CON EXITO",
        text: "DESEA GENERAR EL REPORTE EN PDF?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI!',
        cancelButtonText: 'NO, CANCELAR!'
    }).then((result) => {
        if (result.value) {
           enviar_pdf(numero);
        }
    });
              traer_informe_factura();
    }

    else if (resultado == 0) {

        swal.fire({
            type: 'error',
            title: "CARRO NRO. "+out_cod_lote_rec+" INGRESADO EN FACTURA "+out_numero_fact_rec+" PARA EL AREA "+out_area_rec,
            confirmButtonText: "CERRAR"
        });
     //   traer_embarque();

    }

    else if (resultado == 4) {

        swal.fire({
            type: 'error',
            title: "ERROR, LA CONEXION A LA BASE DE DATOS HA FALLADO, INTENTE DE NUEVO",
            confirmButtonText: "CERRAR"
        });


    }
    else
    {
        swal.fire
            ({
            type: 'error',
            title: resultad_final,
            confirmButtonText: "CERRAR"
            });
            //  traer_embarque();
    }






}


/////////////////////////////////////////////////////////////////////////////////////////////transferencias/////////////////////////////////////////////////////////



function confirmar_registro_transferencia() {
    var total = $('#total_cajonest').val();
    



    var total = $('#total_cajonest').val();
    Swal.fire({
        title: "REGISTRO DE TRANSFERENCIA TOTAL EN CAJONES: " + total,
        text: "DESEA REGISTRAR LOS DATOS INGRESADOS?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, REGISTRAR!',
        cancelButtonText: 'NO, CANCELAR!'
    }).then((result) => {
        if (result.value) {
            obtener_filat(); validart();
        }
    })

 
}


function aviso_registrado_transferencia() {
    traer_transferencia();


    swal.fire({
        type: 'success',
        title: "REGISTRADO CON EXITO",
        confirmButtonText: "CERRAR"
    });


}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function confirmar_registro_transferencia_sub() {
    var total = $('#total').val();

 
     
 
    swal.fire({
        title: "REGISTRO DE TRANSFERENCIA TOTAL GRANEL: " + total,
        text: "DESEA REGISTRAR LOS DATOS INGRESADOS?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "SI!",
        closeOnConfirm: true
    },
        function () {
            obtener_filat_sub(); validart_sub();
        }) 
}


function aviso_registrado_transferencia_sub() {
    traer_transferencia_sub();


    swal.fire({
        type: 'success',
        title: "REGISTRADO CON EXITO",
        confirmButtonText: "CERRAR"
    });


}
