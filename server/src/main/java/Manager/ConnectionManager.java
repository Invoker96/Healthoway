package Manager;

import Email.EmailSender;
import enums.EmailType;
import model.Appointment;
import model.SelfAssessmentForm;
import model.User;
import util.DashboardUtility;
import util.TableNames;

import java.sql.*;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import Email.sendEmail;
import enums.UserRole;

public class ConnectionManager {

    static Connection con = new DatabaseManager("jdbc/soen6841").getConnection();

    public static User loginCheck(String username, String password) throws SQLException {
        String query = "SELECT * FROM SOEN6841.USERS WHERE username = ? AND password = ? AND is_active='YES'";
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

    public static User getUser(String username) throws SQLException {
        String query = "SELECT * FROM SOEN6841.USERS WHERE username = ? AND is_active='YES'";
        PreparedStatement stmt = con.prepareStatement(query);
        stmt.setString(1, username);

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

    public static int insertSelfAssessmentResult(SelfAssessmentForm form) {
        int check = 0;
        try {
            check = 0;
            int VARIABLE;
            int id = form.getId();
            String query1 = "SELECT MAX(REQ) FROM SOEN6841.PATIENT_REQUESTS WHERE USERNAME = ?";
            PreparedStatement stmt = con.prepareStatement(query1, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, form.getUsername());
            stmt.executeQuery();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs != null && rs.next()) {
                // GET INT VALUE FROM RESULT SET AND INCREMENT IT
                int val = rs.getInt(1);
                VARIABLE = val + 1;
                check = rs.getInt(1);
            } else {
                // TEST FOR NULL VALUE OF VARIABLE
                VARIABLE = 1;
                System.out.println(VARIABLE);
            }
                
            String query3 = "SELECT ID FROM SOEN6841.USERS WHERE USERNAME = ?";
            PreparedStatement ps1 = con.prepareStatement(query3);
            ps1.setString(1, form.getUsername());
            ResultSet rs1 = ps1.executeQuery();
            if (rs1 != null && rs1.next()) {
            	id=rs1.getInt(1);
            }
            
            System.out.println("ID & REQ = "+id+" "+VARIABLE);
            String query2 = "INSERT INTO SOEN6841.PATIENT_REQUESTS(ID,REQ,USERNAME,EMAIL,QUES1,QUES2,QUES3,QUES4,QUES5,QUES6,QUES7,QUES8,QUES9)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement ps = con.prepareStatement(query2);
            ps.setInt(1, id);
            ps.setInt(2, VARIABLE);
            System.out.println(form.getUsername());
            ps.setString(3, form.getUsername());
            ps.setString(4, form.getEmail());
            ps.setString(5, form.getQues1());
            ps.setString(6, form.getQues2());
            ps.setString(7, form.getQues3());
            ps.setString(8, form.getQues4());
            ps.setString(9, form.getQues5());
            ps.setString(10, form.getQues6());
            ps.setString(11, form.getQues7());
            ps.setString(12, form.getQues8());
            ps.setString(13, form.getQues9());
            ps.executeUpdate();

            EmailSender.sendEmail(form.getUsername(), EmailType.ASSESSMENT_FORM_COMPLETED);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return check;
    }

    public static JSONArray listOfPatientForCounsellor() {

        JSONArray arr = new JSONArray();
        try {
            String query = "SELECT U.USERNAME, U.FULLNAME, P.REQ, P.EMAIL FROM USERS U,PATIENT_REQUESTS P " +
                    "WHERE P.USERNAME = U.USERNAME AND P.APPOINTMENT_GIVEN = 'NO' AND (P.DOCTOR_USERNAME IS NULL OR P.DOCTOR_USERNAME = '') " +
                    "AND U.IS_ACTIVE='YES';";
            PreparedStatement stmt = con.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                try {
                    arr = DashboardUtility.convertIntoListOfPatient(rs);
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            } else {
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
            String query = "select username, fullname from users where user_role = ? and is_active='YES';";
            PreparedStatement stmt = con.prepareStatement(query);
            stmt.setString(1, String.valueOf(UserRole.Doctor));
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                arr = DashboardUtility.getListOfDoctors(rs);
            } else {
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

            String query = "SELECT * FROM " + TableNames.PATIENT_REQUESTS_TABLE + " WHERE username = ?";
            PreparedStatement stmt = con.prepareStatement(query);
            stmt.setString(1, username);
            ResultSet answer = stmt.executeQuery();

            if (answer.next()) {

                String query1 = "SELECT * FROM " + TableNames.QUES_EVAL_TABLE;
                PreparedStatement stmt1 = con.prepareStatement(query1);
                ResultSet question = stmt1.executeQuery();
                if (question.next()) {
                    arr = DashboardUtility.getAnswers(answer, question);
                }
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return arr;
    }

    public static int removePatient(String username) {

        int n = 0;
        String query = "DELETE FROM " + TableNames.PATIENT_REQUESTS_TABLE + " WHERE username=?";
        PreparedStatement stmt;
        try {
            stmt = con.prepareStatement(query);
            stmt.setString(1, username);
            n = stmt.executeUpdate();

            EmailSender.sendEmail(username, EmailType.APPOINTMENT_REJECTED);
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return n;
    }

    public static void emailDetails(String uname) //function to called at end of insert to tables patient_requests and appointments
    {
        String selectQuery = "SELECT USERNAME, EMAIL, BODY, SUBJECT FROM SOEN6841.EMAIL_TABLE WHERE USERNAME = ?";
        try {
            PreparedStatement pt = con.prepareStatement(selectQuery);
            pt.setString(1, uname);
            ResultSet rs = pt.executeQuery();
            String email = "", body = "", subject = "";
            if (rs.next()) {
                email = rs.getString("EMAIL");
                body = rs.getString("BODY");
                subject = rs.getString("SUBJECT");
            }
            sendEmail.emailConfirmation(subject, body, uname, email);
            deleteEmailDetails(uname);
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static void deleteEmailDetails(String uname) {
        String delQuery = "DELETE FROM SOEN6841.EMAIL_TABLE WHERE USERNAME = ?";
        try {
            PreparedStatement pt = con.prepareStatement(delQuery);
            pt.setString(1, uname);
            int r = pt.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static boolean assignToSelf(Appointment app) {

        String insertQuery = "INSERT INTO " + TableNames.APPOINTMENTS_TABLE + "(REQ,USERNAME,EMAIL,APPOINTMENT,ROLE,COMMENTS,PATIENT_USERNAME) VALUES (?,?,?,?,?,?,?);";
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

            if (n > 0) {
                String updateQuery = "UPDATE SOEN6841.PATIENT_REQUESTS SET APPOINTMENT_GIVEN = 'YES' WHERE USERNAME = ?";
                pstmt = con.prepareStatement(updateQuery);
                pstmt.setString(1, app.getPatientUserName());
                n = pstmt.executeUpdate();
                if (n > 0) {
                    EmailSender.sendEmail(app.getPatientUserName(), EmailType.APPOINTMENT_SCHEDULED);
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
            if (n > 0) {
                EmailSender.sendEmail(patientUserName, EmailType.APPOINTMENT_SCHEDULED);
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
                + "AND P.USERNAME = U.USERNAME AND U.IS_ACTIVE = 'YES';";

        try {
            PreparedStatement pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            return pstmt.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;

    }

    public static ResultSet getAppointmentDetailsOfPatient(String username) {

        String query = "SELECT U.FULLNAME, U.USER_ROLE, A.APPOINTMENT, U.USERNAME FROM SOEN6841.APPOINTMENTS A , SOEN6841.USERS U "
                + "WHERE A.PATIENT_USERNAME = ? AND A.USERNAME = U.USERNAME AND U.IS_ACTIVE='YES';";
        try {
            PreparedStatement pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            return pstmt.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public static ResultSet getListOfPatientForDoctor(String username) {

        String query = "SELECT U.USERNAME, U.FULLNAME, P.REQ, P.EMAIL FROM SOEN6841.PATIENT_REQUESTS P, SOEN6841.USERS U "
                + "WHERE P.USERNAME = U.USERNAME AND P.DOCTOR_USERNAME = ? AND P.APPOINTMENT_GIVEN = 'NO' AND U.IS_ACTIVE='YES';";
        try {
            PreparedStatement pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            return pstmt.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Queries database for list of appointments based on date range
     *
     * @param from dateFrom in yyyy-MM-dd
     * @param to   dateTo in yyyy-MM-dd
     * @return list of appointments by date range
     */
    public static ResultSet getListOfAppointmentsByDateRange(String from, String to) throws SQLException {
        String query = "SELECT pu.ID patientId, pu.FULLNAME patientName, u.FULLNAME fullName, u.USER_ROLE role, a.appointment appointmentDate " +
                "FROM appointments a " +
                "JOIN users pu ON pu.USERNAME = a.PATIENT_USERNAME " +
                "JOIN users u ON u.USERNAME = a.USERNAME " +
                "WHERE DATE(appointment) >= ? " +
                "AND DATE(appointment) <= ? " +
                "ORDER BY appointment DESC";

        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setString(1, from);
        pstmt.setString(2, to);
        return pstmt.executeQuery();

    }

    public static boolean deleteUser(String username) throws SQLException {
        String query = "UPDATE users u SET IS_ACTIVE = 'NO' WHERE username = ?";

        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setString(1, username);

        int n = pstmt.executeUpdate();
        if(n > 0) {
            return true;
        }
        return false;
    }

    public static ResultSet getAllActiveUsers() throws SQLException {
        String query = "SELECT FULLNAME fullName, USERNAME userName, USER_ROLE role, ROLE_ID roleId, EMAIL email, ADDRESS address, DOB dob, PNUM phoneNumber FROM users WHERE is_active='YES'";

        PreparedStatement pstmt = con.prepareStatement(query);
        return pstmt.executeQuery();
    }
}
