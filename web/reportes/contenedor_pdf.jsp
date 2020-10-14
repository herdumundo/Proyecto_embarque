
 <%
 String a= request.getParameter("id");
 %>
     
      <form name="form1" action="reporte_control_b.jsp" target="_black">
    
          <input type="text" name="numero" id="numero" value="<%=a%>">
      <br>   
         <input style="width:260px; height:80px" class="btn btn-success" type="submit" value="Generar reporte"> 
        
          
      </form> 
   