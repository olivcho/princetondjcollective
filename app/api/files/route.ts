import { utapi } from "@/app/utils/uploadthing";
import { NextResponse } from "next/server";

// Custom display order — files listed here appear first, in this order.
// Files not listed appear after in their default order.
// Add a name to EXCLUDED to hide it from the site.
const CUSTOM_ORDER = ["7.jpeg", "8.jpeg", "vid1.mp4", "14.jpeg", "12.jpg", "vid2.mp4", "10.jpeg", "2.jpeg", "4.jpeg", "9.jpeg", "6.jpeg", "11.jpeg", "5.jpeg", "1.jpeg", "3.jpeg"];
const EXCLUDED = ["13.jpeg"];

export async function GET() {
  try {
    const { files } = await utapi.listFiles();

    const filesWithUrls = files
      .filter((file) => !EXCLUDED.includes(file.name))
      .map((file) => ({
        key: file.key,
        name: file.name,
        url: `https://utfs.io/f/${file.key}`,
        isVideo: /\.(mp4|webm|mov|avi)$/i.test(file.name),
      }))
      .sort((a, b) => {
        const ai = CUSTOM_ORDER.indexOf(a.name);
        const bi = CUSTOM_ORDER.indexOf(b.name);
        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });

    return NextResponse.json({ files: filesWithUrls });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await utapi.deleteFiles(EXCLUDED.map(name => {
      // We need keys not names — this is handled client-side via key param
      return name;
    }));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
