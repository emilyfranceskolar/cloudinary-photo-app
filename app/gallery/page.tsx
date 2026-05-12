import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinary-image";
import UploadButton from "./upload-button";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  let resources: SearchResult[] = [];
  let cloudinaryError: string | null = null;

  try {
    const results = (await cloudinary.v2.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(10)
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
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        {cloudinaryError ? (
          <p className="px-8 text-red-600">{cloudinaryError}</p>
        ) : null}
        <div className="grid grid-cols-4 gap-4 p-8">
          {resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              imageData={result}
              width="400"
              height="300"
              alt="an image of something"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
