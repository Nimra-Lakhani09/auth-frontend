import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getError } from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue to your dashboard."
      footer={<>Don't have an account? <Link to="/register">Create one</Link></>}
    >
      <form onSubmit={onSubmit} className="form">
        <Input
          label="Email address"
          icon="✉️"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          icon="🔒"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={onChange}
          required
          autoComplete="current-password"
        />
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? <span className="spinner" /> : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
