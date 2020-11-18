<%-- 
    Document   : logincontrol
    Created on : 03/03/2020, 08:04:55 AM
    Author     : hvelazquez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
 <%@ page session="true" %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
<%
  // Crear objeto de conexion al DB
  Connection cn = conexion.crearConexion();
  // Asignar conexin al objeto manejador de datos
  fuente.setConexion(cn);

 
        String perfil_gm;
    String nombre_usuario = "";

    
String usu = request.getParameter("txt_usuario");
String cla = request.getParameter("txt_pass");
String clasif = request.getParameter("user");
String sql = "select * from usuarios where usuario = '"+usu+"' and password = '"+cla+"' and clasificadora <>'u'";
ResultSet rs = fuente.obtenerDato(sql);
String area="";

  if(rs.isBeforeFirst()){
                while(rs.next())
        {
        String id_usuario = "";
        String area_form="";
        String user_name=rs.getString("usuario");
        String nombre_usu=rs.getString("nombre");
        String clasificadora=rs.getString("clasificadora");
        String cod_usuario=rs.getString("cod_usuario");

        HttpSession sesionOk = request.getSession();
        sesionOk.setAttribute("user_name",user_name);
        sesionOk.setAttribute("id_usuario",rs.getString("password"));
        sesionOk.setAttribute("nombre_usuario",nombre_usu);
        sesionOk.setAttribute("clasificadora",clasificadora);
        sesionOk.setAttribute("cod_usuario",cod_usuario);
       
       
       area =rs.getString("clasificadora");
        if (area.equals("A")){
           area_form="CCHA" ;
        }
        else if (area.equals("O")){
           area_form="OVO" ;
        }
        else if (area.equals("H")){
           area_form="CCHH" ;
        }
        
        else if (area.equals("C")){
           area_form="CYO" ;
        }
        
        
        else {
                area_form="CCHB" ;
                }
         sesionOk.setAttribute("area_gm",area);
        sesionOk.setAttribute("area",area_form);
        response.sendRedirect("index.jsp"); 
            } 
        } 
  
  else
  {
    response.sendRedirect("login_error.html"); 
} 
%>
 
  





 