package util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Manager.ConnectionManager;

public class AppointmentUtility {

	public static String convert(String dateString) throws ParseException {

		dateString = dateString.substring(0,19);

		DateFormat utcFormatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss",Locale.CANADA);

		utcFormatter.setTimeZone(TimeZone.getTimeZone("UTC"));
		Date gpsUTCDate = null;
		try {
			gpsUTCDate = utcFormatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String longDate = new SimpleDateFormat("EEE, d MMM yyyy h:mm a").format(gpsUTCDate);
		return longDate;
	}

	public static JSONArray getAppointmentDetails(String userName) {

		ResultSet rs = ConnectionManager.getAppointmentDetails(userName);

		JSONArray arr = new JSONArray();
		try {
			while(rs!=null && rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("patientName", rs.getString("FULLNAME"));
				obj.put("userName", rs.getString("PATIENT_USERNAME"));
				obj.put("appointment", convert(rs.getString("APPOINTMENT")));
				obj.put("comments", rs.getString("COMMENTS"));
				arr.put(obj);
			}
		} catch (SQLException | JSONException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static JSONArray getPatientAppointment(String userName) {

		ResultSet rs = ConnectionManager.getAppointmentDetailsOfPatient(userName);
		JSONArray arr = new JSONArray();
		try {
			while(rs!=null && rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("fullName", rs.getString(1));
				obj.put("userRole", rs.getString(2));
				obj.put("appointment", convert(rs.getString("APPOINTMENT")));
				obj.put("userName", rs.getString(4));
				arr.put(obj);
			}
		} catch (SQLException | JSONException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

}
