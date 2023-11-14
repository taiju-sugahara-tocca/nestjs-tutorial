import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostInputType } from './post.interface';

//npm startその都度しないと変更反映されないのか？ =>yarn start:devをすると解決。devでないといけない。

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('index') //これがルーティング。'posts/index' コントローラー名/メソッド名
  async findAll() {
    return await this.postsService.findAll();
  }

  @Post('create')
  async create(@Body() post: PostInputType) {
    return await this.postsService.create(post);
  }

  @Get('show/:post_id') // :で変数。
  async findById(@Param('post_id') post_id: number) {
    return await this.postsService.find(post_id);
  }

  @Post('update/:post_id')
  async update(@Param('post_id') post_id: number, @Body() post: PostInputType) {
    return await this.postsService.update(post_id, post);
  }

  @Post('delete/:post_id')
  async delete(@Param('post_id') post_id: number) {
    return await this.postsService.delete(post_id);
  }


}
