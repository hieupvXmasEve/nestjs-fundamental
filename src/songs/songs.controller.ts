import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(): string {
    return 'find one song';
  }

  @Post()
  create() {
    return this.songsService.create('Animals by Martin Garrix');
  }

  @Put(':id')
  update(): string {
    return 'update song';
  }

  @Delete(':id')
  delete(): string {
    return 'delete song';
  }
}
