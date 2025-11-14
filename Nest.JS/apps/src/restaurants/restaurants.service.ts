import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.create({
      data: createRestaurantDto,
    });

    return restaurant;
  }

  async findAll() {
    const restaurants = this.prisma.restaurant.findMany();
    return restaurants;
  }

  async findOne(id: number) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });

    if (!restaurant)
      throw new NotFoundError(`Restaurant with id ${id} not Found!`);

    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    await this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.restaurant.delete({
      where: {
        id,
      },
    });
  }
}
