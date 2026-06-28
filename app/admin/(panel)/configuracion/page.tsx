import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata: Metadata = { title: "Configuración general · Admin" };
export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const settings = await getSettings();
  return (
    <>
      <div className="admin-page-head">
        <h1>Configuración general</h1>
        <p>Logo, WhatsApp y email de destino del formulario. Los cambios se reflejan en el sitio al guardar.</p>
      </div>
      <SettingsForm settings={settings} />
    </>
  );
}
