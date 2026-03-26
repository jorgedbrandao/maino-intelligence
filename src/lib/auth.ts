import type { User } from "@/types";

const STORAGE_KEY = "maino_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as User) : null;
}

export function login(user: Omit<User, "loggedAt">): User {
  const userData: User = { ...user, loggedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  return userData;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}
