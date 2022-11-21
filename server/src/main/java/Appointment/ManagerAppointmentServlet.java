package Appointment;

import Manager.ConnectionManager;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;

import static util.HttpUtil.convertResultSetToArray;

public class ManagerAppointmentServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String dateFrom = req.getParameter("from");
        String dateTo =  req.getParameter("to");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        try {
            ResultSet rs = ConnectionManager.getListOfAppointmentsByDateRange(dateFrom, dateTo);
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
