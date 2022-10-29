package Registration;
import java.sql.SQLException;

import Manager.ConnectionManager;
import org.json.*;


public class RegisterUser {
        public static void main(String[] args) throws SQLException {
            ConnectionManager con = new ConnectionManager();
            try {
                //sample jsonObject
                JSONObject jsonObject = new JSONObject("{\"name\": \"wer\", \"email\": \"qq@gmail.com\", \"password\": \"1234\", \"type\": \"Counsellor\", \"confirmPassword\": \"\"}");
                String name = jsonObject.getString("name");
                String email = jsonObject.getString("email");
                String password = jsonObject.getString("password");
                String type = jsonObject.getString("type");
                String confirmPassword = jsonObject.getString("confirmPassword");
                con.registerUser(name,"avisd",password,type,"",email,"","1997-05-09","890");
            }catch (JSONException err){
                System.out.println(err);
            }
        }
}
