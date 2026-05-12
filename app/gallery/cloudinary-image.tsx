"use client";

import { Heart } from "@/components/icons/heart";
import { SolidHeart } from "@/components/icons/solid-heart";
import { CldImage } from "next-cloudinary";
import { useTransition } from "react";
import { SetAsFavoriteAction } from "./actions";
import { SearchResult } from "./page";

export function CloudinaryImage(
  props: any & { imageData: SearchResult; path: string },
) {
  const [transition, startTransition] = useTransition();
  const { imageData } = props;
  const isFavorited = (imageData.tags ?? []).includes("favorite");

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <SolidHeart
          onClick={() => {
            startTransition(() => {
              SetAsFavoriteAction(imageData.public_id, false, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-700 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              SetAsFavoriteAction(imageData.public_id, true, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-700 cursor-pointer"
        />
      )}
    </div>
  );
}
