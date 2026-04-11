import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { message } from "antd";
import { ArrowLeft } from "lucide-react";
import { db } from "../firebase";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { AdminDashboardShell } from "./AdminDashboardShell";
import { secondaryButtonClassName } from "./AdminFormClasses";
import { FormCard } from "./AdminFormPrimitives";
import ServiceEditorForm from "./ServiceEditorForm";
import {
  LEGACY_SERVICE_FIELDS,
  normalizeServiceDocument,
} from "./serviceFormUtils";

export default function EditServicePage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      setInitialLoading(true);

      try {
        const ref = doc(db, "services", id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          message.error("Service not found");
          navigate("/admin/services", { replace: true });
          return;
        }

        setInitialValues(normalizeServiceDocument(snapshot.data()));
      } catch (error) {
        console.error(error);
        message.error("Failed to load service");
      } finally {
        setInitialLoading(false);
      }
    };

    loadService();
  }, [id, navigate]);

  const saveService = async (payload, { optionalDeletes = [] } = {}) => {
    const deleteMap = Object.fromEntries(
      [...LEGACY_SERVICE_FIELDS, ...optionalDeletes].map((fieldName) => [
        fieldName,
        deleteField(),
      ])
    );

    try {
      await updateDoc(doc(db, "services", id), {
        ...payload,
        ...deleteMap,
        updatedAt: serverTimestamp(),
      });

      message.success("Service updated");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      message.error("Failed to update service");
      throw error;
    }
  };

  if (initialLoading || !initialValues) {
    return (
      <AdminDashboardShell
        title="Edit service"
        description="Loading service details."
        eyebrow="Service editor"
      >
        <FormCard>
          <LoadingSpinner />
        </FormCard>
      </AdminDashboardShell>
    );
  }

  return (
    <AdminDashboardShell
      title="Edit service"
      description="Update a service using the current hero, SEO, suitability, and process schema."
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
        submitLabel="Update service"
      />
    </AdminDashboardShell>
  );
}
