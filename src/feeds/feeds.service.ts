import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { TistoryFeed } from './interfaces/feed.interface';

@Injectable()
export class FeedsService implements OnModuleInit {
  private feeds: Parser.Item[];

  async onModuleInit() {
    const parser = new Parser();
    const { items } = await parser.parseURL(
      'https://dalconbox.tistory.com/rss',
    );
    this.feeds = items;
  }

  find(page = 1) {
    const offset = (page - 1) * 10;
    const limit = page * 10;
    return this.feeds.slice(offset, limit);
  }
}
