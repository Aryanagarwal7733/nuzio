import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Lock, Mail, User, Sparkles, ArrowRight } from "lucide-react";

export const LoginModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, demoLogin } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await register({ email, password, name });
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setError("");
    setLoading(true);
    try {
      await demoLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
            {isRegister ? "Create Nuzio AI Account" : "Welcome Back to Nuzio AI"}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={() => setIsAuthModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        {/* Express Demo Button */}
        <button
          type="button"
          onClick={handleDemo}
          className="btn btn-secondary"
          style={{ width: '100%', marginBottom: '20px', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '12px' }}
        >
          <Sparkles size={16} />
          <span>⚡ 1-Click Express Demo Login (Alex Vance - Software Eng)</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>OR USE EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="Alex Vance" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="form-input" 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="alex.pro@nuzio.ai" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-input" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
            <span>{loading ? "Authenticating..." : isRegister ? "Create Account" : "Sign In"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.86rem', color: '#94a3b8' }}>
          {isRegister ? "Already have an account?" : "New to Nuzio AI?"}{" "}
          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)} 
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: 700 }}
          >
            {isRegister ? "Sign In" : "Create an Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
