 <%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page contentType="application/json; charset=utf-8" %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion2" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato2" scope="page"/>   
 <jsp:useBean id="conexion_GM" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente_GM" class="clases.fuentedato" scope="page"/>   
 <%@include  file="chequearsesion.jsp" %>
 <%                          
          /*  List<String> item_codigo = new ArrayList<String>();
            List<String> tipo = new ArrayList<String>(); 
            List<String> nro_carrito = new ArrayList<String>(); 
            List<String> cod_lote = new ArrayList<String>(); 
            List<String> cantidad = new ArrayList<String>(); 
            List<String> fecha_puesta = new ArrayList<String>(); 
            List<String> estado = new ArrayList<String>(); 
            List<String> estado_liberacion = new ArrayList<String>(); 
            List<String> identificador_lote = new ArrayList<String>(); 
            List<String> mensaje = new ArrayList<String>();      
            List<String> tipo_mensaje = new ArrayList<String>();     */ 
      
    try {
                Connection cn = conexion.crearConexion();
                fuente.setConexion(cn);    
                Connection cn_GM = conexion_GM.crearConexion();
                fuente_GM.setConexion(cn_GM); 
                
            ResultSet rs_lote,rs_fact,rs_GM,rs_lote_trans;
   
       
            String area =(String) sesionOk.getAttribute("area");
            String carro =  request.getParameter("id");
            String area_gm = (String) sesionOk.getAttribute("area_gm");   
            String fecha = request.getParameter("calendario");   
            String factura = request.getParameter("factura");  
    
            String res_tipo_sql = "";
            String grupomaehara = "grupomaehara";
            String verificador="0";
            String verificador_SAP="0";
            String cod_lote_transferencia="";
            String cod_interno_transferencia="";
       if (factura.equals(""))
       {
          res_tipo_sql="'1','2','3','4','5','6','7'"  ;
       }
       else {
           
         
          rs_fact = fuente.obtenerDato("select b.ItemCode from oinv a with(nolock) " +
                "inner join inv1 b with(nolock) on a.DocEntry=b.DocEntry where b.InvntSttus='o'"
                  + "  and   a.DocStatus='o'  and " +
                "b.WhsCode='" + area + "' and a.NumAtCard='001-010-" + factura + "' ");
                String tipo_huevo=""; 
                
                while(rs_fact.next()){      
                
                 tipo_huevo = rs_fact.getString("itemcode");

                    if (res_tipo_sql.equals(""))
                    {
                        res_tipo_sql = "'"+tipo_huevo+"'";
                    }
                    else
                    {
                        res_tipo_sql = res_tipo_sql + ",'" + tipo_huevo+"'";
                    }
                  }    
           
       } 
    
                String factura_letras="";
                factura_letras=res_tipo_sql.replaceAll("'1'", "'G'").replaceAll("'2'", "'J'").replaceAll("'3'", "'S'").replaceAll("'4'", "'A'").replaceAll("'5'", "'B'").replaceAll("'6'", "'C'").replaceAll("'7'", "'D'");
               
                
                
                //NOTA: res_transf_lotes CONSULTA SI EL LOTE INGRESADO, SE ENCUENTRA EN ALGUNA TRANSFERENCIA ACTIVA.
                    JSONObject ob = new JSONObject();
                    JSONArray jarray = new JSONArray();
                 String res_transf_lotes="select a.destino ,  case c.tipo_huevo when 'G' then '1' when 'J' then '2'when 'S'"
                    + " then '3' when 'A' then '4' when 'B' then '5' when  'C' then '6' when  'D' then '7' else '0' end as tipo_huevo, "
                    + "case b.estado when 'P' then 'TP' when 'N' then 'TN' end as estado_transferencia,"
                    + " b.cod_carrito,b.cod_lote,c.cantidad,convert(varchar,c.fecha_puesta,103) as fecha_puesta,c.cod_interno,   c.estado , "
                    + " case c.tipo_huevo when 'G' then 'Huevo tipo Gigante' when 'J' then 'Huevo tipo Jumbo'"
                    + " when 'S' then 'Huevo tipo Super' when 'A' then  'Huevo tipo A' when 'B' then 'Huevo tipo B' when "
                    + " 'Huevo tipo C' then '6' when  'D' then 'Huevo tipo D' else '0' end as  nombre_tipo"
                    + " ,right(c.estado_liberacion,1) as estado_liberacion from  lotes_transferencia a "
                    + " inner join lotes_transferencia_detalle b on a.id=b.id_cab "
                    + "inner join lotes c on b.cod_interno_lote=c.cod_interno and b.cod_lote=c.cod_lote  "
                    + " where a.destino='"+area_gm+"' and b.cod_carrito='"+carro+"' and c.tipo_huevo in ("+factura_letras+")"
                    + " and b.estado in ('P','N') and b.ubicacion='A'  ";
          
           
                rs_lote_trans= fuente_GM.obtenerDato(res_transf_lotes);
                
                        while(rs_lote_trans.next()) {
                                                    
                                    ob=new JSONObject();
                                    verificador_SAP= rs_lote_trans.getString("tipo_huevo"); 
                                    ob.put("item_codigo",  rs_lote_trans.getString("tipo_huevo"));
                                    ob.put("tipo", rs_lote_trans.getString("nombre_tipo"));
                                    ob.put("nro_carrito",rs_lote_trans.getString("cod_carrito"));
                                    ob.put("cod_lote", rs_lote_trans.getString("cod_lote"));
                                    ob.put("cantidad", rs_lote_trans.getString("cantidad"));
                                    ob.put("fecha_puesta", rs_lote_trans.getString("fecha_puesta"));
                                    ob.put("estado", rs_lote_trans.getString("estado_transferencia"));
                                    ob.put("estado_liberacion", rs_lote_trans.getString("estado_liberacion"));
                                    ob.put("identificador_lote", rs_lote_trans.getString("cod_interno"));
                                    ob.put("mensaje", "1");
                                    ob.put("tipo_mensaje", "1");
                                    jarray.put(ob);
            
                                 
                                cod_lote_transferencia= rs_lote_trans.getString("cod_lote");
                                cod_interno_transferencia= rs_lote_trans.getString("cod_interno");
                                        } 
       
       
       
                rs_lote = fuente.obtenerDato("select "
                  + "a.itemcode as itemcode,"
                  + "c.itemname as itemname, "
                  + "a.mnfserial as mnfserial,"
                  + "a.DistNumber as DistNumber, "
                  + "convert(int,b.quantity) as quantity," +
                  "convert(varchar,a.indate,103) as indate,a.absEntry "
                  + "from obtn a with(nolock) "
                  + "inner join obtq b  with(nolock) on a.ItemCode=b.ItemCode "
                  + "inner join oitm c with(nolock) on c.ItemCode=b.ItemCode " +
                   "and a.SysNumber=b.SysNumber and b.Quantity>0 where "
                  + "a.itemcode in ("+res_tipo_sql+") and  "
                  + " b.WhsCode='" + area + "' and a.MnfSerial='" + carro + "'   "
                          + "and DistNumber  collate database_default    "
                  + "not in (select cod_lote from "+grupomaehara+".dbo.lotes_transferencia_detalle  where cod_carrito='" + carro + "' "
                  + "and estado in ('P') and ubicacion='A')  ");
       
                //NOTA: EL ESTADO "P" EN TRANSFERENCIA DETALLE, SIGNIFICA QUE EL LOTE SE ENCUENTRA COSTEADO, SI ES N, NO SE ENCUENTRA COSTEADO.
                //NOTA: LA UBICACION "A" SIGNIFICA QUE SE ENCUENTRA EN ESA UBICACION EL LOTE, EJEMPLO, SI ESE MISMO LOTE SE VUELVE A 
                //TRANSFERIR A OTRO SECTOR, ENTONCES ESA UBICACION PASA A SER "C" Y EL NUEVO REGISTRO DEL LOTE SE QUEDA EN "A"
                 while(rs_lote.next())
                
                {      
                    
                    
                      ob=new JSONObject();
                                    verificador_SAP= rs_lote.getString("itemcode"); 
                                    ob.put("item_codigo",  rs_lote.getString("itemcode"));
                                    ob.put("tipo", rs_lote.getString("itemname"));
                                    ob.put("nro_carrito",rs_lote.getString("mnfserial"));
                                    ob.put("cod_lote", rs_lote.getString("DistNumber"));
                                    ob.put("cantidad", rs_lote.getString("quantity"));
                                    ob.put("fecha_puesta", rs_lote.getString("indate")) ;
                                    ob.put("estado", "P");
                                    ob.put("estado_liberacion", "L");
                                    ob.put("identificador_lote", rs_lote.getString("absEntry"));
                                    ob.put("mensaje", "1");
                                    ob.put("tipo_mensaje", "1");
                                    jarray.put(ob);    

                                    }
                       
                 //EN LOTES OBTENGO LOS CARROS QUE SE REGISTRARON Y TAMBIEN LOS QUE SE TRANSFIEREN,
                 //YA QUE CLASIFICADORA_ACTUAL CAMBIA DE ACUERDO A SI HAY UNA TRANSFERENCIA
                            rs_GM = fuente_GM.obtenerDato(" select case  tipo_huevo when 'G' then '1' when 'J' then '2'when 'S'  then '3'"
                                    + " when 'A' then '4' when 'B' then '5' when  'C' then '6' when  'D' then '7' else '0' end as tipo_huevo,"
                                    + " case tipo_huevo when 'G' then 'Huevo tipo Gigante' when 'J' then 'Huevo tipo Jumbo'when 'S'  then 'Huevo tipo Super' "
                                    + " when 'A' then 'Huevo tipo A' when 'B' then 'Huevo tipo B' when  'C' then 'Huevo tipo C' when  'D' then 'Huevo tipo D' else '0' end as nombre_tipo,"
                                    + "cod_carrito,cod_lote,cantidad,convert(varchar,fecha_puesta,103) as fecha_puesta, "
                                    + "right(estado_liberacion,1) as estado_liberacion,cod_interno "
                                    + "from lotes  with(nolock) where cod_carrito='"+carro+"' and estado  in ('A') and  "
                                    + "clasificadora_actual='"+area_gm+"' and tipo_huevo in ("+factura_letras+" )  "
                                    + "and cod_lote not in (select cod_lote "
                                    + " from "+grupomaehara+".dbo.lotes_transferencia_detalle  where cod_carrito='"+carro+"' "
                                    + " and estado in ('P','N') and ubicacion='A'  ) and    cod_interno not in (select cod_interno     "
                                            + "from "+grupomaehara+".dbo.embarque_det  where estado in ('N') ) ");
                    
                              while(rs_GM.next())
                                                {      
                                                   
                                    ob=new JSONObject();
                                    verificador_SAP= rs_GM.getString("tipo_huevo"); 
                                    ob.put("item_codigo",  rs_GM.getString("tipo_huevo"));
                                    ob.put("tipo", rs_GM.getString("nombre_tipo"));
                                    ob.put("nro_carrito",rs_GM.getString("cod_carrito"));
                                    ob.put("cod_lote", rs_GM.getString("cod_lote"));
                                    ob.put("cantidad", rs_GM.getString("cantidad"));
                                    ob.put("fecha_puesta", rs_GM.getString("fecha_puesta"));
                                    ob.put("estado", "N");
                                    ob.put("estado_liberacion", rs_GM.getString("estado_liberacion"));
                                    ob.put("identificador_lote", rs_GM.getString("cod_interno"));
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
                    
     
      
     rs_lote.close();
    cn.close();
  out.print(jarray); 
               } 
    
    
    catch (Exception e) {
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
                                        }
   
    %>