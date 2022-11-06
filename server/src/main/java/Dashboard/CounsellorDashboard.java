package Dashboard;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import Manager.ConnectionManager;
import util.HttpUtils;

public class CounsellorDashboard extends HttpServlet{

	/*
	 * This method is implemented to get the list of patients in counsellor dashbaord
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		JSONArray array = new JSONArray();
		try {
			array = ConnectionManager.listOfPatient();
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.println(array);
		out.flush();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		final String URL = req.getRequestURI();

		String data = HttpUtils.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);
		String username = (String)jsonObject.get("username");
		
		if(URL.contains("remove")) {
			int n = ConnectionManager.removePatient(username);
			if(n<0) {
				response.sendError(500);
			}
		}
		else {
			JSONArray array = ConnectionManager.getSelfAssesmentResult(username);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println(array);
			out.flush();
		}
	}
}
