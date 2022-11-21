package Appointment;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import enums.UserRole;
import util.AppointmentUtility;
import util.HttpUtil;

public class AppointmentServlet  extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		
		String data = HttpUtil.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);
		String userRole = (String)jsonObject.get("userRole");
		String userName = (String)jsonObject.get("userName");
		
		JSONArray array = new JSONArray();
		
		if(userRole.equalsIgnoreCase(String.valueOf(UserRole.Doctor)) || userRole.equalsIgnoreCase(String.valueOf(UserRole.Counsellor))) {
			array = AppointmentUtility.getAppointmentDetails(userName);
		}
		else if(userRole.equalsIgnoreCase(String.valueOf(UserRole.Patient))) {
			array = AppointmentUtility.getPatientAppointment(userName);
		}
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.println(array);
		out.flush();
	}
}
