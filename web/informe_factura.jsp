<%-- 
    Document   : informe_factura
    Created on : 05/03/2020, 11:04:47 AM
    Author     : hvelazquez
--%>
<%@page import="clases.embarque"%>
<%@page import="java.sql.*"%>
<%@include  file="chequearsesion.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion2" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
  
<!DOCTYPE html>
<body>
    <%     
        
        
           try {
        
 String area =(String) sesionOk.getAttribute("area");
    Connection cn = conexion.crearConexion();
                fuente.setConexion(cn); 
      ResultSet rs,rs2;
                
         String chofer = "";
        String camion = "";
        
        embarque e= new embarque();
        
        String grupomaehara="GrupoMaehara";
        
       rs = fuente.obtenerDato ("select distinct a.numatcard,a.DocEntry , convert(varchar,a.docdate,103) as fecha ,a.u_cod_camion,c.Name,c.code " +
            "from oinv a with(nolock) inner join inv1 b with(nolock) on a.DocEntry=b.DocEntry and b.WhsCode='"+area+"'   " +
            "inner join [@CHOFERES] c with(nolock) on a.U_Cod_Chofer=c.Code   " +
            " and a.isIns='Y' and a.InvntSttus='o'  and b.InvntSttus='o'"
            + " where a.NumAtCard collate database_default not in (select nro_factura from "+grupomaehara+".dbo.embarque_cab "
            + "  where   estado_sincro in('N','P','C') and area='"+area+"')"
            + " order by a.numatcard ");
        String num_fact = "";
        String docentry = "";
        String tipo = ""; 
        String desc = ""; 
        String estado = ""; 
        int cantidad = 0; 
        int cantidad_resto=0;
        String estado_formateado = ""; 
        String caja = ""; 
        int resto = 0; 
        String texto = "";
        String fecha = "";
        String cod_chofer = "";
      

        %>
    <form id="form1">
            <%  
                                        
                    
           String factura_formato="";
           while (rs.next())
            {         num_fact = rs.getString("numatcard");     
                    docentry= rs.getString("DocEntry");      
                    fecha=  rs.getString("fecha");     
                    chofer= rs.getString("Name");      
                    cod_chofer= rs.getString("code");      
                    camion=  rs.getString("u_cod_camion");      
                    rs2 = fuente.obtenerDato ("select itemcode,InvntSttus,Dscription,(convert(int,(Quantity - isnull(delivrdqty,0))*12)) as cantidad,WhsCode "
                    + "from inv1 where docentry='"+docentry+"' and whsCode='"+area+"' and InvntSttus='o'");
                    factura_formato=num_fact.substring(8);
            %>
              <div class="panel-group wrap" id="bs-collapse">
                <div class="panel">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#bs-collapse" href="#<%=docentry%>">
          <%=num_fact%>    FECHA:<%=fecha%>         CHOFER:<%=chofer%>        CAMION:<%=camion%>  
                    </a>
                </h4>
                    </div>
                    <div id="<%=docentry%>" class="panel-collapse collapse">
                        <div class="panel-body">
                    <div class="row">
                    <div class="col-md-12">
                <div class="panel panel-primary">
          
          <table data-row-style="rowStyle" data-toggle="table" class="table" data-click-to-select="true">
              <thead>
                 <th>
                  TIPO
                </th> 
                  <th>
                  DESCRIPCION
                </th> 
                   <th>
                  CANTIDAD
                       PENDIENTE
                </th> 
               </thead>
              <tbody>
               <tbody> 
                   <%  while (rs2.next())
                      {
                          tipo = rs2.getString("itemcode");
                          desc = rs2.getString("Dscription");
                          cantidad = rs2.getInt("cantidad");
                          cantidad_resto= rs2.getInt("cantidad");
                          
                          if (cantidad < 4320)
                          {
                              if (tipo.equals("1"))
                              {
                                  if (cantidad  < 2160)
                                  {
                                      cantidad = ( cantidad /180);
                                      texto = "CAJONES: " + cantidad;
                                  }
                                  else
                                  {
                                      cantidad = cantidad/2160 ;
                                      texto= "CARROS: " + cantidad;
                                 }
                                  }
                              else
                              {
                                    cantidad =  cantidad/360;
                                    texto = "CAJONES: " + cantidad;
                                  
                              }
                               }
                          else
                          {
                              cantidad =   cantidad/4320 ;
                              caja = "CARROS";
                              resto =(cantidad_resto%4320)/360;
                              if (resto==0)
                              {
                                  texto = "CARROS: " + cantidad;

                              }
                              else
                              {
                                  texto = "CARROS: "+cantidad+" Y CAJONES: "+resto;
                              }
                          }
                         %>
                  <tr>
                      <td><b><%=tipo %> </b></td>
                      <td><b><%=desc %> </b></td>
                      <td><b><%=texto %> </b></td>
                     
                  </tr> 
                  <%}rs2.close(); %>

              </tbody> 

          </table>
                                    </div> 
                                            </div>
                                            </div>     
                                    </div>
                    </div>
             </div>
             
                  <input type="button" value="IR A EMBARQUE FACTURA NRO.<%=num_fact%>"  onclick="traer_embarque('<%=camion%>','<%=factura_formato%>','<%=cod_chofer%>','<%=fecha%>' )" class="form-control">
        </div>
 
        <%} 
             rs.close();
         cn.close();
        
        
   
        %>
         
         
        
    </form>

 <%     
        } 
    catch (Exception e) {
 String d=e.toString();
}
                 
        %>
         
 </body>