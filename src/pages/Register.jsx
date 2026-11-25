import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getError } from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";

// 0-4 score based on length, uppercase, number and symbol
function strength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const LABELS = ["Too weak", "Weak", "Okay", "Good", "Strong"];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const score = form.password ? strength(form.password) : -1;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created! Welcome aboard 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account ✨"
      subtitle="It only takes a few seconds."
      footer={<>Already have an account? <Link to="/login">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="form">
        <Input label="Full name" icon="👤" name="name" placeholder="John Doe" value={form.name} onChange={onChange} required autoComplete="name" />
        <Input label="Email address" icon="✉️" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} required autoComplete="email" />
        <Input label="Password" icon="🔒" type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={onChange} required autoComplete="new-password" />

        {score >= 0 && (
          <div className="strength">
            <div className="strength-bars">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={i <= score - 1 ? `on s${score}` : ""} />
              ))}
            </div>
            <small>{LABELS[score]}</small>
          </div>
        )}

        <Input label="Confirm password" icon="✅" type="password" name="confirm" placeholder="Repeat your password" value={form.confirm} onChange={onChange} required autoComplete="new-password" />

        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? <span className="spinner" /> : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
