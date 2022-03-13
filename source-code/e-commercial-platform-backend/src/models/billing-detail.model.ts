import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Billing} from './billing.model';

@model()
export class BillingDetail extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  amount: number;

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

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => Billing, {name: 'billing'})
  blillingId: string;

  @property({
    type: 'string',
  })
  billingId?: string;

  constructor(data?: Partial<BillingDetail>) {
    super(data);
  }
}

export interface BillingDetailRelations {
  // describe navigational properties here
}

export type BillingDetailWithRelations = BillingDetail & BillingDetailRelations;
