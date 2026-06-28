import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import PixelsForm from "@/components/admin/PixelsForm";

export const metadata: Metadata = { title: "Medición / Píxeles · Admin" };
export const dynamic = "force-dynamic";

export default async function MedicionPage() {
  const settings = await getSettings();
  return (
    <>
      <div className="admin-page-head">
        <h1>Medición / Píxeles</h1>
        <p>Configurá Meta Pixel y Google. Los scripts se insertan automáticamente en todas las páginas públicas solo si están activos.</p>
      </div>
      <PixelsForm settings={settings} />
    </>
  );
}
