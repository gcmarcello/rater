import { CelebrityController } from "../controller";

export async function GET() {
  return new CelebrityController().getHighlightedCelebrities();
}
