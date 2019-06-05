import "reflect-metadata";
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'inversify-react';
import { Container, interfaces } from 'inversify';
import PostsPage from './pages/posts';
import { PostAPIInterface } from "./apis/post/interface";
import { PostServiceInterface } from "./services/post/interface";
import PostService from "./services/post/post";
import PostAPI from "./apis/post";
import Axios, { AxiosInstance } from "axios";
import CommonTypes from "./constants/common_types";
import ApiTypes from "./constants/api_types";
import ServiceTypes from "./constants/service_types";

type State = {}
type Props = {}

class App extends PureComponent<Props, State> {
    private container: interfaces.Container;
    
    constructor(props = {}) {
        super(props);

        this.container = new Container();
        this.container.bind<AxiosInstance>(CommonTypes.HTTPPlaceholder).toFunction(Axios.create({
            baseURL: "http://jsonplaceholder.typicode.com",
        }));
        this.container.bind<PostAPIInterface>(ApiTypes.PostAPI).to(PostAPI).inSingletonScope();
        this.container.bind<PostServiceInterface>(ServiceTypes.PostService).to(PostService).inSingletonScope();
    }

    render() {
        return (
            <Provider container={this.container}>
                <PostsPage/>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
