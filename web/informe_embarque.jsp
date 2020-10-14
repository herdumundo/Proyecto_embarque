<%-- 
    Document   : informe_factura
    Created on : 05/03/2020, 11:04:47 AM
    Author     : hvelazquez
--%>
<%@page import="clases.embarque"%>
<%@page import="java.sql.*"%>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
   <%@include  file="chequearsesion.jsp" %>

<!DOCTYPE html>
<body>
    <%     
        
        
           try {
        
    String area =(String) sesionOk.getAttribute("area");
    String fecha =request.getParameter("calendario");
    Connection cn = conexion.crearConexion();
    fuente.setConexion(cn); 
    ResultSet rs;
    String nro_factura = "";
    String chofer = "";
    String camion = "";
    String id = "";
        
         
        rs = fuente.obtenerDato (" select a.id, a.area,a.fecha_embarque,a.nro_factura,b.Name as chofer, c.Name as camion from embarque_cab a inner join maehara.dbo.[@CHOFERES] b on a.id_chofer=b.Code "
                + "inner join maehara.dbo.[@CAMIONES] c on a.id_camion=c.Code where convert(varchar,fecha_embarque,103)='"+fecha+"' and area='"+area+"'");
       
      

     
                                        
                    
            while (rs.next())
            {             
              nro_factura=rs.getString("nro_factura");
              chofer=rs.getString("chofer");
              camion=rs.getString("camion");
              id=rs.getString("id");
              
   %>
   <form  action="reportes/Reporte_embarque.jsp" target="_blank" >
             
              <div class="panel-group wrap" id="bs-collapse">
              
                   
                  
                  <div class="panel">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#bs-collapse"   href="#<%=id%>">
           NRO.FACTURA: <%=nro_factura%>         CHOFER:<%=chofer%>        CAMION:<%=camion%>  
                    </a>
                </h4>
           <input style="display: none" type="text" name="numero" value="<%=id%>">
                    <input type="submit" value="IR A REPORTE">
                    </div>
                    <div   class="panel-collapse collapse">
                        <div class="panel-body">
                    <div class="row">
                    <div class="col-md-12">
                <div class="panel panel-primary">
          
         
                                    </div> 
                                            </div>
                                            </div>     
                                    </div>
                    </div>
             </div>
             
         </div>
  </form>
        <%} 
             rs.close();
         cn.close();
        
        
   
        %>
         
         
        
   

 <%     
        } 
    catch (Exception e) {
 String d=e.toString();
}
                 
        %>
         
 </body>