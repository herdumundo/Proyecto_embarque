<%@page import="java.sql.Connection"%>
<%@page import="java.net.URL"%>
<%@page import="net.sf.jasperreports.engine.util.JRLoader"%>
<%@page import="net.sf.jasperreports.engine.xml.JRXmlLoader"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="net.sf.jasperreports.engine.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />

<%@page import="javax.servlet.ServletResponse"%>
 
      <%
 
    try {
        
      Connection cn = conexion.crearConexion();
        File reportfile = new File (application.getRealPath("reportes/cabecera_lotes.jasper"));
        
        Map<String,Object> parameter = new HashMap<String,Object>();
        String numero =    request.getParameter("numero") ;
        parameter.put("numero",numero);
        parameter.put("SUBREPORT_DIR",new String("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\Embarque\\reportes\\"));

        
        byte [] bytes = JasperRunManager.runReportToPdf(reportfile.getPath(), parameter, cn);
        response.setContentType("application/pdf");
        response.setContentLength(bytes.length);
        ServletOutputStream outputstream = response.getOutputStream();
        outputstream.write(bytes,0,bytes.length);
        outputstream.flush();
        outputstream.close();   
       

        } catch (Exception e) 
        {
       
              }
      %>
