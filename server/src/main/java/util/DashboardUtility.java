package util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Manager.ConnectionManager;

public class DashboardUtility {

	public static JSONArray convertIntoListOfPatient(ResultSet rs) {

		JSONArray arr = new JSONArray();
		try {
			do {
				JSONObject obj = new JSONObject();
				obj.put("userName", rs.getString(1));
				obj.put("patientName", rs.getString(2));
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
}

