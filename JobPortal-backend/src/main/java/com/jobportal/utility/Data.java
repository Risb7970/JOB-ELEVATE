package com.jobportal.utility;

public class Data {
    public static String getMessageBody(String otp , String name){
        return String.format("<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <title>Your OTP Code</title>\n" +
                        "    <style>\n" +
                        "        body {\n" +
                        "            font-family: Arial, sans-serif;\n" +
                        "            background-color: #f6f9fc;\n" +
                        "            margin: 0;\n" +
                        "            padding: 0;\n" +
                        "        }\n" +
                        "        .container {\n" +
                        "            max-width: 600px;\n" +
                        "            margin: 30px auto;\n" +
                        "            background-color: #ffffff;\n" +
                        "            border: 1px solid #e1e4e8;\n" +
                        "            padding: 20px;\n" +
                        "            border-radius: 8px;\n" +
                        "        }\n" +
                        "        .header {\n" +
                        "            text-align: center;\n" +
                        "            padding-bottom: 20px;\n" +
                        "        }\n" +
                        "        .header h1 {\n" +
                        "            color: #2c3e50;\n" +
                        "        }\n" +
                        "        .content {\n" +
                        "            font-size: 16px;\n" +
                        "            color: #333333;\n" +
                        "            line-height: 1.6;\n" +
                        "        }\n" +
                        "        .otp {\n" +
                        "            font-size: 24px;\n" +
                        "            font-weight: bold;\n" +
                        "            background-color: #f0f4f8;\n" +
                        "            padding: 10px 20px;\n" +
                        "            display: inline-block;\n" +
                        "            margin: 20px 0;\n" +
                        "            border-radius: 5px;\n" +
                        "            color: #1a73e8;\n" +
                        "        }\n" +
                        "        .footer {\n" +
                        "            font-size: 14px;\n" +
                        "            color: #777777;\n" +
                        "            text-align: center;\n" +
                        "            margin-top: 30px;\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "<div class=\"container\">\n" +
                        "    <div class=\"header\">\n" +
                        "        <h1>Job Hook</h1>\n" +
                        "    </div>\n" +
                        "    <div class=\"content\">\n" +
                        "        <p>Dear %s,</p>\n" +
                        "        <p>Thank you for using our Job Hook.</p>\n" +
                        "        <p>Your One-Time Password (OTP) is:</p>\n" +
                        "        <div class=\"otp\">%s</div>\n" + // You can replace this dynamically
                        "        <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>\n" +
                        "        <p>If you did not request this, please ignore this email.</p>\n" +
                        "        <p>Regards,<br/>Job Portal Team</p>\n" +
                        "    </div>\n" +
                        "    <div class=\"footer\">\n" +
                        "        <p>© 2025 Job Hook. All rights reserved.</p>\n" +
                        "    </div>\n" +
                        "</div>\n" +
                        "</body>\n" +
                        "</html>", name , otp);

    }
}
