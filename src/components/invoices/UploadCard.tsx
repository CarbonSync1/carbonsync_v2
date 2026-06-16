"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { formatFileSize } from "@/lib/utils";

const ACCEPTED_TYPES = ["pdf", "png", "jpg", "jpeg"];
const ACCEPT_MIME = ".pdf,.png,.jpg,.jpeg";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5" />,
  png: <ImageIcon className="w-5 h-5" />,
  jpg: <ImageIcon className="w-5 h-5" />,
  jpeg: <ImageIcon className="w-5 h-5" />,
};

const FILE_TYPE_COLORS: Record<string, string> = {
  pdf: "text-red-500 bg-red-50 border-red-200",
  png: "text-blue-500 bg-blue-50 border-blue-200",
  jpg: "text-sky-500 bg-sky-50 border-sky-200",
  jpeg: "text-sky-500 bg-sky-50 border-sky-200",
};

function getFileTypeIcon(ext: string) {
  return FILE_TYPE_ICONS[ext] ?? <FileText className="w-5 h-5" />;
}

function getFileTypeColor(ext: string) {
  return FILE_TYPE_COLORS[ext] ?? "text-gray-500 bg-gray-50 border-gray-200";
}

interface UploadCardProps {
  onFileSelect: (file: File | null) => void;
  file: File | null;
  error?: string | null;
  loading?: boolean;
  onRetry?: () => void;
}

export function UploadCard({
  onFileSelect,
  file,
  error,
  loading,
  onRetry,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateAndSelect = useCallback(
    (selectedFile: File) => {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ACCEPTED_TYPES.includes(ext)) {
        onFileSelect(null);
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        onFileSelect(null);
        return;
      }
      onFileSelect(selectedFile);
    },
    [onFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (loading) return;
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        validateAndSelect(droppedFile);
      }
    },
    [validateAndSelect, loading]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        validateAndSelect(selectedFile);
      }
    },
    [validateAndSelect]
  );

  const handleRemove = useCallback(() => {
    if (loading) return;
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onFileSelect, loading]);

  const handleBrowseClick = useCallback(() => {
    if (loading) return;
    inputRef.current?.click();
  }, [loading]);

  const ext = file ? file.name.split(".").pop()?.toLowerCase() ?? "" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div
        onDragEnter={loading ? undefined : handleDrag}
        onDragLeave={loading ? undefined : handleDrag}
        onDragOver={loading ? undefined : handleDrag}
        onDrop={loading ? undefined : handleDrop}
        onClick={() => !file && !loading && inputRef.current?.click()}
        className={`
          relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-300
          ${
            dragActive
              ? "border-eco-green bg-eco-green/5 shadow-lg shadow-eco-green/10"
              : file && !error
              ? "border-eco-green/30 bg-eco-green/[0.02]"
              : error
              ? "!border-red-400 !bg-red-50/30"
              : "border-outline-variant hover:border-eco-green/40 hover:bg-gray-50/50"
          }
          ${loading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_MIME}
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        {/* Progress bar */}
        {loading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-2xl overflow-hidden">
            <motion.div
              className="h-full bg-eco-green"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-16 h-16 rounded-2xl bg-eco-green/10 flex items-center justify-center"
              >
                <Loader2 className="w-7 h-7 text-eco-green" />
              </motion.div>
              <div>
                <p className="text-base font-semibold text-text-dark">
                  Uploading invoice...
                </p>
                <p className="text-sm text-text-muted mt-1">
                  Processing your document, please wait
                </p>
              </div>
              {file && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  {getFileTypeIcon(ext)}
                  <span className="text-sm font-medium text-text-dark">
                    {file.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
              )}
            </motion.div>
          ) : file && !error ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-14 h-14 rounded-2xl bg-eco-green/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-eco-green" />
              </motion.div>
              <div>
                <p className="text-base font-semibold text-text-dark">
                  {file.name}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  {ext.toUpperCase()} &middot; {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="inline-flex items-center gap-1.5 text-sm text-eco-green hover:text-eco-hover font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Replace file
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={dragActive ? { y: -5, scale: 1.05 } : { y: 0, scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-eco-green/10 flex items-center justify-center"
              >
                <Upload className="w-7 h-7 text-eco-green" />
              </motion.div>
              <div>
                <p className="text-base font-semibold text-text-dark">
                  {dragActive ? "Drop your file here" : "Drag & drop your file"}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  or{" "}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="text-eco-green font-medium hover:text-eco-hover transition-colors"
                  >
                    browse
                  </button>{" "}
                  to select a file
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {ACCEPTED_TYPES.map((t) => (
                  <span
                    key={t}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getFileTypeColor(t)}`}
                  >
                    {getFileTypeIcon(t)}
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-muted">
                Maximum file size: 5 MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-col items-center gap-3"
          >
            <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 text-sm text-eco-green hover:text-eco-hover font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
