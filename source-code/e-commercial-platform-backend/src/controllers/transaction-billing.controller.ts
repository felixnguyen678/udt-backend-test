import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaction,
  Billing,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionBillingController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/billing', {
    responses: {
      '200': {
        description: 'Billing belonging to Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Billing)},
          },
        },
      },
    },
  })
  async getBilling(
    @param.path.string('id') id: typeof Transaction.prototype.id,
  ): Promise<Billing> {
    return this.transactionRepository.billing(id);
  }
}
