<%@page import="org.json.JSONObject"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@include  file="chequearsesion.jsp" %>
<%@ page contentType="application/json; charset=utf-8" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
        <% 
        
        Connection cn = conexion.crearConexion();
        fuente. setConexion(cn);  
        String  numero_factura      = request.getParameter("nro_factura") ;
        String  area                =(String)sesionOk.getAttribute("area_gm");
        int     mensaje             =0;
        String  sql                 ="exec [select_embarque_lotes_pendientes] @area='"+area+"',@nro_factura='"+numero_factura+"'";
        String  grilla="";
        try { 
         ResultSet rs = fuente.obtenerDato (sql);
              while (rs.next())
            {
          grilla=grilla+  "<tr class='suma' id='row"+rs.getString("identificador_lote")+"' > "
                  + "<td class='ocultar'><b>"+rs.getString("cod_lote")+"</b></td>"
                  + "<td><b>"+rs.getString("tipo_huevo")+"</b></td>"
                  + "<td><b>"+rs.getString("carro")+"</b></td>"
                  + "<td class='ocultar' ><b>"+rs.getString("cod_huevo")+"</b></td>"
                  + "<td><b>"+rs.getString("cantidad")+"</b></td>"
                  + "<td><b>"+rs.getString("fecha_puesta")+"</b></td>"
                  + "<td> <input type='button' value='ELIMINAR' name='remove' "
                  + "onclick='eliminar_fila_embarque_pendientes("+rs.getString("identificador_lote")+","+numero_factura+");' id='"+rs.getString("identificador_lote")+"'  class='btn btn-danger btn_remove'></td>"
                  + "<td ><b>"+rs.getString("estado_lote")+"</b></td>"
                  + "<td for='id'><b>"+rs.getString("identificador_lote")+"</b></td>"
                  + "</tr> ";  
                }  
            } catch (Exception e) 
            {
        
            }
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        ob.put("grilla", grilla);            
        out.print(ob); 
        %>  
   
 
