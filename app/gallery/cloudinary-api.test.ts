import cloudinary from "cloudinary";
import "dotenv/config";
import { describe, expect, it } from "vitest";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const hasCredentials = Boolean(process.env.CLOUDINARY_URL);

describe("Cloudinary API", () => {
  const runOrSkip = hasCredentials ? it : it.skip;

  runOrSkip("can be reached with ping", async () => {
    if (hasCredentials) {
      cloudinary.v2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
    }

    const response = await cloudinary.v2.api.ping();
    expect(response.status).toBe("ok");
  });
});
