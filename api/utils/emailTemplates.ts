const defaultFooter = `
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 12px; color: #888; line-height: 1.5; text-align: center;">
    You are receiving this email because you registered on <strong>FileForge</strong>.<br />
    If this wasn’t you, please ignore this email or <a href="mailto:support@fileforge.app" style="color: #888;">contact support</a>.<br /><br />
    &copy; ${new Date().getFullYear()} FileForge, All rights reserved.<br />
    <span style="font-size: 11px;">Made with ❤️ in India</span>
  </p>
`;

export const getVerificationEmailHtml = (name: string, link: string): string => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px;">
    <h2 style="color: #333;">Verify your email address</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thanks for signing up to <strong>FileForge</strong>! Please click the button below to verify your email address:</p>
    <p style="text-align: center;">
      <a href="${link}" target="_blank" rel="noopener noreferrer"
        style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Verify Email
      </a>
    </p>
    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="${link}" style="color: #007bff;">${link}</a></p>
    <p style="font-size: 12px; color: #999;">This link will expire in 48 hours.</p>
    ${defaultFooter}
  </div>
`;

export const getResetPasswordEmailHtml = (link: string): string => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px;">
    <h2 style="color: #e53935;">Reset Your Password</h2>
    <p>You requested a password reset. Please click the button below to set a new password:</p>
    <p style="text-align: center;">
      <a href="${link}" target="_blank" rel="noopener noreferrer"
        style="display: inline-block; padding: 12px 24px; background-color: #e53935; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Reset Password
      </a>
    </p>
    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="${link}" style="color: #e53935;">${link}</a></p>
    <p style="font-size: 12px; color: #999;">This link will expire in 48 hours.</p>
    ${defaultFooter}
  </div>
`;
