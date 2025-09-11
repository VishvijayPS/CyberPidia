import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordReset(){
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [step, setStep] = useState(1);

  const request = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/request-reset`, { email });
    setStep(2);
    alert('OTP sent if email exists');
  };

  const reset = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/reset-password`, { email, otp, newPassword: newPass });
    alert('Password reset if OTP valid');
    setStep(1);
  };

  return (
    <div style={{ padding:20 }}>
      <h2>Password Reset</h2>
      {step === 1 ? (
        <form onSubmit={request}>
          <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={reset}>
          <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <input type="password" placeholder="New password" value={newPass} onChange={e=>setNewPass(e.target.value)} />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}
