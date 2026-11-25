export const formatDate = (d) =>
  d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

export const formatDay = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { dateStyle: "long" }) : "—";

// Turns a raw user-agent string into something like "Chrome · Windows"
export function parseDevice(ua = "") {
  const browser = /edg/i.test(ua) ? "Edge"
    : /chrome|crios/i.test(ua) ? "Chrome"
    : /firefox|fxios/i.test(ua) ? "Firefox"
    : /safari/i.test(ua) ? "Safari"
    : "Browser";
  const os = /windows/i.test(ua) ? "Windows"
    : /android/i.test(ua) ? "Android"
    : /iphone|ipad|ios/i.test(ua) ? "iOS"
    : /mac/i.test(ua) ? "macOS"
    : /linux/i.test(ua) ? "Linux"
    : "Unknown OS";
  return `${browser} · ${os}`;
}

export const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "U";
