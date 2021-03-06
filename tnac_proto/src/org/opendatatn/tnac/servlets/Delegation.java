package org.opendatatn.tnac.servlets;

import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;

/**
 * Servlet implementation class Delegation
 */
@WebServlet("/delegation/*")
public class Delegation extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delegation() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String callback=request.getParameter("callback");
		File containerMetadata = new File(request.getServletContext().getRealPath("/")+ "/WEB-INF/metadata");//assumes exploded directory
		String rest=request.getPathInfo();
		if (rest==null)
			rest="";
		if (rest.startsWith("/"))
			rest=rest.substring(1);
		if (rest.endsWith("/"))
			rest=rest.substring(0,rest.length()-1);
		String res="{error:0}";
		String[] parts=rest.split("/");
		if (parts.length==2 && !parts[0].isEmpty() && !parts[1].isEmpty()){
			try {
				res =FileUtils.readFileToString(new File(containerMetadata,"raw-"+parts[0]+"-"+parts[1]+".json"), "UTF-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else if (parts.length==1 && !parts[0].isEmpty()){
			try {
				res =FileUtils.readFileToString(new File(containerMetadata,"raw-"+parts[0]+".json"), "UTF-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
	    PrintWriter out = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), "UTF8"), true);
		String result=res;
		result=(callback==null)?res:(callback+"("+res+");");
		out.println(result);
	    out.flush();
	}

}
