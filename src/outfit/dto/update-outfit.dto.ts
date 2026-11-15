import { PartialType } from '@nestjs/mapped-types';
import { CreateOutfitDto } from './create-outfit.dto';

// Semua field dari CreateOutfitDto menjadi opsional untuk PATCH
export class UpdateOutfitDto extends PartialType(CreateOutfitDto) {}
