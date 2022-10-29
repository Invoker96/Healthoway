package Manager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConnectionManager {

	static Connection con = new DatabaseManager("jdbc/soen6841").getConnection();

	public static String[] loginCheck(String username, String password) throws SQLException
	{
		String query = "Select * from SOEN6841.USERS WHERE username = ? AND pasword = ?";
		System.out.println("query is "+query);
		PreparedStatement stmt = con.prepareStatement(query);
		stmt.setString(1, username);
		stmt.setString(2, password);
		
		ResultSet rs= stmt.executeQuery();
		if(rs.next())
		{
			String[] values = new String[2];
			values[0] = rs.getString("USER_ROLE");
			values[1] = rs.getString("FULLNAME");
			return values;
		}
		else
		{
			return null;
		}
	}

	public static void registerUser(String name, String username, String password, String user_role, String role_id, String email, String address, String dob, String pnum)throws SQLException{
		PreparedStatement ps = con.prepareStatement("INSERT INTO SOEN6841.USERS (`FULLNAME`,`USERNAME`,`PASWORD`,`USER_ROLE`,`ROLE_ID`,`EMAIL`,`ADDRESS`,`DOB`,`PNUM`)" + "VALUES(?,?,?,?,?,?,?,?,?)");
		ps.setString(1,name);
		ps.setString(2,username);
		ps.setString(3,password);
		ps.setString(4,user_role);
		ps.setString(5,role_id);
		ps.setString(6,email);
		ps.setString(7,address);
		ps.setString(8,dob);
		ps.setString(9,pnum);
		ps.executeUpdate();
	}
}