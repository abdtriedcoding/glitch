"use client";

import Image from "next/image";
import { File, X } from "lucide-react";
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
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex w-full justify-center">
        <div className="relative h-20 w-20">
          <Image
            fill
            src={value}
            alt="Upload"
            className="rounded-full object-cover"
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
      }}
      onUploadError={(error: Error) => {
        console.log(
          "🚀 ~ file: file-upload.tsx:64 ~ FileUpload ~ error:",
          error
        );
      }}
    />
  );
}
