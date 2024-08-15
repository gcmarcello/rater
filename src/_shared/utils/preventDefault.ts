import { MouseEvent } from "react";

export function handleRatingClick(e: MouseEvent, session: boolean) {
  e.preventDefault();
  e.stopPropagation();
  return session;
}
