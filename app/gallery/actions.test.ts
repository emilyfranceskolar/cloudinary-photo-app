import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SetAsFavoriteAction } from "./actions";

vi.mock("cloudinary", () => ({
  default: {
    v2: {
      uploader: {
        add_tag: vi.fn(),
        remove_tag: vi.fn(),
      },
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("SetAsFavoriteAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add the favorite tag when isFavorite is true", async () => {
    await SetAsFavoriteAction("photo-123", true);

    expect(cloudinary.v2.uploader.add_tag).toHaveBeenCalledWith("favorite", [
      "photo-123",
    ]);
    expect(cloudinary.v2.uploader.remove_tag).not.toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/gallery");
    expect(revalidatePath).toHaveBeenCalledWith("/favorites");
  });

  it("should remove the favorite tag when isFavorite is false", async () => {
    await SetAsFavoriteAction("photo-123", false);

    expect(cloudinary.v2.uploader.remove_tag).toHaveBeenCalledWith("favorite", [
      "photo-123",
    ]);
    expect(cloudinary.v2.uploader.add_tag).not.toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/gallery");
    expect(revalidatePath).toHaveBeenCalledWith("/favorites");
  });
});
