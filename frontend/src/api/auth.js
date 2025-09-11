import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Request OTP for password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data; // { message: "OTP sent" }
  } catch (error) {
    throw error.response?.data || { message: "Request OTP failed" };
  }
};

// Verify OTP and reset password
export const verifyOtpAndReset = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { email, otp, newPassword });
    return response.data; // { message: "Password reset successful" }
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};
