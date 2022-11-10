package Email;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class sendEmail {
	public static void emailConfirmation(String subject, String body, String uname, String toEmail)
	   {   
		final String username = "username@gmail.com"; //your username
	    final String pasword = "password"; // your password
	    Properties prop = new Properties();
	    prop.put("mail.smtp.auth", true);
	    prop.put("mail.smtp.starttls.enable", "true");
	    prop.put("mail.smtp.host", "localhost");
	    prop.put("mail.smtp.port", "9090");
	    Session session = Session.getInstance(prop, new Authenticator() {
	        @Override
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(username, pasword);
	        }
	    });
	    subject = subject +" for "+uname;
	    Message message = new MimeMessage(session);
	    try {
			message.setFrom(new InternetAddress(username));
		
	    message.setRecipients(
	      Message.RecipientType.TO, InternetAddress.parse(toEmail));
	    message.setSubject(subject);

	    String msg = body;

	    MimeBodyPart mimeBodyPart = new MimeBodyPart();
	    mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

	    Multipart multipart = new MimeMultipart();
	    multipart.addBodyPart(mimeBodyPart);

	    message.setContent(multipart);

	    Transport.send(message);
	    } catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
