package Manager;

import model.User;

import java.sql.*;

public class ConnectionManager {

    static Connection con = new DatabaseManager("jdbc/soen6841").getConnection();

    public static String[] loginCheck(String username, String password) throws SQLException {
        String query = "SELECT * FROM SOEN6841.USERS WHERE username = ? AND password = ?";
        PreparedStatement stmt = con.prepareStatement(query);
        stmt.setString(1, username);
        stmt.setString(2, password);

        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            String[] values = new String[2];
            values[0] = rs.getString("USER_ROLE");
            values[1] = rs.getString("FULLNAME");
            return values;
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
}