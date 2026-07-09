const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:4200";
export function getFullImageUrl(imageUrl: string | null | undefined): string {
  return `${IMAGE_BASE_URL}/${imageUrl}`;
}