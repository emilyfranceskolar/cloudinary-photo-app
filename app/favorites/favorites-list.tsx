"use client";

import { useState } from "react";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);
  if (resources.length === 0) {
    return (
      <div className="flex justify-start p-8">
        <p>No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {resources.map((result) => (
        <CloudinaryImage
          key={result.public_id}
          imageData={result}
          width="400"
          height="300"
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
