"use client";
import { Heart } from "@/components/icons/heart";
import { SolidHeart } from "@/components/icons/solid-heart";
import { DeleteButton } from "@/components/ui/delete-button";
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
    <section className="relative">
      <div className="absolute top-2 left-2">
        <DeleteButton />
      </div>
      <CldImage {...rest} src={imageData.public_id} />
      {isFavorited ? (
        <SolidHeart
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 hover:text-white text-red-700 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 hover:text-red-700 cursor-pointer"
        />
      )}
    </section>
  );
}
