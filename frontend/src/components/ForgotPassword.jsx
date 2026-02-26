import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1); // 1: email, 2: password reset
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('');
      setStep(2);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }
    setMessage('✓ Password reset successfully! Redirecting to login...');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleBack = () => {
    setStep(1);
    setMessage('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We'll help you regain access to your account
            </p>
          </div>

          {step === 1 ? (
            <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter your email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">Resetting password for: <strong>{email}</strong></p>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {message && (
                <p className={`text-sm mt-2 ${message.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Reset Password
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
