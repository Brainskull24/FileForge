const defaultFooter = `
  <tr>
    <td style="padding: 24px 16px; font-size: 13px; background-color: #f1f5fb; color: #555; text-align: center; border-top: 4px solid #1a73e8;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        You are receiving this email because you registered on <strong>FileForge</strong>.<br />
        If this wasn’t you, please ignore this email or
        <a href="mailto:support@fileforge.app" style="color: #1a73e8;">contact support</a>.
      </p>
      <p style="margin-top: 12px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} FileForge, All rights reserved.<br />
        <span style="font-size: 11px;">Made with ❤️ in India</span>
      </p>
    </td>
  </tr>
`;

export const getVerificationEmailHtml = (name: string, link: string): string => `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; font-family:'Segoe UI', sans-serif; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr style="background-color: #1a73e8;">
            <td style="padding: 24px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 24px;">FileForge</h2>
              <p style="margin: 4px 0 0; font-size: 14px;">Secure File Conversion & Sharing</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px; color:#333; font-size: 16px; line-height: 1.6;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for registering with <strong>FileForge</strong>. Please verify your email by clicking the button below:</p>

              <div style="text-align: center; margin: 24px 0;">
                <a href="${link}" style="padding: 14px 28px; background-color: #1a73e8; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Verify Email
                </a>
              </div>

              <p>If the button doesn’t work, copy and paste this link into your browser:</p>
              <p><a href="${link}" style="color:#1a73e8;">${link}</a></p>

              <p style="font-size: 13px; color: #999; margin-top: 32px;">This link will expire in 48 hours.</p>
            </td>
          </tr>

          ${defaultFooter}

        </table>
      </td>
    </tr>
  </table>
`;

export const getResetPasswordEmailHtml = (link: string): string => `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; font-family:'Segoe UI', sans-serif; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr style="background-color: #1a73e8;">
            <td style="padding: 24px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 24px;">FileForge</h2>
              <p style="margin: 4px 0 0; font-size: 14px;">Secure File Conversion & Sharing</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px; color:#333; font-size: 16px; line-height: 1.6;">
              <p><strong>Password Reset Requested</strong></p>
              <p>We received a request to reset your password. If this was you, please click the button below to create a new password:</p>

              <div style="text-align: center; margin: 24px 0;">
                <a href="${link}" style="padding: 14px 28px; background-color: #1a73e8; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>

              <p>If the button doesn’t work, copy and paste this link into your browser:</p>
              <p><a href="${link}" style="color:#1a73e8;">${link}</a></p>

              <p style="font-size: 13px; color: #999; margin-top: 32px;">This link will expire in 48 hours.</p>
            </td>
          </tr>

          ${defaultFooter}

        </table>
      </td>
    </tr>
  </table>
`;
