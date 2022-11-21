package Login;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import Manager.ConnectionManager;
import model.User;
import util.HttpUtil;

public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

        String data = HttpUtil.readFromRequest(req);
        String[] value = getValues(data);
        String username = value[0];
        String password = value[1];

        try {
            User user = ConnectionManager.loginCheck(username, password);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            JSONObject obj = new JSONObject();


            if (user != null) {
                obj = User.convertIntoJSON(user);
            } else {
                obj.put("userRole", "NA");
            }
            out.println(obj);
            out.flush();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String[] getValues(String data) {

        String[] values = new String[2];
        try {
            JSONObject jsonObject = new JSONObject(data);
            values[0] = (String) jsonObject.get("username");
            values[1] = (String) jsonObject.get("password");
        } catch (JSONException e) {
            System.out.println("Error " + e.toString());
        }
        return values;
    }
}