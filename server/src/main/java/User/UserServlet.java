package User;

import Manager.ConnectionManager;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.User;
import org.json.JSONObject;
import util.HttpUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.*;

import static util.HttpUtil.convertResultSetToArray;

public class UserServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse response) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        PrintWriter out = response.getWriter();
        JSONObject obj = new JSONObject();
        try {
            User newUser = objectMapper.readValue(HttpUtil.readFromRequest(req), User.class);
            int newUserId = ConnectionManager.registerUser(newUser);
            obj.put("id", newUserId);
            out.println(obj);
        } catch (Exception e) {
            Logger.getLogger (UserServlet.class.getName()).log(Level.WARNING, e.getMessage(), e);
        } finally {
            out.close();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        try {
            boolean result = ConnectionManager.deleteUser(username);
            if(!result) {
                resp.sendError(500, "Failed to delete user");
            }

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            PrintWriter out = resp.getWriter();
            JSONObject res = new JSONObject();
            res.put("username", username);

            out.println(res);
            out.flush();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        try {
            ResultSet rs = ConnectionManager.getAllActiveUsers();

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            out.println(convertResultSetToArray(rs));

        } catch (Exception ex) {
            JSONObject obj = new JSONObject();
            obj.put("error", ex.getMessage());
            out.println(obj);
        } finally {
            out.flush();
        }

    }
}
