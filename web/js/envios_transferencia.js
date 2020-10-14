




function traer_controlt(id, calendario) {

    $.get('select_lotes_transfer.aspx', { id: id, calendario: calendario }, function (res) {
        $("#contenido_principal").html(res);
    });
}