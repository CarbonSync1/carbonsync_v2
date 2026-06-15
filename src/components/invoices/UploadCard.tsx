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
}

export function UploadCard({ onFileSelect, file, error }: UploadCardProps) {
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
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        validateAndSelect(droppedFile);
      }
    },
    [validateAndSelect]
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
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onFileSelect]);

  const ext = file ? file.name.split(".").pop()?.toLowerCase() ?? "" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`
          relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-300
          ${
            dragActive
              ? "border-eco-green bg-eco-green/5 shadow-lg shadow-eco-green/10"
              : file
              ? "border-eco-green/30 bg-eco-green/[0.02]"
              : "border-outline-variant hover:border-eco-green/40 hover:bg-gray-50/50"
          }
          ${error ? "!border-red-400 !bg-red-50/30" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_MIME}
          onChange={handleFileChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {file ? (
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Remove file
              </button>
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
                  or <span className="text-eco-green font-medium">browse</span>{" "}
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
