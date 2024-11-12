import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a song entity in the database
 */
@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly title: string;

    @Column('varchar', { array: true })
    readonly artists: string[];

    @Column({ type: 'date' })
    readonly releasedDate: Date;

    @Column({ type: 'time' })
    readonly duration: Date;

    @Column({ type: 'text' })
    readonly lyrics: string;
} 