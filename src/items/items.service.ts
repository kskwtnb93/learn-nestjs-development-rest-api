import { ItemRepository } from './item.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    // const item: Item = {
    //   id: uuid(),
    //   ...createItemDto,
    //   status: ItemStatus.ON_SALE,
    // };
    // this.items.push(item);
    // return item;
    return await this.itemRepository.createItem(createItemDto);
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
