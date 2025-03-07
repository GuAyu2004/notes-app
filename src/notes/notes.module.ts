import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controlller';
import { Note } from './notes.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Module({
  imports: [JwtModule,TypeOrmModule.forFeature([Note,User])], // Connects Note entity to DB
  providers: [NotesService],
  controllers: [NotesController],
})

export class NotesModule {}
