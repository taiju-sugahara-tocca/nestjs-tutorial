import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostInputType } from './post.interface';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts
  }

  async create(postInput: PostInputType): Promise<Post> {
    const post = new Post();
    post.title = postInput.title;
    return await this.postsRepository.save(post);
  }

  async find(post_id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id : post_id });
    return post;
  }

  async update(post_id: number, postInput: PostInputType): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id : post_id });
    if(!post){
      return null;
    }
    post.title = postInput.title;
    return await this.postsRepository.save(post);
  }

  async delete(post_id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id : post_id });
    if(!post){
      return null;
    }
    return await this.postsRepository.remove(post);
  }
}

/**
 * メモ
 * Promise<T>型はTまたはnullを解決するPromiseを表します。
 * db操作が入る場合は処理の完了を待つべくasync/awaitを使う必要があるみたい。
 */