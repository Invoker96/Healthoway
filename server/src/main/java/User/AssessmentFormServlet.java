package User;

import Manager.ConnectionManager;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.SelfAssessmentForm;
import util.HttpUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AssessmentFormServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        PrintWriter out = resp.getWriter();
        try {
            SelfAssessmentForm assessmentForm = objectMapper.readValue(HttpUtil.readFromRequest(req), SelfAssessmentForm.class);
            int check = ConnectionManager.insertSelfAssessmentResult(assessmentForm);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            out.close();
        }


    }

}


