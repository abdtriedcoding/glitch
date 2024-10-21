"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { File, Loader2, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  disabled: boolean;
  value: string;
  onChange: (url?: string) => void;
}

export function FileUpload({
  endpoint,
  disabled,
  value,
  onChange,
}: FileUploadProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex w-full justify-center">
        <div className="relative h-20 w-20 overflow-visible rounded-full">
          {imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
              <Loader2 className="animate-spin h-5 w-5 text-black" />
            </div>
          )}
          <Image
            fill
            src={value}
            alt="Upload"
            className={`rounded-full object-cover transition-all duration-500 ease-in-out ${
              imageLoaded
                ? "blur-lg scale-110 opacity-0"
                : "blur-0 scale-100 opacity-100"
            }`}
            onLoadingComplete={() => setImageLoaded(false)}
          />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <File className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="ut-label:text-indigo-500 ut-button:bg-indigo-500 ut-button:text-white ut-button:hover:bg-indigo-500/90 ut-upload-icon:text-indigo-500 border-2 border-input"
      disabled={disabled}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        setImageLoaded(true);
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
}
