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
 * Servlet implementation class Circonscriptions
 */
@WebServlet("/circonscription/*")
public class Circonscriptions extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Circonscriptions() {
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
		if (rest.isEmpty()){
			try {
				res =FileUtils.readFileToString(new File(containerMetadata,"raw.json"), "UTF-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else{
			try {
				res =FileUtils.readFileToString(new File(containerMetadata,"raw-"+rest+".json"), "UTF-8");
			} catch (Exception e) {
				// TODO Auto-generated catch block
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
