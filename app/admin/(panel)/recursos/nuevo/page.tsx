import type { Metadata } from "next";
import ResourceForm from "@/components/admin/ResourceForm";

export const metadata: Metadata = { title: "Nueva nota · Admin" };

export default function NuevaNotaPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>Nueva nota</h1>
        <p>Creá una nota para la sección Recursos.</p>
      </div>
      <ResourceForm />
    </>
  );
}
