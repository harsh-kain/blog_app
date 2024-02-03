/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method like login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const loginAccount = await this.account.createEmailSession(
        email,
        password
      );
      return loginAccount;
    } catch (error) {
      throw error;
    }
  }
  // Retrieves the current user.

  // @returns {Promise<Object|null>} A promise that resolves to the current user object, or null if there is an error.

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("apprite error :: getCurrentUser ::", error);
    }
    return null;
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("apprite error :: Logout Error ::", error);
    }
  }
}

const authService = new AuthService();
export default authService;
