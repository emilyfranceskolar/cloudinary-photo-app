import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import FavoritesList from "./favorites-list";

export default async function FavoritesPage() {
  let resources: SearchResult[] = [];
  let cloudinaryError: string | null = null;

  try {
    const results = (await cloudinary.v2.search
      .expression("resource_type:image AND tags=favorite")
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(10)
      .execute()) as { resources: SearchResult[] };

    resources = results.resources;
  } catch (error) {
    const message =
      (error as { error?: { message?: string } })?.error?.message ??
      "Failed to load favorites from Cloudinary.";
    cloudinaryError = message;
  }

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>
        {cloudinaryError ? (
          <p className="px-8 text-red-600">{cloudinaryError}</p>
        ) : null}
        <FavoritesList initialResources={resources} />
      </div>
    </section>
  );
}
