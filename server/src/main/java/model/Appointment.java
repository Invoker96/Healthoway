package model;

import java.sql.Timestamp;

import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import enums.UserRole;
import util.HttpUtils;

public class Appointment {

	private String appointment;
	
	private String comments;
	
	//username of doctor or counsellor
	private String userName;
	
	private String email;
	
	private String patientUserName;
	
	private int req;	
		
	private UserRole role;
	
	public String getAppointment() {
		return appointment;
	}

	public void setAppointment(String appointment) {
		this.appointment = appointment;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPatientUserName() {
		return patientUserName;
	}

	public void setPatientUserName(String patientUserName) {
		this.patientUserName = patientUserName;
	}

	public int getReq() {
		return req;
	}

	public void setReq(int req) {
		this.req = req;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public static Appointment convert(String data) throws JsonMappingException, JsonProcessingException{
		Appointment app = new Appointment();
		JSONObject jsonObject = new JSONObject(data);
		app.setAppointment((String)jsonObject.get("appointment"));
		app.setComments((String)jsonObject.get("comments"));
		app.setUserName((String)jsonObject.get("counsellorUserName"));
		app.setEmail((String)jsonObject.get("email"));
		app.setPatientUserName((String)jsonObject.get("patientUserName"));
		app.setReq(Integer.parseInt((String)jsonObject.get("req")));
		app.setRole(UserRole.valueOf((String)jsonObject.get("role")));
		return app;
	}

}
