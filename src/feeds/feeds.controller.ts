import { Controller, Get, Query } from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Get()
  async findAll(@Query('page') page: number) {
    return this.feedsService.find(page);
  }
}
