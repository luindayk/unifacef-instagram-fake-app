import { action, observable } from 'mobx';

import axios from 'axios';

type Post = {
  id: number,
  image: string,
  description: string,
  authorId: number,
  author: {
    id: number,
    name: string,
    avatar: string
  }
}

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    try {
      const { data: posts } = await axios.get<[Post]>('http:localhost:3000/feed?_expand=author');
      this.posts = posts;
    } catch (error) {
      console.log(error);
      this.posts = [];
    }
  }

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 3,
        name: "luindayk",
        avatar: "https://avatars0.githubusercontent.com/u/13861505?s=460&v=4"
      },
      authorId: 3,
      description: 'irado',
      id: this.posts.length + 1,
      image: uriPhoto
    }

    // this.posts.push(post);
    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }
}

const homeStore = new HomeStore();
export { homeStore };
