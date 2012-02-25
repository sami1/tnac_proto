package org.opendatatn.tnac.servlets;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;

/**
 * Servlet implementation class AggregationServlet
 */
@WebServlet("/agg/*")
public class AggregationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AggregationServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String callback=request.getParameter("callback");
		File container = new File(request.getServletContext().getRealPath("/")+ "/WEB-INF/data");//assumes exploded directory
		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String aggPath=request.getPathInfo();
		if (aggPath.startsWith("/"))
			aggPath=aggPath.substring(1);
		aggPath=aggPath.replace("/", "-");
		File file=new File(container,"aggreg-"+aggPath+".json");
		String result=null;
		if (!file.exists()){
			result=(callback!=null)?(callback+"({error:0});"):"{error:0}";
			response.getWriter().println(result);
		}
		else{
			String json=FileUtils.readFileToString(file,"UTF-8");
			result=(callback!=null)?(callback+"("+json+");"):json;
			response.getWriter().println(result);
		}
	}

}
