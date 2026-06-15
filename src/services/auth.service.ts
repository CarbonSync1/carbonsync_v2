import {
  StorageKeys,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/lib/storage";
import { generateId } from "@/lib/utils";
import type { User, Session, AuthResponse } from "@/types/auth";

export class AuthService {
  static getUsers(): User[] {
    return getStorageItem<User[]>(StorageKeys.USERS) ?? [];
  }

  static getSession(): Session | null {
    return getStorageItem<Session>(StorageKeys.SESSION);
  }

  static register(
    name: string,
    email: string,
    password: string
  ): AuthResponse {
    const users = this.getUsers();

    if (users.find((u) => u.email === email.toLowerCase().trim())) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const newUser: User = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    setStorageItem(StorageKeys.USERS, [...users, newUser]);

    const session: Session = {
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setStorageItem(StorageKeys.SESSION, session);

    return { success: true, user: session };
  }

  static login(email: string, password: string): AuthResponse {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email.toLowerCase().trim());

    if (!user) {
      return { success: false, error: "No account found with this email." };
    }

    if (user.password !== password) {
      return { success: false, error: "Incorrect password." };
    }

    const session: Session = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };

    setStorageItem(StorageKeys.SESSION, session);

    return { success: true, user: session };
  }

  static logout(): void {
    removeStorageItem(StorageKeys.SESSION);
  }
}
