function calcular_tipo_carros() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#myTable tbody tr");
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

    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        var cantidad_tipoCC = parseFloat(columnas[4].textContent);
        var cantidad_tipoCA = parseFloat(columnas[4].textContent);
        var cantidad_tipoCB = parseFloat(columnas[4].textContent);
        var cantidad_tipoCD = parseFloat(columnas[4].textContent);
        var cantidad_tipoCS = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJ = parseFloat(columnas[4].textContent);
        var cantidad_tipoCG = parseFloat(columnas[4].textContent);
        var tipo_carro = parseFloat(columnas[3].textContent);
        // var importe=parseFloat(columnas[2].textContent);
        // mostramos el total por fila

        if (tipo_carro == '1' && cantidad_tipoCG=="2160") {
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
    });

  



}





















function calcular_tipo_cajones() {

    // obtenemos todas las filas del tbody

    var filas = document.querySelectorAll("#myTable tbody tr");
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
    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td")
        // obtenemos los valores de la cantidad y importe
        var cantidad_tipoCJC = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJA = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJB = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJD = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJS = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJJ = parseFloat(columnas[4].textContent);
        var cantidad_tipoCJG = parseFloat(columnas[4].textContent);
        var tipo_cajon = parseFloat(columnas[3].textContent);
        // var importe=parseFloat(columnas[2].textContent);
        // mostramos el total por fila

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
    });





}