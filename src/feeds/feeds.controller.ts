import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedsService } from './feeds.service';

@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Get()
  async findAll(@Query('page') page: number) {
    return this.feedsService.find(page);
  }
}
