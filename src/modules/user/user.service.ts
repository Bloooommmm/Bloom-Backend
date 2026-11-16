import { AppError } from "../../utils/index.js";
import { userRepository } from "./user.repository.js";

function requireEmail(value: unknown): string {
  if (typeof value !== "string" || !value.includes("@")) throw new AppError("A valid email is required", 400);
  return value.trim().toLowerCase();
}

export const userService = {
  create(data: { email?: unknown; name?: unknown; password?: unknown }) {
    const email = requireEmail(data.email);
    return userRepository.create({ email, name: typeof data.name === "string" ? data.name.trim() : undefined, password: typeof data.password === "string" ? data.password : undefined });
  },
  list() {
    return userRepository.findAll();
  },
  async get(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError("User is not found", 404);
    return user;
  },
  update(id: string, data: { email?: unknown; name?: unknown; password?: unknown }) {
    return userRepository.update(id, {
      ...(data.email !== undefined ? { email: requireEmail(data.email) } : {}),
      ...(data.name !== undefined ? { name: typeof data.name === "string" ? data.name.trim() : undefined } : {}),
      ...(data.password !== undefined ? { password: typeof data.password === "string" ? data.password : undefined } : {}),
    });
  },
  delete(id: string) {
    return userRepository.delete(id);
  },
};
