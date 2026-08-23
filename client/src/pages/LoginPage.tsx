export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f8ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Left Image */}
      <img
        src="/left-bg.png"
        alt="Left Background"
        style={{
          position: 'absolute',
          left: '0',
          bottom: '0',
          maxHeight: '85vh',
          width: 'auto',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Right Image */}
      <img
        src="/right-bg.png"
        alt="Right Background"
        style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          maxHeight: '85vh',
          width: 'auto',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Center Container */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '28px'
        }}>
          <div style={{
            backgroundColor: '#dbeafe',
            borderRadius: '20px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
              Welcome <span style={{ color: '#60a5fa' }}>Back!</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '4px 0 0 0' }}>
              Login to your account and continue collaborating with your team.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: '#eef5ff',
          borderRadius: '20px',
          padding: '36px 40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
          boxSizing: 'border-box'
        }}>
          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#0f172a', fontSize: '14px', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ position: 'absolute', left: '14px' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    border: '2px solid #3b82f6',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>
                  Password
                </label>
                <a href="#forgot" style={{ color: '#60a5fa', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ position: 'absolute', left: '14px' }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 42px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ position: 'absolute', right: '14px', cursor: 'pointer' }}>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="remember"
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' }}
              />
              <label htmlFor="remember" style={{ fontSize: '14px', color: '#334155', fontWeight: '500', cursor: 'pointer' }}>
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#89c0ea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(137, 192, 234, 0.4)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </button>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
              Don’t have an account?{' '}
              <a href="#signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                Sign up
              </a>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}