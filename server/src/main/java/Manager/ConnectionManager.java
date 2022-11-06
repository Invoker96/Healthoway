package Manager;

import model.User;
import util.DashboardUtility;
import util.TableNames;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONObject;

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
			String query = "INSERT INTO SOEN6841.USERS (USERNAME,FULLNAME,EMAIL,PASSWORD,USER_ROLE,ROLE_ID,ADDRESS,PNUM) VALUES (?,?,?,?,?,?,?,?)";
			PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getFullName());
			ps.setString(3, user.getEmail());
			ps.setString(4, user.getPassword());
			ps.setString(5, user.getUserRole().toString());
			ps.setString(6, user.getRoleId());
			ps.setString(7, user.getAddress());
			ps.setString(8, user.getPNum());
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

	public static JSONArray listOfPatient() {

		JSONArray arr = new JSONArray();
		try {
			String query = "SELECT u.username, u.fullname FROM users u,patient_requests p WHERE p.username = u.username;";
			System.out.println(query);
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
}