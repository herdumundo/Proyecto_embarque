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
               
    try {
    String area =(String) sesionOk.getAttribute("area");
    String carro =  request.getParameter("id");
    String area_gm = (String) sesionOk.getAttribute("area_gm");   
    String fecha = request.getParameter("calendario");   
    String factura = request.getParameter("factura");  
    ResultSet rs_lote,rs_fact,rs_GM;
 
    List<String> item_codigo = new ArrayList<String>();
    List<String> tipo = new ArrayList<String>(); 
    List<String> nro_carrito = new ArrayList<String>(); 
    List<String> cod_lote = new ArrayList<String>(); 
    List<String> cantidad = new ArrayList<String>(); 
    List<String> fecha_puesta = new ArrayList<String>(); 
    List<String> estado = new ArrayList<String>(); 
    List<String> estado_liberacion = new ArrayList<String>(); 
                Connection cn = conexion.crearConexion();
                fuente.setConexion(cn);    
                Connection cn_GM = conexion_GM.crearConexion();
                fuente_GM.setConexion(cn_GM); 
        
       String res_tipo_sql = "";
       String verificador="0";
       String verificador_SAP="0";
       if (factura.equals("")){
           
         res_tipo_sql="'1','2','3','4','5','6','7'"  ;
       }
       else {
          rs_fact = fuente.obtenerDato("select b.ItemCode from oinv a with(nolock) " +
                "inner join inv1 b with(nolock) on a.DocEntry=b.DocEntry where b.InvntSttus='o'  and   a.DocStatus='o'  and " +
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
                rs_lote = fuente.obtenerDato("select "
                  + "a.itemcode as itemcode,"
                  + "c.itemname as itemname, "
                  + "a.mnfserial as mnfserial,"
                  + "a.DistNumber as DistNumber, "
                  + "convert(int,b.quantity) as quantity," +
                  "convert(varchar,a.indate,103) as indate "
                  + "from obtn a with(nolock) "
                  + "inner join obtq b  with(nolock) on a.ItemCode=b.ItemCode "
                  + "inner join oitm c with(nolock) on c.ItemCode=b.ItemCode " +
                   "and a.SysNumber=b.SysNumber and b.Quantity>0 where "
                  + "a.itemcode in ("+res_tipo_sql+") and  "
                  + " b.WhsCode='" + area + "' and a.MnfSerial='" + carro + "'   ");
       
                while(rs_lote.next()){      
           
                               verificador_SAP= rs_lote.getString("itemcode");  
                               item_codigo.add(  rs_lote.getString("itemcode"));  
                               tipo.add( rs_lote.getString("itemname"));   
                               nro_carrito.add(  rs_lote.getString("mnfserial"));   
                               cod_lote.add( rs_lote.getString("DistNumber"));  
                               cantidad.add( rs_lote.getString("quantity"));  
                               fecha_puesta.add( rs_lote.getString("indate"));  
                               estado.add("P"); 

                                    }

                String factura_letras="";
                
                factura_letras=res_tipo_sql.replaceAll("'1'", "'G'").replaceAll("'2'", "'J'").replaceAll("'3'", "'S'").replaceAll("'4'", "'A'").replaceAll("'5'", "'B'").replaceAll("'6'", "'C'").replaceAll("'7'", "'D'");
                        
                        
                           rs_GM = fuente_GM.obtenerDato(" select tipo_huevo,cod_carrito,cod_lote,cantidad,convert(varchar,fecha_puesta,103) as fecha_puesta, right(estado_liberacion,1) as estado_liberacion "
                                   + "from lotes  with(nolock) where cod_carrito='"+carro+"' and estado  in ('A')  and  "
                                           + "clasificadora='"+area_gm+"' and tipo_huevo in ("+factura_letras+" )  ");
                    
                              while(rs_GM.next())
                              {      
                                String tipo_huevo="";
                                String nombre_tipo="";
                                  if( rs_GM.getString("tipo_huevo").equals("A")){
                                  tipo_huevo="4";
                                  nombre_tipo="Huevo tipo A";
                                  } 
                                 else if( rs_GM.getString("tipo_huevo").equals("B")){
                                  tipo_huevo="5";
                                   nombre_tipo="Huevo tipo B";
                                  }
                                  else if( rs_GM.getString("tipo_huevo").equals("C")){
                                  tipo_huevo="6";
                                   nombre_tipo="Huevo tipo C";
                                  }
                                   else if( rs_GM.getString("tipo_huevo").equals("D")){
                                  tipo_huevo="7";
                                   nombre_tipo="Huevo tipo D";
                                  }
                                   else  if( rs_GM.getString("tipo_huevo").equals("S")){
                                  tipo_huevo="3";
                                   nombre_tipo="Huevo tipo Super";
                                  }
                                     else if( rs_GM.getString("tipo_huevo").equals("J")){
                                  tipo_huevo="2";
                                   nombre_tipo="Huevo tipo Jumbo";
                                  }
                                      else if( rs_GM.getString("tipo_huevo").equals("G")){
                                  tipo_huevo="1";
                                   nombre_tipo="Huevo tipo Gigante";
                                  }
                               verificador_SAP= rs_GM.getString("tipo_huevo");  
                               item_codigo.add(tipo_huevo);  
                               tipo.add(nombre_tipo);   
                               nro_carrito.add(  rs_GM.getString("cod_carrito"));   
                               cod_lote.add( rs_GM.getString("cod_lote"));  
                               cantidad.add( rs_GM.getString("cantidad"));  
                               fecha_puesta.add( rs_GM.getString("fecha_puesta"));  
                               estado .add("N"); 
                                estado_liberacion.add( rs_GM.getString("estado_liberacion"));
                                    }
                              
        if(verificador_SAP.equals("0"))
                    { 
                    item_codigo.add("0");  
                    tipo.add("0");   
                    nro_carrito.add(carro);   
                    cod_lote.add("0");  
                    cantidad.add("0");  
                    fecha_puesta.add("0");  
                    estado.add("0");  

                    }
                    
        JSONObject ob = new JSONObject();
        JSONArray jarray = new JSONArray();
        for (int i = 0; i < item_codigo.size(); i++) 
        {
            ob=new JSONObject();
            ob.put("item_codigo", item_codigo.get(i));
            ob.put("tipo", tipo.get(i));
            ob.put("nro_carrito", nro_carrito.get(i));
            ob.put("cod_lote", cod_lote.get(i));
            ob.put("cantidad", cantidad.get(i));
            ob.put("fecha_puesta", fecha_puesta.get(i));
            ob.put("estado", estado.get(i));
            ob.put("estado_liberacion", estado_liberacion.get(i));
            
            jarray.put(ob);  
        }
 
    rs_lote.close();
    cn.close();

    out.print(jarray); 
               } catch (Exception e) {
                   String a=e.toString();
        } 
    %>


