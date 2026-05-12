"use client";
import { Heart } from "@/components/icons/heart";
import { SolidHeart } from "@/components/icons/solid-heart";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { SetAsFavoriteAction } from "./actions";
import { SearchResult } from "./page";

export function CloudinaryImage({
  imageData,
  ...rest
}: any & { imageData: SearchResult }) {
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
    } catch {
      setIsFavorited(previousValue);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="relative">
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
    </div>
  );
}
