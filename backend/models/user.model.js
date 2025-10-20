import { query } from "../db/connectDB.js";

// User repository with raw SQL queries
export const User = {
  // Create a new user
  create: async ({
    email,
    password,
    name,
    verificationToken,
    verificationTokenExpiresAt,
  }) => {
    const sql = `
			INSERT INTO users (email, password, name, verification_token, verification_token_expires_at)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id, email, name, last_login, is_verified, created_at, updated_at
		`;
    const values = [
      email,
      password,
      name,
      verificationToken,
      verificationTokenExpiresAt,
    ];
    const result = await query(sql, values);
    return result.rows[0];
  },

  // Find user by email
  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = $1";
    const result = await query(sql, [email]);
    return result.rows[0] || null;
  },

  // Find user by ID
  findById: async (id) => {
    const sql = "SELECT * FROM users WHERE id = $1";
    const result = await query(sql, [id]);
    return result.rows[0] || null;
  },

  // Find user by verification token with expiration check
  findByVerificationToken: async (token) => {
    const sql = `
			SELECT * FROM users
			WHERE verification_token = $1
			AND verification_token_expires_at > NOW()
		`;
    const result = await query(sql, [token]);
    return result.rows[0] || null;
  },

  // Find user by reset password token with expiration check
  findByResetToken: async (token) => {
    const sql = `
			SELECT * FROM users
			WHERE reset_password_token = $1
			AND reset_password_expires_at > NOW()
		`;
    const result = await query(sql, [token]);
    return result.rows[0] || null;
  },

  // Update user verification status
  verifyUser: async (id) => {
    const sql = `
			UPDATE users
			SET is_verified = true,
				verification_token = NULL,
				verification_token_expires_at = NULL,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING id, email, name, last_login, is_verified, created_at, updated_at
		`;
    const result = await query(sql, [id]);
    return result.rows[0];
  },

  // Update user's last login
  updateLastLogin: async (id) => {
    const sql = `
			UPDATE users
			SET last_login = CURRENT_TIMESTAMP,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING id, email, name, last_login, is_verified, created_at, updated_at
		`;
    const result = await query(sql, [id]);
    return result.rows[0];
  },

  // Set reset password token
  setResetPasswordToken: async (id, resetToken, expiresAt) => {
    const sql = `
			UPDATE users
			SET reset_password_token = $2,
				reset_password_expires_at = $3,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING id, email, name
		`;
    const result = await query(sql, [id, resetToken, expiresAt]);
    return result.rows[0];
  },

  // Reset password
  resetPassword: async (id, hashedPassword) => {
    const sql = `
			UPDATE users
			SET password = $2,
				reset_password_token = NULL,
				reset_password_expires_at = NULL,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING id, email, name
		`;
    const result = await query(sql, [id, hashedPassword]);
    return result.rows[0];
  },

  // Get user without password
  findByIdWithoutPassword: async (id) => {
    const sql = `
			SELECT id, email, name, last_login, is_verified, is_admin, created_at, updated_at
			FROM users
			WHERE id = $1
		`;
    const result = await query(sql, [id]);
    return result.rows[0] || null;
  },

  // Get all users except the current user (for messaging)
  findAllExceptUser: async (currentUserId) => {
    const sql = `
			SELECT id, email, name, last_login, is_verified, is_admin, created_at, updated_at
			FROM users
			WHERE id != $1
			ORDER BY name ASC
		`;
    const result = await query(sql, [currentUserId]);
    return result.rows;
  },

  // Count all users
  count: async () => {
    const sql = `SELECT COUNT(*) as count FROM users`;
    const result = await query(sql);
    return parseInt(result.rows[0].count);
  },
};
