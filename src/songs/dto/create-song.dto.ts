import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new song
 */
export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly artists: string[];

    @IsDate()
    @IsNotEmpty()
    readonly releasedDate: Date;

    @IsDate()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics?: string;
} 