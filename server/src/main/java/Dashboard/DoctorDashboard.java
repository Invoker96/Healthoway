package Dashboard;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import util.DashboardUtility;
import util.HttpUtil;

public class DoctorDashboard  extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		
		String data = HttpUtil.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);
		String username = (String)jsonObject.get("username");
		JSONArray array = new JSONArray();
		
		array=DashboardUtility.listOfPatientForDoctor(username);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.println(array);
		out.flush();

	}
}
