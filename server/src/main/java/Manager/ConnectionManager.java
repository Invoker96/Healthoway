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
}