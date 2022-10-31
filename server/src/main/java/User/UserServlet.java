package User;

import Manager.ConnectionManager;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.User;
import org.json.JSONObject;
import util.HttpUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class UserServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse response) throws IOException {
        System.out.println("Registering user");
        ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        PrintWriter out = response.getWriter();
        JSONObject obj = new JSONObject();
        try {
            User newUser = objectMapper.readValue(HttpUtils.readFromRequest(req), User.class);
            int newUserId = ConnectionManager.registerUser(newUser);
            obj.put("id", newUserId);
            out.println(obj);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            out.close();
        }
    }

}
