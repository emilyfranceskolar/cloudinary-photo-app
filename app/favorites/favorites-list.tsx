"use client";

import { useEffect, useState } from "react";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {resources.map((result) => (
        <CloudinaryImage
          key={result.public_id}
          imageData={result}
          width="400"
          height="300"
          alt="an image of something"
          // onUnHeart={(unheartedResource) => {
          //   setResources((currentResources) => {
          //     return currentResources.filter((resource) => {
          //       return resource.public_id !== unheartedResource.public_id;
          //     });
          //   });
          // }}
        />
      ))}
    </div>
  );
}
