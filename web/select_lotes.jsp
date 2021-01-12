<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page contentType="application/json; charset=utf-8" %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<jsp:useBean id="conexion_GM" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente_GM" class="clases.fuentedato" scope="page"/>   
<%@include  file="chequearsesion.jsp" %>
 <%       
      
    try {
               
    Connection cn_GM = conexion_GM.crearConexion();
    fuente_GM.setConexion(cn_GM); 
    String area =(String) sesionOk.getAttribute("area");
    String carro =  request.getParameter("id");
    String area_gm = (String) sesionOk.getAttribute("area_gm");   
    String fecha = request.getParameter("calendario");   
    String factura = request.getParameter("factura");  
    String verificador_SAP="0";
    JSONObject ob = new JSONObject();
    JSONArray jarray = new JSONArray();
               
   // ResultSet rs_lote = fuente_GM.obtenerDato(" exec [mae_cch_select_lotes_disponibles_embarque] @area='"+area_gm+"',@area_cch='"+area+"',@nro_factura='"+factura+"',@cod_carrito='"+carro+"'");
    ResultSet rs_lote = fuente_GM.obtenerDato(" exec [mae_cch_select_lotes_disponibles_embarque_test]  @area_cch='"+area+"',@cod_carrito='"+carro+"',@nro_factura='"+factura+"'");
                
        while(rs_lote.next()) 
        {
            ob=new JSONObject();
            verificador_SAP= rs_lote.getString("tipo_huevo"); 
            ob.put("item_codigo",  rs_lote.getString("tipo_huevo"));
            ob.put("tipo", rs_lote.getString("nombre_tipo"));
            ob.put("nro_carrito",rs_lote.getString("cod_carrito"));
            ob.put("cod_lote", rs_lote.getString("cod_lote"));
            ob.put("cantidad", rs_lote.getString("cantidad"));
            ob.put("fecha_puesta", rs_lote.getString("fecha_puesta"));
            ob.put("estado", rs_lote.getString("estado"));
            ob.put("estado_liberacion", rs_lote.getString("estado_liberacion"));
            ob.put("identificador_lote", rs_lote.getString("cod_interno"));
            ob.put("mensaje", "1");
            ob.put("tipo_mensaje", "1");
            jarray.put(ob); 
        } 
       
        if(verificador_SAP.equals("0"))
        { 
            ob.put("item_codigo",  "0");
            ob.put("tipo", "0");
            ob.put("nro_carrito","0");
            ob.put("cod_lote", "0");
            ob.put("cantidad", "0");
            ob.put("fecha_puesta", "0");
            ob.put("estado","0");
            ob.put("estado_liberacion","0");
            ob.put("identificador_lote","0");
            ob.put("tipo_mensaje", "0"); 
            ob.put("cod_interno","0");
            ob.put("mensaje", "1");
        }
            cn_GM.close();
            out.print(jarray); 
               } 
           catch (Exception e) 
        {
            JSONObject ob = new JSONObject();
            JSONArray jarray = new JSONArray();
            ob=new JSONObject();
            ob.put("tipo_mensaje", "0");
            ob.put("item_codigo", "0");
            ob.put("tipo", "0");
            ob.put("nro_carrito", "0");
            ob.put("cod_lote", "0");
            ob.put("cantidad", "0");
            ob.put("fecha_puesta", "0");
            ob.put("estado", "0");
            ob.put("estado_liberacion","0");
            ob.put("identificador_lote", "0");
            ob.put("mensaje","0");
            ob.put("tipo_mensaje","0");
            out.print(jarray); 
        }   %>