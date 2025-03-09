import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepo: Repository<Note>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  // Create a new note
  async createNote(title: string, content: string, userId: number): Promise<Note> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const newNote = this.notesRepo.create({ title, content, user });
    return await this.notesRepo.save(newNote);
  }

  async findAll(userId: number) {
    return await this.notesRepo.find({
        where: { user: { id: userId } }, // ✅ Ensure it fetches only notes belonging to the logged-in user
    });
}


  // Remove a note by id
  async remove(id: number) {
    return await this.notesRepo.delete(id);
  }
}
