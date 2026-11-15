import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';

@Controller('outfit')
export class OutfitController {
  // Dependency injection: Nest yang membuat dan menyuntikkan OutfitService
  constructor(private readonly outfitService: OutfitService) {}

  @Post()
  create(@Body() createOutfitDto: CreateOutfitDto) {
    return this.outfitService.create(createOutfitDto);
  }

  @Get()
  findAll() {
    return this.outfitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.outfitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOutfitDto: UpdateOutfitDto,
  ) {
    return this.outfitService.update(id, updateOutfitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.outfitService.remove(id);
  }
}
