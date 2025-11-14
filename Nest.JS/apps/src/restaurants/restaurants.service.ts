import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  create() {}

  findAll() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
