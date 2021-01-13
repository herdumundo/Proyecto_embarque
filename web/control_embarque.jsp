 
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@include  file="chequearsesion.jsp" %>
<%@ page contentType="application/json; charset=utf-8" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
        <% 
        
    int res_out=0;
    int res_out2=0;
    int identity=0;
    int identificador=0;
    int resultad_final=1;
    String fecha_puesta="";
    String out_cod_lote="";
    String out_area="";
    String out_numero_fact="";           
    String out_cod_lote_rec="";
    String out_area_rec="";
    String out_numero_fact_rec="";
    Connection cn = conexion.crearConexion();
    fuente.setConexion(cn);  
    String cbox_chofer= request.getParameter("cbox_chofer") ;
    String cbox_camion= request.getParameter("cbox_camion") ;
    String resultado= request.getParameter("resultado") ;
    String fecha_embarque= request.getParameter("calendario") ;
    String numero_factura = request.getParameter("numero_factura") ;
    String hora_inicio = request.getParameter("hora_inicio") ;
    String id_usuario=(String)sesionOk.getAttribute("cod_usuario");
    String nombre_usuario=(String)sesionOk.getAttribute("nombre_usuario");
    String area=(String)sesionOk.getAttribute("area");
    String mensaje="";
    try { 
        cn.setAutoCommit(false);
        int unidad_medida=0;
        int tipo_huevo=0;
        int cantidad=0;
        String lote="";
        String estado_lote="";
        String valores_coma="";
        String cod_carrito="";
        String[] txt_contenido_grilla_array = resultado.split(","); 
            
            CallableStatement  callableStatement=null;   
            callableStatement = cn.prepareCall("{call pa_embarque_cab( ?, ?, ?, ?, ? ,?,?,?,?)}");
            callableStatement .setInt(1,Integer.parseInt(cbox_chofer) );
            callableStatement .setInt(2, Integer.parseInt(cbox_camion));
            callableStatement .setString(3,numero_factura);
            callableStatement .setString(4, area);
            callableStatement .setString(5, nombre_usuario);
            callableStatement .setString(6,  fecha_embarque );
            callableStatement .setString(7,  hora_inicio);
            callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
            callableStatement.registerOutParameter("identity", java.sql.Types.INTEGER);
            callableStatement.execute();
            res_out2 = callableStatement.getInt("mensaje");
            identity = callableStatement.getInt("identity");
            String valor_estado="";
            for(int i=0; i<txt_contenido_grilla_array.length; i++)
            {//"600875_20201121_LDO_3- 600875    -4320-  3 -P-   431536"
                valores_coma=txt_contenido_grilla_array[i];
                String[] sub_valores_array = valores_coma.split("&"); 
                lote = sub_valores_array[0];
                tipo_huevo = Integer.parseInt(sub_valores_array[3]);
                cantidad = Integer.parseInt(sub_valores_array[2]);  
                estado_lote=sub_valores_array[4];
                identificador= Integer.parseInt(sub_valores_array[5]);  
                cod_carrito=sub_valores_array[1];
                fecha_puesta=sub_valores_array[6];
                String call_detalle = "{call pa_embarque_det( ?, ?, ?, ?, ? ,?,?,?,?,?,?,? )}";
                callableStatement = cn.prepareCall(call_detalle);
                callableStatement .setInt(1,identity);
                callableStatement .setInt(2, tipo_huevo);
                callableStatement .setString(3,lote);
                callableStatement .setInt(4, cantidad);
                callableStatement .setString(5, estado_lote);     
                callableStatement .setInt(6, identificador);
                callableStatement .setString(7, cod_carrito);     
                callableStatement .setString(8, fecha_puesta);     

                callableStatement.registerOutParameter("mensaje", java.sql.Types.INTEGER);
                callableStatement.registerOutParameter("out_cod_lote", java.sql.Types.VARCHAR);
                callableStatement.registerOutParameter("out_area", java.sql.Types.VARCHAR);
                callableStatement.registerOutParameter("out_numero_fact", java.sql.Types.VARCHAR);
                callableStatement.execute();
                res_out = callableStatement.getInt("mensaje");
                out_cod_lote = callableStatement.getString("out_cod_lote");
                out_area = callableStatement.getString("out_area");
                out_numero_fact = callableStatement.getString("out_numero_fact");
                resultad_final=resultad_final*res_out;  
            
                out_cod_lote_rec=  out_cod_lote_rec +" "+out_cod_lote;// SE OBTIENE LOS CARROS QUE FUERON RETENIDOS SIN QUE SE HAYA REALIZADO LA SINCRONIZACION DE LOTES.
            }
                 
            if (resultad_final==0)
            {
                mensaje="CARRO NRO. "+out_cod_lote_rec+", RETENIDOS, FAVOR LIBERAR Y LUEGO SINCRONICE LOS LOTES DISPONIBLES.";
                cn.rollback(); 
            }   
            else 
            {
                cn.commit();
                mensaje="REGISTRADO CON EXITO";
            }
            } catch (Exception e) {
        
            cn.rollback();
            mensaje=e.toString();
            resultad_final=2;
            }
            
     JSONObject ob = new JSONObject();
        ob=new JSONObject();
            ob.put("resultad_final", resultad_final);
            ob.put("out_cod_lote_rec",out_cod_lote_rec);
            ob.put("out_area_rec", out_area_rec);
            ob.put("out_numero_fact_rec", out_numero_fact_rec);
            ob.put("nro_embarque", identity);
            ob.put("mensaje", mensaje);
       
     out.print(ob); 
        %>  
   
 
