import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './models/song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post()
  create(@Body() songDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(songDTO);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.paginate({
        page,
        limit,
      });
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,): Promise<Song> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() songDTO: UpdateSongDto) {
    return 'update';
    // return this.songsService.update(id, songDTO);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number,): Promise<void> {
    return this.songsService.remove(id);
  }
}
