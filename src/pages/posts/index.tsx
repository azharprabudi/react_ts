import 'reflect-metadata';
import React, { PureComponent } from 'react';
import { resolve } from 'inversify-react';
import { PostServiceInterface } from '../../services/post/interface';
import ServiceTypes from '../../constants/service_types';
import { Posts, Post } from '../../models/posts';
   
type Props = {}
type State = {
    load: boolean,
    posts: Posts,
}

class PostsPage extends PureComponent<Props, State> {
    @resolve(ServiceTypes.PostService) private postService: PostServiceInterface;

    state = {
        load: false,
        posts: []
    }
   
    componentDidMount() {
       this.getPosts(); 
    }

    private getPosts = async () => {
        try {
            this.setState({ load: true })
            const data = await this.postService.get();
            this.setState({ load: false, posts: data })
        } catch(e) {
            this.setState({ load: false })
            alert(e.toString());
        }
    }

    private removePost = (e:any) => {
        const { id }  = e.target.dataset;
        this.setState({
            posts: this.state.posts.filter((post: Post) => post.id != id)
        })
    }

    render() {
        if (this.state.load) {
            return <h1 data-cy="load-posts">load ...</h1>
        }

        return (
            <div data-cy="posts">
                {
                    this.state.posts.map((item: Post) => (
                        <div key={item.id} data-cy="item-posts">
                        {item.title}
                        <button type="button" onClick={this.removePost} data-cy={`btn-post-${item.id}`} data-id={item.id} >x</button>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default PostsPage;
