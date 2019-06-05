import { Posts } from "../../models/posts";

export interface PostServiceInterface {
  get(): Promise<Posts>;
}
