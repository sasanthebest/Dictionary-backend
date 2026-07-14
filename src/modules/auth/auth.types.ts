import { User } from "../../models/user.model";

export interface JWTDecoded extends User {
  id: string;
}
