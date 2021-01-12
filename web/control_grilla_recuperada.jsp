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
        String  area_cch                =(String)sesionOk.getAttribute("area");
        int     mensaje             =0;
        int ultimo = Integer.parseInt(numero_factura.substring(numero_factura.length() - 7)) ;
        String  sql                 ="exec [select_embarque_lotes_pendientes] @area='"+area+"',@nro_factura="+ultimo+"";
        String  grilla="";
       int i=0;  
        try { 
         ResultSet rs = fuente.obtenerDato (sql);
           
         
         while  (rs.next())
            {
          grilla=grilla+  "<tr class='suma' id='row"+rs.getString("identificador_lote")+"'  > "
                  + "<td class='ocultar'>"+rs.getString("cod_lote")+"</td>"
                  + "<td class='font-weight-bold' >"+rs.getString("tipo_huevo")+"</td>"
                  + "<td class='font-weight-bold'>"+rs.getString("carro")+"</td>"
                  + "<td class='ocultar' >"+rs.getString("cod_huevo")+"</td>"
                  + "<td class='font-weight-bold'  >"+rs.getString("cantidad")+"</td>"
                  + "<td class='font-weight-bold' >"+rs.getString("fecha_puesta")+"</td>"
                  + "<td class='font-weight-bold'  >  <a class='btn btn-danger font-weight-bold remove'> <i class='fa fa-trash-o fa-lg'></i> Eliminar</a>  </td>"
                  + "<td  class='ocultar' >"+rs.getString("estado_lote")+"</td>"
                  + "<td for='id'  class='ocultar' >"+rs.getString("identificador_lote")+"</td><td>"+i+"</td> "
                  + "</tr> ";  
                i++;}  
            
        
        
        
         cn.setAutoCommit(false);
            CallableStatement  callableStatement=null;   
            String getDBUSERByUserIdSql = "{call [mae_cch_embarque_insertar_lotes_disponibles](?,?,?)}";
            callableStatement = cn.prepareCall(getDBUSERByUserIdSql);
            callableStatement .setString(   1,  area_cch );
            callableStatement .setString(   2,  area);
              
            callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
            callableStatement.execute();
            mensaje = callableStatement.getInt("mensaje");
            cn.commit();
            } catch (Exception e) 
            {
                cn.rollback();
            }
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        ob.put("grilla", grilla);  
        ob.put("count", i);
        out.print(ob); 
        %>  
   
 
