import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from 'src/notes/notes.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
a
  @OneToMany(() => Note, (note) => note.user, { cascade: true })
  notes: Note[];
}
