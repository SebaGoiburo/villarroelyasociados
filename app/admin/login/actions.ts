"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signSession, setSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!email || !password) {
    return { error: "Ingresá email y contraseña." };
  }

  // Mensaje genérico para no revelar si el email existe.
  const invalid = { error: "Email o contraseña incorrectos." };

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch {
    return { error: "No se pudo conectar con la base de datos." };
  }
  if (!user) return invalid;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return invalid;

  const token = await signSession({ sub: user.id, email: user.email, name: user.name });
  await setSessionCookie(token);

  // Evitar open-redirect: solo rutas internas del panel.
  const safeNext = next.startsWith("/admin") ? next : "/admin";
  redirect(safeNext);
}
