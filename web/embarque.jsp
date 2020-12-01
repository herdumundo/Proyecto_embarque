<%-- 
    Document   : embarque
    Created on : 03/03/2020, 07:43:47 AM
    Author     : hvelazquez
--%>

<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente2" class="clases.fuentedato2" scope="page"/>   
 <jsp:useBean id="conexion2" class="clases.bdconexion2" scope="page" />

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

    <% Connection cn = conexion.crearConexion();
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        Connection cn2 = conexion2.crearConexion();
	fuente2.setConexion(cn2);  
        ResultSet rs,rs_chofer,rs_camion;
        String fecha_actual = "";
                String hora_inicio = "";
                 rs = fuente.obtenerDato(" select convert(varchar,getdate(),103) as fecha , GETDATE()  as hora ");
                while(rs.next()){    
                    fecha_actual = rs.getString("fecha");
                    hora_inicio=rs.getString("hora");
                         }
                    rs.close();  
    %>


  
<form method="post"   id="formulario_embarque" name="formulario_embarque">
<div class="form-group">
            <div class="input-group">
             
                
<input type="text" id="hora_inicio" value="<%=hora_inicio %>" style="display:none" />

  
       
            FECHA EMBARQUE:      
                
                <input  style=" font-weight: bold"class="datepicker" value="<%=fecha_actual %>" type="text" id="calendario_embarque" name="calendario_embarque">              
                <select style=" font-weight: bold" class="form-control" name="cbox_chofer" id="cbox_chofer">
                <option style=" font-weight: bold" value="-" selected="selected" >  CHOFER </option>
                <%
                    
                     rs_chofer = fuente2.obtenerDato(" select code,name from [@CHOFERES] with(nolock) order by 2 ");
                        while(rs_chofer.next()){ 
                
                %>
                <OPTION VALUE="<%=rs_chofer.getString("code")%>"> <%=rs_chofer.getString("name")%> </OPTION><%
                 }
                rs_chofer.close();%>
                </select>  
                <span class="input-group-addon">-</span>
                <select class="form-control;display:none" name="cbox_camion" id="cbox_camion">
                <option style=" font-weight: bold" selected="selected"  value="-" >  CAMION </option>
                <%
                    
            rs_camion = fuente2.obtenerDato("select code,name from [@CAMIONES] ");
       while(rs_camion.next()){ 
      
            String camion_1=rs_camion.getString("code");
            String camion_2=rs_camion.getString("name");
            %><OPTION VALUE="<%=camion_1%>"><%=camion_1%>- <%=camion_2%> </OPTION><%
            }
              
           %>

        </select>
            </div>
            </div>


    
    
    <div class="form-group" >
            <div class="input-group">
           
                <input type="checkbox"  disabled="disable" class="display:none"  data-toggle="toggle" checked  data-on="Factura reserva SI" data-off="Factura reserva NO" id="chkToggle2" data-onstyle="success" data-offstyle="warning">
              
                <span class="input-group-addon">-</span>
  
            <input type="text"  style="  font-weight: bold" disabled="disable"  placeholder="NUMERO DE FACTURA" name="txt_nro_fact" id="txt_nro_fact" onblur="validar_factura($('#txt_nro_fact').val());" class="form-control"   />
           
            </div>
            </div>
           
           <div style="display: none" id="div_embarque_carga">
           <div class="form-group">
            <div class="input-group">
            <input type="number" placeholder="LOTE" name="txt_lote" id="txt_lote" class="form-control" onkeypress="cargar_datos_key();"/>
                 
            <span class="input-group-addon">-</span>
            <input type="button" value="INGRESAR" name="btn_ingresar" id="btn_ingresar" onclick="traer_control($('#txt_lote').val(),$('#calendario_embarque').val());" class="form-control btn btn-primary"/>
            </div>
          </div>
       
          <input  type="button" value="REGISTRAR" id="btn_registrar" name="btn_registrar" onclick="  registrar_embarque();" class="form-control btn btn-danger example2" />
                
  
        <br>
            <input type="text" placeholder="total_a" name="total_a" id="total_a" class="form-control "  style="display:none"  />
            <input type="text" placeholder="total_b" name="total_b" id="total_b" class="form-control"   style="display:none"/>
            <input type="text" placeholder="total_c" name="total_c" id="total_c" class="form-control"   style="display:none" />
            <input type="text" placeholder="total_d" name="to tal_d" id="total_d" class="form-control"  style="display:none" />
            <input type="text" placeholder="total_s" name="total_s" id="total_s" class="form-control"   style="display:none"/>
            <input type="text" placeholder="total_j" name="total_j" id="total_j" class="form-control"   style="display:none" />
            <input type="text" placeholder="total_g" name="total_g" id="total_g" class="form-control"   style="display:none"  />
            <!-- CAMPOS PARA OBTENER EL TOTAL PENDIENTES DE CADA TIPO DE HUEVO EN LA FACTURA INGRESADA !-->
            <input type="text" placeholder="total_factura_carros" name="total_factura_carros" id="total_factura_carros" class="form-control"  style="display:none"  />
            <!-- SE RECUPERA EL TOTAL EN CARROS DE LA FACTURA !-->
            <input type="text" placeholder="total_carros_grilla" name="total_carros_grilla" id="total_carros_grilla" class="form-control" style="display:none"   />
            <!-- SE RECUPERA EL TOTAL EN CARROS  DE LA GRILLA !-->
            <input type="text" placeholder="tipo_grilla" name="tipo_grilla" id="tipo_grilla" class="form-control" style="display:none" />
            <!-- SE RECUPERA LOS TIPOS DE HUEVOS QUE HAY EN LA GRILLA, EJEMPLO: 1,2,3,4 !-->
            <input type="text" placeholder="resultado" name="resultado" id="resultado" class="form-control"   style="display:none"   />
        <a style=" font-weight: bold" >TOTAL CARROS</a>
        <input type="text" style=" display:none"   name="total_cajones" id="total_cajones" value="0"   class="form-control" readonly />
        <input type="text" style=" font-weight: bold"   name="total_carros" id="total_carros" value="0"   class="form-control" readonly />
        <div id="carros_div">

            <a style=" font-weight: bold" > EN CARROS</a>
        <table  id="tabla_carros"   data-row-style="rowStyle"   data-toggle="table" data-click-to-select="true">
        <thead>
        <tr>
            <th style=" font-weight: bold">TIPO A</th>
            <th style=" font-weight: bold">TIPO B</th>
            <th style=" font-weight: bold">TIPO C</th>
            <th style=" font-weight: bold">TIPO D</th>
            <th style=" font-weight: bold">TIPO J</th>
            <th style=" font-weight: bold">TIPO S</th>
            <th style=" font-weight: bold">TIPO G</th>
        </tr>
        </thead>
        <tbody>

  <tr>
  <td> <input type="text" style=" font-weight: bold"  name="tipo_ca" id="tipo_ca" value="0"   class="form-control" readonly /></td>
  <td> <input type="text" style=" font-weight: bold"  name="tipo_cb" id="tipo_cb" value="0" class="form-control" readonly  /></td>
  <td> <input type="text" style=" font-weight: bold"  name="tipo_cc" id="tipo_cc" value="0"   class="form-control" readonly /></td>
  <td> <input type="text" style=" font-weight: bold" name="tipo_cd" id="tipo_cd" value="0"  class="form-control"readonly /></td>
  <td> <input type="text"style=" font-weight: bold"  name="tipo_cj" id="tipo_cj" value="0"  class="form-control" readonly  /></td>
 <td> <input type="text" style=" font-weight: bold" name="tipo_cs" id="tipo_cs" value="0"  class="form-control" readonly/></td>
  <td> <input type="text" style=" font-weight: bold" name="tipo_cg" id="tipo_cg" value="0"  class="form-control" readonly /></td>
 </tr>

    </tbody>
  </table>
 </div>

 <div id="cajones_div" >
      <a style=" font-weight: bold;color:red">EN CAJONES</a>
        <table id="tabla_cajones"   data-row-style="rowStyle"   data-toggle="table" data-click-to-select="true">
    <thead >
      <tr >
    <th><a style="color:red ; font-weight: bold" >TIPO A </a></th>
    <th><a style="color:red ; font-weight: bold" >TIPO B</a></th>
    <th><a style="color:red ; font-weight: bold" >TIPO C</a></th>
    <th><a style="color:red ; font-weight: bold" >TIPO D</a></th>
    <th><a style="color:red ; font-weight: bold" >TIPO J</a></th>
    <th><a style="color:red ; font-weight: bold" >TIPO S</a></th>
     <th><a style="color:red ; font-weight: bold" >TIPO G</a></th>
      </tr>
    </thead>
    <tbody>
  <tr>
  <td > <b><input type="text" style="color:red ; font-weight: bold"  name="tipo_cja" id="tipo_cja" value="0"   class="form-control" readonly /></b></td>
  <td> <b><input type="text" style="color:red ; font-weight: bold"  name="tipo_cjb" id="tipo_cjb" value="0" class="form-control" readonly  /></b></td>
  <td> <b><input type="text" style="color:red; font-weight: bold"  name="tipo_cjc" id="tipo_cjc" value="0"   class="form-control" readonly /></b></td>
  <td> <b><input type="text" style="color:red ; font-weight: bold" name="tipo_cjd" id="tipo_cjd" value="0"  class="form-control"readonly /></b></td>
  <td> <b><input type="text" style="color:red ; font-weight: bold" name="tipo_cjj" id="tipo_cjj" value="0"  class="form-control" readonly  /></b></td>
  <td> <b><input type="text" style="color:red ; font-weight: bold"  name="tipo_cjs" id="tipo_cjs" value="0"  class="form-control" readonly/></b></td>
  <td> <b><input type="text" style="color:red ; font-weight: bold" name="tipo_cjg" id="tipo_cjg" value="0"  class="form-control" readonly /></b></td>
 </tr>
 </tbody>
  </table>
       
 </div>
    <table  id="tabla_contador" style="display:none"  data-row-style="rowStyle"   data-toggle="table" data-click-to-select="true" class="dataTable">
        <thead>
          <tr>
        <th>TIPO A</th>
        <th>TIPO B</th>
        <th>TIPO C</th>
        <th>TIPO D</th>
        <th>TIPO J</th>
        <th>TIPO S</th>
        <th>TIPO G</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td> <b><input type="text"  style=" font-weight: bold"   name="tipo_a" id="tipo_a" value="0"   class="form-control" readonly /></b></td>
        <td> <b><input type="text" style=" font-weight: bold"    name="tipo_b" id="tipo_b" value="0" class="form-control" readonly  /></b></td>
        <td><b><input type="text"  style=" font-weight: bold"  name="tipo_c" id="tipo_c" value="0"   class="form-control" readonly /></b></td>
        <td> <b><input type="text" style=" font-weight: bold"  name="tipo_d" id="tipo_d" value="0"  class="form-control"readonly /></b></td>
        <td> <b><input type="text" style=" font-weight: bold"   name="tipo_j" id="tipo_j" value="0"  class="form-control" readonly  /></b></td>
        <td> <b><input type="text"  style=" font-weight: bold" name="tipo_s" id="tipo_s" value="0"  class="form-control" readonly/></b></td>
        <td><b> <input type="text" style=" font-weight: bold"  name="tipo_g" id="tipo_g" value="0"  class="form-control" readonly /></b></td>
        </tr>
      </tbody>
  </table>

      
    <table id="myTable" class="table table-striped table-bordered"  >
        <thead>
        <tr>
            <th class="ocultar" >COD LOTE</th>
            <th>ARTICULO</th>
            <th>CARRO</th>
            <th class="ocultar">CODIGO</th>
            <th>CANTIDAD</th>
            <th>FECHA PUESTA</th>
            <th>ACCION</th>
            <th>ESTADO</th>
            <th> IDENTIFICADOR</th>
        </tr>
         </thead>
         <tbody id="tbody_embarque">

         </tbody>
    </table>                      
    </div>
    </form> 
 
 


