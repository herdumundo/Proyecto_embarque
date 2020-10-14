




function traer_controlt_sub(id, calendario) {

    $.get('select_lotes_transfer_sub.aspx', { id: id, calendario: calendario }, function (res) {
        $("#contenido_principal").html(res);
    });
}