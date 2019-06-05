import { injectable, inject } from "inversify";
import { AxiosInstance, AxiosResponse } from "axios";
import { PostAPIInterface } from "./interface";
import { Posts } from "../../models/posts";
import CommonTypes from "../../constants/common_types";

@injectable()
class PostAPI implements PostAPIInterface {
  @inject(CommonTypes.HTTPPlaceholder) private httpClient: AxiosInstance;

  async get(): Promise<AxiosResponse<Posts>> {
    return await this.httpClient.get<Posts>("/posts");
  }
}

export default PostAPI;
