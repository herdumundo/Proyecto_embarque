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
        int ultimo = Integer.parseInt(numero_factura.substring(numero_factura.length() - 7)) ;
        String  sql                 ="exec [select_embarque_lotes_pendientes] @area='"+area+"',@nro_factura="+ultimo+"";
        String  grilla="";
        try { 
         ResultSet rs = fuente.obtenerDato (sql);
              while (rs.next())
            {
          grilla=grilla+  "<tr class='suma' id='row"+rs.getString("identificador_lote")+"'  > "
                  + "<td class='ocultar'>"+rs.getString("cod_lote")+"</td>"
                  + "<td >"+rs.getString("tipo_huevo")+"</td>"
                  + "<td>"+rs.getString("carro")+"</td>"
                  + "<td class='ocultar' >"+rs.getString("cod_huevo")+"</td>"
                  + "<td  >"+rs.getString("cantidad")+"</td>"
                  + "<td >"+rs.getString("fecha_puesta")+"</td>"
                  + "<td >  <a class='btn btn-danger font-weight-bold'   onclick='eliminar_fila_embarque_pendientes("+rs.getString("identificador_lote")+");' id='"+rs.getString("identificador_lote")+"'> <i class='fa fa-trash-o fa-lg'></i> Eliminar</a>  </td>"
                  + "<td  class='ocultar' >"+rs.getString("estado_lote")+"</td>"
                  + "<td for='id'  class='ocultar' >"+rs.getString("identificador_lote")+"</td>  "
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
   
 
