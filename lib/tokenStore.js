// Simple in-memory store for development (use database in production)
let tokenData = null;

export const tokenStore = {
  async setToken(token) {
    tokenData = token;
    // For production, implement database storage here
  },

  async getToken() {
    return tokenData;
  },

  async clearToken() {
    tokenData = null;
  },
};