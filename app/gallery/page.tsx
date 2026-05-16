import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinary-image";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  const imageGridClasses =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8 auto-rows-fr";

  let resources: SearchResult[] = [];
  let cloudinaryError: string | null = null;

  try {
    const results = (await cloudinary.v2.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(8)
      .execute()) as { resources: SearchResult[] };

    resources = results.resources;
  } catch (error) {
    const message =
      (error as { error?: { message?: string } })?.error?.message ??
      "Failed to load images from Cloudinary.";
    cloudinaryError = message;
  }

  return (
    <section>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-bold">Gallery</h1>
        </div>
        {cloudinaryError ? (
          <p className="px-8 text-red-600">{cloudinaryError}</p>
        ) : null}
        <div className={imageGridClasses}>
          {resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              imageData={result}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              alt="an image of something"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
