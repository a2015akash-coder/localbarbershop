import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { message } from "antd";
import { ArrowLeft } from "lucide-react";
import { db } from "../firebase";
import { AdminDashboardShell } from "./AdminDashboardShell";
import { secondaryButtonClassName } from "./AdminFormClasses";
import ServiceEditorForm from "./ServiceEditorForm";
import { createEmptyServiceForm } from "./serviceFormUtils";

export default function UploadServicePage() {
  const navigate = useNavigate();
  const initialValues = useMemo(() => createEmptyServiceForm(), []);

  const saveService = async (payload) => {
    try {
      await addDoc(collection(db, "services"), {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      message.success("Service created");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      message.error("Failed to save service");
      throw error;
    }
  };

  return (
    <AdminDashboardShell
      title="New service"
      description="Create a service record using the current hero, SEO, inclusions, and process schema."
      eyebrow="Service editor"
      action={
        <button
          type="button"
          onClick={() => navigate("/admin/services")}
          className={secondaryButtonClassName}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to services
        </button>
      }
    >
      <ServiceEditorForm
        initialValues={initialValues}
        onSubmit={saveService}
        submitLabel="Save service"
      />
    </AdminDashboardShell>
  );
}
