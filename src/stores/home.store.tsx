import { Post, getPosts } from '../apis/posts.api';
import { action, observable } from 'mobx';

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable loading: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    this.loading = true;
    try {
      const posts = await getPosts();
      this.loading = false;
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
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
