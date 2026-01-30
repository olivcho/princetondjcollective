import { utapi } from "@/app/utils/uploadthing";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { files } = await utapi.listFiles();
    
    // Transform files to include full URLs
    const filesWithUrls = files.map((file) => ({
      key: file.key,
      name: file.name,
      url: `https://utfs.io/f/${file.key}`,
      // Determine if it's a video based on extension
      isVideo: /\.(mp4|webm|mov|avi)$/i.test(file.name),
    }));

    return NextResponse.json({ files: filesWithUrls });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
