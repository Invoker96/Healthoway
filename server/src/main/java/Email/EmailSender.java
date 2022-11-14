package Email;

import enums.EmailType;
import model.User;
import sendinblue.ApiClient;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static Manager.ConnectionManager.getUser;

public class EmailSender {

    private static String API_KEY = "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";
    private static String SENDER_EMAIL = "admin.healthoway@gmail.com";
    private static String SENDER_NAME = "Healthoway";

    public static void sendEmail(String username, EmailType emailType) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        // Configure API key authorization: api-key
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey(API_KEY);

        try {
            User targetUser = getUser(username);

            TransactionalEmailsApi api = new TransactionalEmailsApi();

            SendSmtpEmailSender sender = new SendSmtpEmailSender();
            sender.setEmail(SENDER_EMAIL);
            sender.setName(SENDER_NAME);

            List<SendSmtpEmailTo> toList = new ArrayList<>();
            SendSmtpEmailTo to = new SendSmtpEmailTo();
            to.setEmail(targetUser.getEmail());
            to.setName(targetUser.getFullName());
            toList.add(to);

            SendSmtpEmailReplyTo replyTo = new SendSmtpEmailReplyTo();
            replyTo.setEmail(SENDER_EMAIL);
            replyTo.setName(SENDER_NAME);

            Properties params = new Properties();
            params.setProperty("name", targetUser.getFullName());

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.setSender(sender);
            sendSmtpEmail.setTo(toList);
            sendSmtpEmail.setHtmlContent(getEmailBody(emailType));
            sendSmtpEmail.setSubject(getEmailSubject(emailType));
            sendSmtpEmail.setReplyTo(replyTo);
            sendSmtpEmail.setParams(params);

            CreateSmtpEmail emailResponse = api.sendTransacEmail(sendSmtpEmail);
            System.out.println(emailResponse.toString());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    //TODO: move email subject & body templates to db whenever there is time
    private static String getEmailSubject(EmailType emailType) throws Exception {
        switch (emailType) {
            case APPOINTMENT_SCHEDULED:
                return "Healthoway - Appointment Scheduled";
            case APPOINTMENT_REJECTED:
                return "Healthoway - Appointment Rejected";
            case ASSESSMENT_FORM_COMPLETED:
                return "Healthoway - Assessment Form Completed";
            default:
                throw new Exception("Unknown email type supplied");
        }
    }

    private static String getEmailBody(EmailType emailType) {
        String emailStart = "<html><body>Dear {{params.name}}!<br/><br/>";
        String emailEnd = "<br/><br/>This is an auto-generated email. If you have any questions, please email us a <i>hello@healthoway.com</i><br/><br/>Best regards,<br/>Team Healthoway</body></html>";
        String emailTypeBody = "";
        switch (emailType) {
            case APPOINTMENT_SCHEDULED:
                emailTypeBody = "Your appointment has been scheduled. Please check your appointment details on the Healthoway website.";
                break;
            case APPOINTMENT_REJECTED:
                emailTypeBody = "Your appointment has been rejected.";
                break;
            case ASSESSMENT_FORM_COMPLETED:
                emailTypeBody = "Thank you for completing the self assessment form. We will get in touch with you within 2-3 business days.";
        }
        return String.format("%s%s%s", emailStart, emailTypeBody, emailEnd);
    }
}
