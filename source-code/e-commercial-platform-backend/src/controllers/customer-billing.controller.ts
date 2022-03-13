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
  Customer,
  Billing,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerBillingController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/billings', {
    responses: {
      '200': {
        description: 'Array of Customer has many Billing',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Billing)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Billing>,
  ): Promise<Billing[]> {
    return this.customerRepository.billings(id).find(filter);
  }

  @post('/customers/{id}/billings', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Billing)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Billing, {
            title: 'NewBillingInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) billing: Omit<Billing, 'id'>,
  ): Promise<Billing> {
    return this.customerRepository.billings(id).create(billing);
  }

  @patch('/customers/{id}/billings', {
    responses: {
      '200': {
        description: 'Customer.Billing PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Billing, {partial: true}),
        },
      },
    })
    billing: Partial<Billing>,
    @param.query.object('where', getWhereSchemaFor(Billing)) where?: Where<Billing>,
  ): Promise<Count> {
    return this.customerRepository.billings(id).patch(billing, where);
  }

  @del('/customers/{id}/billings', {
    responses: {
      '200': {
        description: 'Customer.Billing DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Billing)) where?: Where<Billing>,
  ): Promise<Count> {
    return this.customerRepository.billings(id).delete(where);
  }
}
