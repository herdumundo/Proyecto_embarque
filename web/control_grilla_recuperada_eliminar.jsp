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
        fuente.setConexion(cn);  
        String  numero_factura      = request.getParameter("nro_factura") ;
        String  area                =(String)sesionOk.getAttribute("area_gm");
        int  id                =Integer.parseInt(request.getParameter("id")) ;
        int     mensaje             =0;
              try { 
             
             cn.setAutoCommit(false);
            CallableStatement  callableStatement=null;   
            String getDBUSERByUserIdSql = "{call pa_embarque_pendientes_eliminar(?,?,?,?)}";
            callableStatement = cn.prepareCall(getDBUSERByUserIdSql);
            callableStatement .setString(   1,  area );
            callableStatement .setInt(   2,  Integer.parseInt(numero_factura.substring(numero_factura.length() - 7)));
            callableStatement .setInt(      3,  id);
            callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
            callableStatement.execute();
            mensaje = callableStatement.getInt("mensaje");
            cn.commit();
            } catch (Exception e) 
            {
        
          
            }
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        out.print(ob); 
        %>  
   
 
