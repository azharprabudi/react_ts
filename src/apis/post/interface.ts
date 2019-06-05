import { AxiosResponse } from "axios";
import { Posts } from "../../models/posts";

export interface PostAPIInterface {
  get(): Promise<AxiosResponse<Posts>>;
}
