import { PostServiceInterface } from "./interface";
import { Posts } from "../../models/posts";
import { inject, injectable } from "inversify";
import { PostAPIInterface } from "../../apis/post/interface";
import ApiTypes from "../../constants/api_types";

@injectable()
class PostService implements PostServiceInterface {
  @inject(ApiTypes.PostAPI) private postAPI: PostAPIInterface;

  public async get(): Promise<Posts> {
    const { data } = await this.postAPI.get();
    return data;
  }
}

export default PostService;
