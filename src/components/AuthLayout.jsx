// Shared two-column layout for Login & Register
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <aside className="brand-panel">
          <div className="logo">
            <span className="logo-mark">A</span> AuthHub
          </div>
          <h2>Secure access,<br />beautifully simple.</h2>
          <p>Create an account in seconds and manage your profile from anywhere.</p>
          <ul>
            <li><span>🔐</span> Passwords hashed with bcrypt</li>
            <li><span>🪪</span> JWT based sessions</li>
            <li><span>☁️</span> Data stored in MongoDB Atlas</li>
            <li><span>⚡</span> Fast, responsive & deployable on Vercel</li>
          </ul>
        </aside>

        <section className="form-panel">
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
          {children}
          <p className="switch-text">{footer}</p>
        </section>
      </div>
    </div>
  );
}
