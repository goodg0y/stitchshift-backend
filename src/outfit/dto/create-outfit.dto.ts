import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CUTTING, KATEGORI, TIER, VIBE } from '../outfit.constants';

export class ItemOutfitDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama item tidak boleh kosong' })
  nama: string;

  @IsString()
  @IsNotEmpty({ message: 'Platform item tidak boleh kosong' })
  platform: string;

  @IsOptional()
  @IsBoolean()
  dimiliki?: boolean;
}

export class CreateOutfitDto {
  @IsString()
  @MinLength(3, { message: 'Nama outfit minimal 3 karakter' })
  @MaxLength(60, { message: 'Nama outfit maksimal 60 karakter' })
  nama: string;

  @IsIn(VIBE, { message: `vibe harus salah satu dari: ${VIBE.join(', ')}` })
  vibe: string;

  @IsIn(KATEGORI, { message: `kategori harus salah satu dari: ${KATEGORI.join(', ')}` })
  kategori: string;

  @IsIn(CUTTING, { message: `cutting harus salah satu dari: ${CUTTING.join(', ')}` })
  cutting: string;

  @IsIn(TIER, { message: `tier harus salah satu dari: ${TIER.join(', ')}` })
  tier: string;

  @IsOptional()
  @IsString()
  gambar?: string;

  @IsOptional()
  @IsDateString({}, { message: 'targetBeli harus berformat tanggal, contoh 2026-12-31' })
  targetBeli?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Minimal ada satu item dalam outfit' })
  @ValidateNested({ each: true })
  @Type(() => ItemOutfitDto)
  items: ItemOutfitDto[];
}
