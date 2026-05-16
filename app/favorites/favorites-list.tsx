"use client";
import { useState } from "react";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const imageGridClasses =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8 auto-rows-fr";

  const [resources, setResources] = useState(initialResources);

  if (resources.length === 0) {
    return (
      <div className="flex justify-start p-8">
        <p>No favorites yet! Like a photo in the gallery to see them here.</p>
      </div>
    );
  }

  return (
    <div className={imageGridClasses}>
      {resources.map((result) => (
        <CloudinaryImage
          key={result.public_id}
          imageData={result}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          alt="an image of something"
          onUnHeart={(unheartedResource) => {
            setResources((currentResources) => {
              return currentResources.filter((resource) => {
                return resource.public_id !== unheartedResource.public_id;
              });
            });
          }}
        />
      ))}
    </div>
  );
}
