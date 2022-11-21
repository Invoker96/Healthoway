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
import model.Appointment;
import util.DashboardUtility;
import util.HttpUtil;

public class CounsellorDashboard extends HttpServlet{

	/*
	 * This method is implemented to get the list of patients in counsellor dashbaord
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		final String URL = req.getRequestURI();
		JSONArray array = new JSONArray();
		if(URL.endsWith("listOfDoctors")) {
			try {
				array = ConnectionManager.listOfDoctors();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else {
			try {
				array = ConnectionManager.listOfPatientForCounsellor();
			} catch (Exception e) {
				e.printStackTrace();
			}
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
		String data = HttpUtil.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);

		if(URL.contains("remove")) {
			String username = (String)jsonObject.get("username");
			int n = ConnectionManager.removePatient(username);
			if(n<0) 
				response.sendError(500);

		}else if(URL.contains("scheduleAppointment")){
			Appointment app = Appointment.convert(data);
			boolean result = DashboardUtility.assignToSelf(app);
			if(!result) 
				response.sendError(500);

		}else if(URL.contains("assignToDoctor")){
			String doc = (String)jsonObject.get("userName");
			String patient = (String)jsonObject.get("patientUserName");
			boolean result = ConnectionManager.assignToDoctor(doc,patient);
			if(!result) 
				response.sendError(500);

		}else {
			String username = (String)jsonObject.get("username");
			JSONArray array = ConnectionManager.getSelfAssesmentResult(username);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println(array);
			out.flush();
		}
	}
}
