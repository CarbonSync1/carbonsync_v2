"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload as UploadIcon,
  CloudUpload,
  Loader2,
} from "lucide-react";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { UploadCard } from "@/components/invoices/UploadCard";
import { EmissionsService } from "@/services/emissions";

const ACCEPTED_TYPES = ["pdf", "png", "jpg", "jpeg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function InvoicesPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = useCallback((selected: File | null) => {
  EmissionsService.clearLatestResult();
  EmissionsService.clearPendingFile();

  setFile(selected);
  setUploadError(null);

    if (!selected) return;

    const ext = selected.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_TYPES.includes(ext)) {
      setUploadError(
        "Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG file."
      );
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setUploadError("File too large. Maximum allowed size is 5MB.");
      return;
    }
  }, []);

  const handleUpload = async () => {
    if (!file || uploadError || loading) return;

    EmissionsService.clearLatestResult();

      setLoading(true);
     setUploadError(null);

    try {
      await EmissionsService.uploadInvoice(file);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setUploadError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setUploadError(null);
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="w-14 h-14 rounded-2xl bg-eco-green/10 flex items-center justify-center mx-auto mb-5"
              >
                <UploadIcon className="w-7 h-7 text-eco-green" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-dark tracking-tight">
                Upload Invoice
              </h1>
              <p className="text-text-muted text-sm sm:text-base mt-3 max-w-lg mx-auto">
                Upload an invoice to automatically extract items and calculate
                carbon emissions.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-eco-green/20 to-transparent mt-6 max-w-xs mx-auto" />
            </div>

            <UploadCard
              onFileSelect={handleFileSelect}
              file={file}
              error={uploadError}
              loading={loading}
              onRetry={handleRetry}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || !!uploadError || loading}
                className="inline-flex items-center gap-2.5 bg-eco-green hover:bg-eco-hover text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-eco-green/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-xl hover:shadow-eco-green/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <CloudUpload className="w-5 h-5" />
                    Upload Invoice
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}
