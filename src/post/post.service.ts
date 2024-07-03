import { Injectable, NotFoundException } from '@nestjs/common';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */


export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
}

let post: PostModel[] = [
    {
        id: 1,
        author: 'newjeans_official',
        title: '뉴진스 민지',
        content: '민지',
        likeCount: 10000,
        commentCount: 9999,
    },

    {
        id: 2,
        author: 'newjeans_official',
        title: '뉴진스 하니',
        content: '하니',
        likeCount: 10000,
        commentCount: 9999,
    },

    {
        id: 3,
        author: 'newjeans_official',
        title: '뉴진스 해린',
        content: '해린',
        likeCount: 10000,
        commentCount: 9999,
    }
]


@Injectable()
export class PostService {

    getAllPost() {
        return post;
    }

    getPostById(id: number) {
        const posts = post.find((post) => post.id === +id);

        if (!post) {
            throw new NotFoundException();
        }
    }

    createPost(author: string, title: string, content: string) {
        const posts: PostModel = {
            id: post[post.length - 1].id + 1,
            author,
            title,
            content,
            likeCount: 0,
            commentCount: 0
        };

        post = [...post, posts]

        return posts;
    }

    updatePost(id: number, author: string, title: string, content: string) {
        const posts = post.find(post => post.id === id);

        if (!posts) {
            throw new NotFoundException();
        }

        if (author) {
            posts.author = author;
        }

        if (title) {
            posts.title = title;
        }

        if (content) {
            posts.content = content;
        }

        post = post.map(prevPost => prevPost.id === +id ? posts : prevPost)
        return post

    }

    deletePost(id: number) {
        post = post.filter(post => post.id !== id);
        return id;
    }
}
