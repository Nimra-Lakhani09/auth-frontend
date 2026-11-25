import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDate, formatDay, parseDevice } from "../utils";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { icon: "🔑", label: "Total logins", value: user.loginCount },
    { icon: "🕒", label: "Last login", value: formatDate(user.lastLogin) },
    { icon: "📅", label: "Member since", value: formatDay(user.createdAt) },
    { icon: "🛡️", label: "Role", value: user.role },
  ];

  const details = [
    ["Full name", user.name],
    ["Email", user.email],
    ["Phone", user.phone || "Not added yet"],
    ["Bio", user.bio || "Not added yet"],
    ["Last login IP", user.lastLoginIp || "—"],
    ["User ID", user.id],
  ];

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>Hello, {user.name.split(" ")[0]} 👋</h1>
          <p>Here's a quick snapshot of your account.</p>
        </div>
        <Link to="/profile" className="btn btn-primary">Edit profile</Link>
      </section>

      <section className="stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <small>{s.label}</small>
              <strong>{s.value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section className="grid-2">
        <div className="card">
          <h3>Account details</h3>
          <dl className="details">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="card">
          <h3>Recent logins</h3>
          <ul className="history">
            {user.loginHistory.map((h, i) => (
              <li key={i}>
                <span className="dot" />
                <div>
                  <strong>{parseDevice(h.userAgent)}</strong>
                  <small>{h.ip || "Unknown IP"}</small>
                </div>
                <time>{formatDate(h.at)}</time>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
