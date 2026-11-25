import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { getError } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import { initials, formatDay } from "../utils";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({ name: user.name, phone: user.phone || "", bio: user.bio || "" });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [deletePw, setDeletePw] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/me", profile);
      setUser(data.user);
      toast.success("Profile updated ✅");
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) return toast.error("New passwords do not match");
    setSaving(true);
    try {
      await api.put("/auth/password", { currentPassword: pw.currentPassword, newPassword: pw.newPassword });
      toast.success("Password changed 🔐");
      setPw({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    if (!window.confirm("This permanently deletes your account. Continue?")) return;
    setSaving(true);
    try {
      await api.delete("/auth/me", { data: { password: deletePw } });
      toast.success("Account deleted");
      logout();
      navigate("/register");
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page narrow">
      <div className="card profile-head">
        <div className="avatar lg">{initials(user.name)}</div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="badge">Joined {formatDay(user.createdAt)}</span>
        </div>
      </div>

      <div className="tabs">
        {[
          ["profile", "Edit profile"],
          ["security", "Security"],
          ["danger", "Danger zone"],
        ].map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="card">
        {tab === "profile" && (
          <form className="form" onSubmit={saveProfile}>
            <Input label="Full name" icon="👤" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
            <Input label="Email (cannot be changed)" icon="✉️" value={user.email} disabled />
            <Input label="Phone" icon="📞" placeholder="+92 300 1234567" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <label className="field">
              <span className="field-label">Bio</span>
              <textarea
                className="textarea"
                rows="3"
                maxLength="200"
                placeholder="Tell us something about you…"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </label>
            <button className="btn btn-primary" disabled={saving}>
              {saving ? <span className="spinner" /> : "Save changes"}
            </button>
          </form>
        )}

        {tab === "security" && (
          <form className="form" onSubmit={changePassword}>
            <Input label="Current password" icon="🔑" type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} required />
            <Input label="New password" icon="🔒" type="password" placeholder="Min. 6 characters" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} required />
            <Input label="Confirm new password" icon="✅" type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
            <button className="btn btn-primary" disabled={saving}>
              {saving ? <span className="spinner" /> : "Update password"}
            </button>
          </form>
        )}

        {tab === "danger" && (
          <form className="form" onSubmit={deleteAccount}>
            <p className="warn">⚠️ Deleting your account removes all your data from the database. This cannot be undone.</p>
            <Input label="Confirm with your password" icon="🔒" type="password" value={deletePw} onChange={(e) => setDeletePw(e.target.value)} required />
            <button className="btn btn-danger" disabled={saving}>
              {saving ? <span className="spinner" /> : "Delete my account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
