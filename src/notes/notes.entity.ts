import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';


@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.notes, { eager: false }) // Ensure eager loading is false
    user: User;

    @Column()
    userId: number; // Ensure userId is explicitly stored
}
