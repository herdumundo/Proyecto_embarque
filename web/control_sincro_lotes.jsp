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
    String  area    =(String)sesionOk.getAttribute("area_gm");
    String  area_cch    =(String)sesionOk.getAttribute("area");
    int tipo    =0;
    String mensaje="";
         
         try { 
            cn.setAutoCommit(false);
            CallableStatement  callableStatement=null;   
            callableStatement = cn.prepareCall("{call [mae_cch_embarque_insertar_lotes_disponibles](?,?,?)}");
            callableStatement .setString(   1,  area_cch );
            callableStatement .setString(   2,  area);
              
            callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
            callableStatement.execute();
            tipo = callableStatement.getInt("mensaje");
            mensaje="LOTES SINCRONIZADOS CON EXITO.";
            cn.commit();
            } catch (Exception e) 
            {
                cn.rollback();
                mensaje=e.toString();
                tipo=0;
            }
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        ob.put("tipo", tipo);  
        ob.put("mensaje", mensaje);
        out.print(ob); 
        %>  
   
 
