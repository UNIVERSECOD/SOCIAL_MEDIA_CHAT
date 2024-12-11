function generatePasswordResetEmail(token, user) {
    const resetLink = `${process.env.FE_BASE_URL}/reset-password/${token}`;

    return {
        text: `Please use the following link to reset your password: ${resetLink}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
              color: #444;
              line-height: 1.6;
            }
            .email-container {
              max-width: 480px;
              margin: 30px auto;
              background: #fff;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #4CAF50;
              color: #fff;
              padding: 15px 20px;
              text-align: center;
              font-size: 18px;
              font-weight: bold;
            }
            .email-body {
              padding: 25px 20px;
              font-size: 16px;
            }
            .email-body p {
              margin-bottom: 15px;
            }
            .email-body a {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 25px;
              background-color: #4CAF50;
              color: #fff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              transition: background-color 0.3s ease;
            }
            .email-body a:hover {
              background-color: #45a049;
            }
            .email-footer {
              background-color: #f1f1f1;
              text-align: center;
              font-size: 12px;
              color: #777;
              padding: 15px;
              border-top: 1px solid #ddd;
            }
            .email-footer a {
              color: #4CAF50;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              Reset Your Password
            </div>
            <div class="email-body">
              <p>Hello, ${user.name}</p>
              <p>We received a request to reset your password. Click the button below to set a new password:</p>
              <a href="${resetLink}" target="_blank">Reset Password</a>
              <p>If you didn’t request a password reset, you can safely ignore this email.</p>
              <p>Thank you,<br>Your Support Team</p>
            </div>
            <div class="email-footer">
              <p>© 2024 Your Company. All rights reserved.</p>
              <p><a href="#">Privacy Policy</a> | <a href="#">Contact Support</a></p>
            </div>
          </div>
        </body>
        </html>
        `
    };
}


export default generatePasswordResetEmail