package Dashboard;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import Manager.ConnectionManager;
import util.HttpUtil;

public class ManagerDashboard extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		final String URL = req.getRequestURI();
		String data = HttpUtil.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);

		if(URL.contains("removePatient")) {
			String username = (String)jsonObject.get("username");
			int n = ConnectionManager.removePatient(username);
			if(n<0) 
				response.sendError(500);

		}else if(URL.contains("removeCounsellor")) {
			String username = (String)jsonObject.get("username");
			int n = ConnectionManager.removePatient(username);
			if(n<0) 
				response.sendError(500);
		}
		else if(URL.contains("removeDoctor")) {
			String username = (String)jsonObject.get("username");
			int n = ConnectionManager.removePatient(username);
			if(n<0) 
				response.sendError(500);
		}
	}
}
