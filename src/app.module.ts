import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Ayushi.01',
      database: 'jo',
      autoLoadEntities: true,
      synchronize: true, // Automatically sync schema (disable in production)
    }),
    AuthModule,
    UsersModule,
    NotesModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
