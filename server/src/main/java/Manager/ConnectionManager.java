package Manager;

import model.Appointment;
import model.User;
import util.DashboardUtility;
import util.TableNames;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONObject;

import enums.UserRole;

public class ConnectionManager {

	static Connection con = new DatabaseManager("jdbc/soen6841").getConnection();

	public static User loginCheck(String username, String password) throws SQLException {
		String query = "SELECT * FROM SOEN6841.USERS WHERE username = ? AND password = ?";
		PreparedStatement stmt = con.prepareStatement(query);
		stmt.setString(1, username);
		stmt.setString(2, password);

		ResultSet rs = stmt.executeQuery();
		if (rs.next()) {
			return User.convertResultSet(rs);
		} else {
			return null;
		}
	}

	public static int registerUser(User user) {
		try {
			String query = "INSERT INTO SOEN6841.USERS (USERNAME,FULLNAME,EMAIL,PASSWORD,USER_ROLE,ROLE_ID,ADDRESS,PNUM,DOB) VALUES (?,?,?,?,?,?,?,?,?)";
			PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getFullName());
			ps.setString(3, user.getEmail());
			ps.setString(4, user.getPassword());
			ps.setString(5, user.getUserRole().toString());
			ps.setString(6, user.getRoleId());
			ps.setString(7, user.getAddress());
			ps.setString(8, user.getPNum());
			ps.setString(9, user.getDob());
			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public static JSONArray listOfPatientForCounsellor() {

		JSONArray arr = new JSONArray();
		try {
			String query = "SELECT U.USERNAME, U.FULLNAME, P.REQ, P.EMAIL FROM USERS U,PATIENT_REQUESTS P "
					+ "WHERE P.USERNAME = U.USERNAME AND P.APPOINTMENT_GIVEN = 'NO' AND (P.DOCTOR_USERNAME IS NULL OR P.DOCTOR_USERNAME = '');";
			PreparedStatement stmt = con.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			if(rs.next()) {
				try {
					arr = DashboardUtility.convertIntoListOfPatient(rs);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			else {
				System.out.println("no result found");
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static JSONArray listOfDoctors() {

		JSONArray arr = new JSONArray();
		try {
			String query = "select username, fullname from users where user_role = ?;";
			PreparedStatement stmt = con.prepareStatement(query);
			stmt.setString(1, String.valueOf(UserRole.Doctor));
			ResultSet rs = stmt.executeQuery();
			if(rs.next()) {
				arr=DashboardUtility.getListOfDoctors(rs);
			}
			else {
				System.out.println("no result found");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}


	public static JSONArray getSelfAssesmentResult(String username) {

		JSONArray arr = new JSONArray();
		try {

			String query = "SELECT * FROM "+TableNames.PATIENT_REQUESTS_TABLE+" WHERE username = ?";
			PreparedStatement stmt = con.prepareStatement(query);
			stmt.setString(1, username);
			ResultSet answer = stmt.executeQuery();

			if(answer.next()) {

				String query1 = "SELECT * FROM "+TableNames.QUES_EVAL_TABLE;
				PreparedStatement stmt1 = con.prepareStatement(query1);
				ResultSet question = stmt1.executeQuery();
				if(question.next()) {
					arr = DashboardUtility.getAnswers(answer,question);
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static int removePatient(String username) {

		int n=0;
		String query = "DELETE FROM "+TableNames.PATIENT_REQUESTS_TABLE+" WHERE username=?";
		PreparedStatement stmt;
		try {
			stmt = con.prepareStatement(query);
			stmt.setString(1, username);
			n = stmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return n;
	}

	public static boolean assignToSelf(Appointment app) {

		String insertQuery = "INSERT INTO "+TableNames.APPOINTMENTS_TABLE+"(REQ,USERNAME,EMAIL,APPOINTMENT,ROLE,COMMENTS,PATIENT_USERNAME) VALUES (?,?,?,?,?,?,?);";
		try {
			PreparedStatement pstmt = con.prepareStatement(insertQuery);
			pstmt.setInt(1, app.getReq());
			pstmt.setString(2, app.getUserName());
			pstmt.setString(3, app.getEmail());
			pstmt.setString(4, app.getAppointment());
			pstmt.setString(5, String.valueOf(app.getRole()));
			pstmt.setString(6, app.getComments());
			pstmt.setString(7, app.getPatientUserName());
			int n = pstmt.executeUpdate();
			if(n>0) {
				String updateQuery = "UPDATE SOEN6841.PATIENT_REQUESTS SET APPOINTMENT_GIVEN = 'YES' WHERE USERNAME = ?";
				pstmt = con.prepareStatement(updateQuery);
				pstmt.setString(1, app.getPatientUserName());
				n=pstmt.executeUpdate();
				if(n>0) {
					return true;
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public static boolean assignToDoctor(String doctorUserName, String patientUserName) {

		String insertQuery = "UPDATE SOEN6841.PATIENT_REQUESTS SET DOCTOR_USERNAME = ? WHERE USERNAME = ?";
		try {
			PreparedStatement pstmt = con.prepareStatement(insertQuery);
			pstmt.setString(1, doctorUserName);
			pstmt.setString(2, patientUserName);

			int n = pstmt.executeUpdate();
			if(n>0) {
				return true;
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	public static ResultSet getAppointmentDetails(String username) {

		String query = "SELECT U.FULLNAME,A.PATIENT_USERNAME, A.APPOINTMENT,A.COMMENTS "
				+ "FROM SOEN6841.APPOINTMENTS A , SOEN6841.USERS U , SOEN6841.PATIENT_REQUESTS P WHERE A.USERNAME = ? AND A.PATIENT_USERNAME = P.USERNAME "
				+ "AND P.USERNAME = U.USERNAME;";

		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			return pstmt.executeQuery();
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
	public static ResultSet getAppointmentDetailsOfPatient(String username) {

		String query = "SELECT U.FULLNAME, U.USER_ROLE, A.APPOINTMENT, U.USERNAME FROM SOEN6841.APPOINTMENTS A , SOEN6841.USERS U "
				+ "WHERE A.PATIENT_USERNAME = ? AND A.USERNAME = U.USERNAME;";
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			return pstmt.executeQuery();
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static ResultSet getListOfPatientForDoctor(String username) {

		String query = "SELECT U.USERNAME, U.FULLNAME, P.REQ, P.EMAIL FROM SOEN6841.PATIENT_REQUESTS P, SOEN6841.USERS U "
				+ "WHERE P.USERNAME = U.USERNAME AND P.DOCTOR_USERNAME = ? AND P.APPOINTMENT_GIVEN = 'NO';";
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			return pstmt.executeQuery();
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}