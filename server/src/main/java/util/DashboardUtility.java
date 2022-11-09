package util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Manager.ConnectionManager;
import model.Appointment;

public class DashboardUtility {

	public static JSONArray convertIntoListOfPatient(ResultSet rs) {

		JSONArray arr = new JSONArray();
		try {
			do {
				JSONObject obj = new JSONObject();
				obj.put("userName", rs.getString(1));
				obj.put("patientName", rs.getString(2));
				obj.put("req", rs.getString(3));
				obj.put("email", rs.getString(4));
				arr.put(obj);
			}while(rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

		return arr;
	}


	public static JSONArray getSelfAssesmentResult(String username) {

		JSONArray arr = ConnectionManager.getSelfAssesmentResult(username);

		return arr;
	}


	public static JSONArray getAnswers(ResultSet answer, ResultSet question) throws SQLException {

		JSONArray arr = new JSONArray();
		int i =1;
		do{
			String quesNo = "QUES"+(i++);
			JSONObject obj = new JSONObject();
			try {
				obj.put("question", question.getString("QUESTION"));
				obj.put("answer", answer.getString(quesNo));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			arr.put(obj);
		}while(question.next());
		return arr;
	}


	public static boolean assignToSelf(Appointment app) {

		return ConnectionManager.assignToSelf(app);

	}


	public static JSONArray getListOfDoctors(ResultSet rs) {
		JSONArray arr = new JSONArray();
		try {
			do {
				JSONObject obj = new JSONObject();
				obj.put("userName", rs.getString(1));
				obj.put("doctorName", rs.getString(2));
				arr.put(obj);
			}while(rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

		return arr;
	}


	public static JSONArray listOfPatientForDoctor(String username) {

		ResultSet rs = ConnectionManager.getListOfPatientForDoctor(username);
		JSONArray arr = new JSONArray();
		try {
			if(rs.next()) {
				arr = DashboardUtility.convertIntoListOfPatient(rs);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}
}

