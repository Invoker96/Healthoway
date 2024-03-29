package model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import java.io.Serializable;

public class SelfAssessmentForm implements Serializable {

    private static final long serialVersionUID = 10l;

    private int id;
    private String username;
    private String email;
    private String ques1;
    private String ques2;
    private String ques3;
    private String ques4;
    private String ques5;
    private String ques6;
    private String ques7;
    private String ques8;
    private String ques9;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getQues1() {
        return ques1;
    }

    public void setQues1(String ques1) {
        this.ques1 = ques1;
    }

    public String getQues2() {
        return ques2;
    }

    public void setQues2(String ques2) {
        this.ques2 = ques2;
    }

    public String getQues3() {
        return ques3;
    }

    public void setQues3(String ques3) {
        this.ques3 = ques3;
    }

    public String getQues4() {
        return ques4;
    }

    public void setQues4(String ques4) {
        this.ques4 = ques4;
    }

    public String getQues5() {
        return ques5;
    }

    public void setQues5(String ques5) {
        this.ques5 = ques5;
    }

    public String getQues6() {
        return ques6;
    }

    public void setQues6(String ques6) {
        this.ques6 = ques6;
    }

    public String getQues7() {
        return ques7;
    }

    public void setQues7(String ques7) {
        this.ques7 = ques7;
    }

    public String getQues8() {
        return ques8;
    }

    public void setQues8(String ques8) {
        this.ques8 = ques8;
    }

    public String getQues9() {
        return ques9;
    }

    public void setQues9(String ques9) {
        this.ques9 = ques9;
    }
}
