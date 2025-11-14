import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('restaurants')
@UseFilters(HttpExceptionFilter)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create() {
    return this.restaurantsService.create();
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.restaurantsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
