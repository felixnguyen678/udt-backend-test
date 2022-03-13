import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {BillingDetail} from './billing-detail.model';
import {Agency} from './agency.model';
import {Customer} from './customer.model';
import {Transaction} from './transaction.model';

@model()
export class Billing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
  })
  totalAmount: number;

  @property({
    type: 'number',
  })
  totalCost?: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @hasMany(() => BillingDetail)
  billingDetails: BillingDetail[];

  @belongsTo(() => Agency)
  agencyId: string;

  @belongsTo(() => Customer)
  customerId: string;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
