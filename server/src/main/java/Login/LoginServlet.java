package Login;

import java.io.BufferedReader;
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

public class LoginServlet extends HttpServlet{

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		String data = readFromRequest(req);
		String[] value= getValues(data);
		String username= value[0];
		String password= value[1];

		String[] result = new String[2];
		try {
			result = ConnectionManager.loginCheck(username, password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		JSONObject obj = new JSONObject();
		
		if(result!=null) {
			obj.put("role", result[0]);
			obj.put("name", result[1]);
		}
		else {
			obj.put("role", "NA");
			
		}
		out.println(obj);
	}

	private String readFromRequest(HttpServletRequest req) throws IOException {
		// Read from request
		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = req.getReader();
		String line;
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
			buffer.append(System.lineSeparator());
		}
		return buffer.toString();

	}

	private String[] getValues(String data) {

		String[] values = new String[2];
		try
		{
			JSONObject jsonObject = new JSONObject(data);
			values[0]=(String)jsonObject.get("username");
			values[1]=(String)jsonObject.get("password");
		}
		catch (JSONException e)
		{
			System.out.println("Error "+e.toString());
		} 
		return values;
	}
}