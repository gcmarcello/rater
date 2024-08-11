import { JwtPayload } from "jsonwebtoken";

export type Session = JwtPayload & {
  id: string;
  name: string;
};
