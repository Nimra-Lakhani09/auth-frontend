import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="loader-screen">
      <h1 className="big-404">404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go home</Link>
    </div>
  );
}
