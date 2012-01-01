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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class CouchProxy
 */
@WebServlet(urlPatterns={"/lcouch/*"})
public class LocalCouchProxy extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
     * @see HttpServlet#HttpServlet()
     */
    public LocalCouchProxy() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		File container = new File(request.getServletContext().getRealPath("/")+ "/WEB-INF/data");//assumes exploded directory
		String rest=request.getPathInfo();
		LocalJsonLoader loader=new LocalJsonLoader(rest,container);
		String res=loader.load();
		if (res!=null){			
			response.setContentType("application/json; charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
		     PrintWriter out = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), "UTF8"), true);
		     out.println(res);
		     out.flush();
		}
		else{
			response.getWriter().println("{error:0}");
		}
	}


}
