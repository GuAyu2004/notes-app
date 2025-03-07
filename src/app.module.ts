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
      host: 'dpg-cv58h08gph6c73ap5cj0-a.oregon-postgres.render.com', // Extracted from your URL
      port: 5432, // Default PostgreSQL port
      username: 'db_78sl_user', // Extracted from your URL
      password: 'M39cjMLsP7pewUk88ufMY0xz7ekUj4qy', // Extracted from your URL
      database: 'db_78sl', // Extracted from your URL
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
      ssl: {
        rejectUnauthorized: false,}
        
    }),
    AuthModule,
    UsersModule,
    NotesModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
