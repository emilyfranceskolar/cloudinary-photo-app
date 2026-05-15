"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import AlertFail from "./customized/alert/alert-fail";
import AlertSuccess from "./customized/alert/alert-success";

export default function Navbar() {
  const [imageId, setImageId] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "fail">(
    "idle",
  );

  useEffect(() => {
    if (uploadStatus === "idle") return;
    const timer = setTimeout(() => setUploadStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [uploadStatus]);

  return (
    <>
      <nav className="fixed inset-x-4 top-6 z-20 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background">
        <div className="mx-auto flex h-full items-center justify-center px-4">
          <div className="flex flex-1 items-center gap-2 md:gap-6">
            <Link href="/">
              <Logo />
            </Link>
            <div className="relative hidden md:block">
              <FiSearch className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
              <Input
                className="w-70 flex-1 rounded-full border-none pl-10 shadow-none"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-8">
            <CldUploadButton
              className="rounded-full px-6 py-2 border border-border text-xs font-bold text-white hover:bg-white hover:text-black"
              onSuccess={(result: CloudinaryUploadWidgetResults) => {
                if (typeof result.info !== "string" && result.info?.public_id) {
                  setImageId(result.info.public_id);
                  setUploadStatus("success");
                } else {
                  setUploadStatus("fail");
                }
              }}
              onError={() => {
                setUploadStatus("fail");
              }}
              uploadPreset="ukdut1qt"
            >
              Upload
            </CldUploadButton>

            <Button
              className="rounded-full px-6 py-2  text-xs text-white hover:bg-white hover:text-black"
              variant="outline"
            >
              Sign In
            </Button>
            <Button
              className="rounded-full text-xs text-white hover:bg-white hover:text-black"
              variant="outline"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
      <div className="fixed right-16 bottom-24 z-30 w-72">
        {uploadStatus === "success" && <AlertSuccess />}
        {uploadStatus === "fail" && <AlertFail />}
      </div>
    </>
  );
}
