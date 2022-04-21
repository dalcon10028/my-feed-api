import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { TistoryFeed } from './interfaces/feed.interface';

@Injectable()
export class FeedsService implements OnModuleInit {
  private feeds: Parser.Item[];

  async onModuleInit() {
    const parser = new Parser();
    const { title, description, generator, link, items } =
      await parser.parseURL('https://dalconbox.tistory.com/rss');
    this.feeds = items.map((item: TistoryFeed) => ({
      channel: {
        name: title,
        description,
        generator,
        link,
      },
      title: item.title,
      author: item.creator,
      link: item.link,
      pubDate: item.pubDate,
      tags: item.categories,
      description: item.content
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/\n/gi, '')
        .replace(/\s\s\s/gi, '')
        .replace(/&nbsp;/gi, '')
        .trim()
        .slice(0, 300),
    }));
  }

  find(page = 1) {
    const offset = (page - 1) * 10;
    const limit = page * 10;
    return this.feeds.slice(offset, limit);
  }
}
