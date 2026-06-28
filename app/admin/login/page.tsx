"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginAction, type LoginState } from "./actions";
import "../admin.css";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={48} height={48} />
          <div>
            <strong>Villarroel &amp; Asociados</strong>
            <span>Panel de administración</span>
          </div>
        </div>

        <h1>Iniciar sesión</h1>
        <p className="admin-muted">Ingresá con tus credenciales de administrador.</p>

        {state.error && <div className="admin-alert admin-alert--error">{state.error}</div>}

        <form action={formAction}>
          <input type="hidden" name="next" value={next} />
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="username" required autoFocus />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" autoComplete="current-password" required />
          </div>
          <button type="submit" className="admin-btn admin-btn--primary admin-btn--block" disabled={pending}>
            {pending ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
