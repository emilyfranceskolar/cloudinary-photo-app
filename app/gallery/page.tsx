import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinary-image";
import UploadButton from "./upload-button";

type SearchResult = {
  public_id: string;
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(50)
    .execute()) as { resources: SearchResult[] };
  console.log(results);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4 p-8">
          {results.resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              src={result.public_id}
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
