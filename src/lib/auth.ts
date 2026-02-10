const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

export interface CurrentUser {
  id: string;
  username: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  region: string | null;
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Try refreshing
        const refreshed = await refreshTokens();
        if (!refreshed) return null;
        // Retry with new token
        const retryRes = await fetch(`${API_URL}/api/v1/users/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!retryRes.ok) return null;
        return retryRes.json();
      }
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      logout();
      return false;
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return true;
  } catch {
    return false;
  }
}
