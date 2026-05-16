"use client";
import { Heart } from "@/components/icons/heart";
import { SolidHeart } from "@/components/icons/solid-heart";
import { CldImage } from "next-cloudinary";
import type { ComponentProps } from "react";
import { useState } from "react";
import { SetAsFavoriteAction } from "./actions";
import { SearchResult } from "./page";

type CloudinaryImageProps = Omit<ComponentProps<typeof CldImage>, "src"> & {
  imageData: SearchResult;
  onUnHeart?: (resource: SearchResult) => void;
};

export function CloudinaryImage({
  imageData,
  onUnHeart,
  ...rest
}: CloudinaryImageProps) {
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite"),
  );
  const [isSaving, setIsSaving] = useState(false);

  async function handleFavoriteClick() {
    if (isSaving) return;

    const nextValue = !isFavorited;
    const previousValue = isFavorited;

    setIsFavorited(nextValue);
    setIsSaving(true);

    try {
      await SetAsFavoriteAction(imageData.public_id, nextValue);
      if (!nextValue) {
        onUnHeart?.(imageData);
      }
    } catch {
      setIsFavorited(previousValue);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="relative aspect-4/3 overflow-hidden rounded-lg bg-zinc-900 h-full">
      <CldImage {...rest} src={imageData.public_id} className="object-cover" />
      {isFavorited ? (
        <SolidHeart
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 hover:text-white text-red-600 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 hover:text-red-600 cursor-pointer"
        />
      )}
      {/* <div className="absolute top-2 left-2 cursor-pointer">
        <DeleteButton />
      </div> */}
    </section>
  );
}
