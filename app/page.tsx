"use client";

import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-2 items-center px-4 py-2 hover:bg-white hover:text-black hover:rounded round-lg">
        <CldUploadButton
          onSuccess={(result: UploadResult) => {
            setImageId(result.info.public_id);
          }}
          uploadPreset="ukdut1qt"
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </div>
        </CldUploadButton>
      </div>
      {imageId && (
        <div className="rounded-lg border border-border overflow-hidden shadow-md">
          <CldImage
            width="400"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        </div>
      )}
    </main>
  );
}
