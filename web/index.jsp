<%-- 
    Document   : index
    Created on : 03/03/2020, 08:02:00 AM
    Author     : hvelazquez
--%>
<html lang="en">
<%@ page session="true" %>
<%@include  file="chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("nombre_usuario");
      String clasificadora = (String) sesionOk.getAttribute("area");
     // String user_name = (String) sesionOk.getAttribute("nombre_usuario");
%>
  
<head id="head">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <title>VIMAR & CIA S.A</title>
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
    <link href="css/sb-admin.css" rel="stylesheet">
    <link href="css/sweetalert.css" rel="stylesheet" /> 
    <link href="estilos/estilo_calendario.css" rel="stylesheet" />
    <link href="estilos/css/grilla.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/bootstrap4-toggle.css">
    <link rel="stylesheet" href="doc/stylesheet.css">
    <link rel="stylesheet" href="css/bootstrap4-toggle.css">
    <link href="css/inputmask.css" rel="stylesheet" />  
    <link href="lib/themes/main.css" rel="stylesheet" />
    <link href="lib/themes/default.css" rel="stylesheet" id="theme_base" />
    <link href="lib/themes/default.date.css" rel="stylesheet" id="theme_date" />
    <link href="css/acordeon_estilo.css" rel="stylesheet" />
    <link href="css/animate.css" rel="stylesheet" />
</head>

<body onload="login()">   
       <div id="div_index">  
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <a class="navbar-brand" href="#" onclick="traer_contenedor_menu();"><h6>    <i class="fa fa-fw fa-user"></i>  USUARIO: <%=usuario %>  || Area: <%=clasificadora %>   </h6></a>
        <input type="text" class="" name="linea" style="display:none"value="" readonly="readonly" >
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
            <i class="fa fa-fw fa-sign-out"></i>Cerrar sesion</a>
        </li>
        </ul>
        </div>
  </nav>
  <br><br><br>  
           <input type="text" id="area" name="area" value="<%=clasificadora%>" style="display:none">
           <input type="text" id="nombre_usuario" name="nombre_usuario" value="<%=usuario %>" style="display:none">
       
         
    <div class="container-fluid">
       
        
     <div   id="contenido_principal" class="row">
       </div>

 
          <div   id="contenido" >
        </div>
               
           <div   id="contenido2" style="display:none" >
        </div>
     
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mensaje?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Desea cerrar sesión?</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
            <a class="btn btn-primary" href="cerrar_sesion.jsp">Cerrar</a>
          </div>
        </div>
      </div>
    </div> 

    </div>   


       </div>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="vendor/chart.js/Chart.min.js"></script>
        <script src="vendor/datatables/jquery.dataTables.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
        <script src="js/sb-admin.min.js"></script>
        <script src="js/sb-admin-datatables.min.js"></script>
        <script src="js/sb-admin-charts.min.js"></script>
        <script src="js/alert.js"></script>
        <script src="js/grilla_2.js"></script>
        <script src="js/jquery.preloaders.js"></script> 
        <script src="js/combo_buscar.js"></script>
        <script src="js/bootstrap4-toggle.js"></script>
        <script src="js/jquery.inputmask.js"></script>
        <script src="lib/picker.js"></script>
        <script src="lib/picker.date.js"></script>
        <script src="lib/picker.time.js"></script>
        <script src="lib/legacy.js"></script>
        <script src="lib/main.js"></script>
        <script src="lib/rainbow.js"></script>
        <script src="js/sweetalert2.js"></script>
        <script src="js/SweetAlert.js"></script>
        <script src="js/swetalert_net.js"></script>
        <script src="js/polyfill.js.js"></script>
        <script src="js/calculos_grilla.js?v=1.0.6"></script>
        <script src="js/calculos_grilla_transferencia.js?v=1.0.6"></script>
        <script src="js/calculos_grilla_transferencia_sub.js?v=1.0.6"></script>
        <script src="js/embarque.js?v=1.0.6"></script>
        <script src="js/transferencia.js?v=1.0.6"></script>
        <script src="js/transferencia_sub.js?v=1.0.6"></script>
        <script src="js/avisos.js?v=1.0.6"></script>
        <script src="js/envios_embarques.js?v=1.0.6"></script>
        <script src="js/envios_transferencia.js?v=1.0.6"></script>
        <script src="js/envios_transferencia_sub.js?v=1.0.6"></script>    
        <script src="js/traer_clases.js?v=1.0.6" type="text/javascript"></script>
        <script src="js/js_embarque.js?v=1.0.6"></script>
</body>

</html>

