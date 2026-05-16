import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

//mock för render använder sig av FavoreList-komponenten
// som i sin tur mappar < <CloudinaryImage /> om listan inte är tom
vi.mock("../gallery/cloudinary-image", () => ({
  CloudinaryImage: () => <div>Mock image</div>,
}));

import FavoritesList from "./favorites-list";

test("should show empty message when there are no favorites", async () => {
  const { getByText } = await render(<FavoritesList initialResources={[]} />);

  await expect
    .element(
      getByText(
        "No favorites yet! Like a photo in the gallery to see them here.",
      ),
    )
    .toBeInTheDocument();
});
