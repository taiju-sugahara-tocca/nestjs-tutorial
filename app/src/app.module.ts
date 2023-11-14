import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/posts.entity';

@Module({
  imports: [
    //DB接続
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nestjs_tutorial_mysql',
      port: 3306, //3306にしないとtcpエラー出た(docker-compose変えても)
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [Post],
      synchronize: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
