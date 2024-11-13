import { Injectable } from '@nestjs/common';
import { Song } from './models/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  private readonly songs = [];
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) { }
  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return this.songRepository.save(song);
  }
  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }
  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
  update(id: number, songDTO: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, songDTO);
  }
  paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    // Adding query builder
    // If you need to add query builder you can add it here
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC'); // Or whatever you need to do

    return paginate<Song>(queryBuilder, options);
  }
}
