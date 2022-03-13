import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';
import {Product} from './product.model';

@model()
export class CartDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: string;

  @belongsTo(() => Customer)
  customerId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<CartDetail>) {
    super(data);
  }
}

export interface CartDetailRelations {
  // describe navigational properties here
}

export type CartDetailWithRelations = CartDetail & CartDetailRelations;
