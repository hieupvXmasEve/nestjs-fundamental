import { PartialType } from '@nestjs/swagger';
import { CreateSongDTO } from './create-song.dto';

export class UpdateSongDto extends PartialType(CreateSongDTO) { }