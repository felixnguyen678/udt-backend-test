import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Billing} from './billing.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @belongsTo(() => Billing)
  billingId: string;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
