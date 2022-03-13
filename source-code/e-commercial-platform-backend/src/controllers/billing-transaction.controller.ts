import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Billing,
  Transaction,
} from '../models';
import {BillingRepository} from '../repositories';

export class BillingTransactionController {
  constructor(
    @repository(BillingRepository) protected billingRepository: BillingRepository,
  ) { }

  @get('/billings/{id}/transactions', {
    responses: {
      '200': {
        description: 'Array of Billing has many Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    return this.billingRepository.transactions(id).find(filter);
  }

  @post('/billings/{id}/transactions', {
    responses: {
      '200': {
        description: 'Billing model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Billing.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransactionInBilling',
            exclude: ['id'],
            optional: ['billingId']
          }),
        },
      },
    }) transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    return this.billingRepository.transactions(id).create(transaction);
  }

  @patch('/billings/{id}/transactions', {
    responses: {
      '200': {
        description: 'Billing.Transaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Partial<Transaction>,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.billingRepository.transactions(id).patch(transaction, where);
  }

  @del('/billings/{id}/transactions', {
    responses: {
      '200': {
        description: 'Billing.Transaction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.billingRepository.transactions(id).delete(where);
  }
}
