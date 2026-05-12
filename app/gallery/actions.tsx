"use server";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

export async function SetAsFavoriteAction(
  public_id: string,
  isFavorite: boolean,
  path: string,
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [public_id]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [public_id]);
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));
  revalidatePath("/gallery");
}
