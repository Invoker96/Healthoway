package model;

import enums.UserRole;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class User implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -671784076038520948L;
	private Long id;
    private String fullName;
    private String username;
    private String email;
    private String password;
    private UserRole userRole;
    private String roleId;
    private String address;
    private String dob;
    private String pNum;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getPNum() {
        return pNum;
    }

    public void setPNum(String pNum) {
        this.pNum = pNum;
    }

	public static User convertResultSet(ResultSet rs) throws SQLException {
		User user = new User();
		user.setId(Long.valueOf(rs.getString("ID")));
		user.setFullName(rs.getString("FULLNAME"));
		user.setUsername(rs.getString("USERNAME"));
		user.setUserRole(UserRole.valueOf(rs.getString("USER_ROLE")));
		user.setRoleId(rs.getString("ROLE_ID"));
		user.setEmail(rs.getString("EMAIL"));
		user.setPassword("********");
//		Timestamp ts = new Timestamp(Long.valueOf(1667769339880L));
//		user.setDob(ts.toLocalDateTime().toLocalDate());
		
		user.setDob(rs.getString("DOB"));
		user.setAddress(rs.getString("ADDRESS"));
		user.setPNum(rs.getString("PNUM"));
		return user;
	}

	public static JSONObject convertIntoJSON(User user) throws JsonProcessingException {

		String jsonString = new ObjectMapper().writeValueAsString(user);
		return new JSONObject(jsonString);
	}
    
	
}
