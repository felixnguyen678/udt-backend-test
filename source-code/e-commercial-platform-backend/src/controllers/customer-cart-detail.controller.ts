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
  CartDetail,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCartDetailController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Array of Customer has many CartDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CartDetail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CartDetail>,
  ): Promise<CartDetail[]> {
    return this.customerRepository.cartDetails(id).find(filter);
  }

  @post('/customers/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(CartDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {
            title: 'NewCartDetailInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) cartDetail: Omit<CartDetail, 'id'>,
  ): Promise<CartDetail> {
    return this.customerRepository.cartDetails(id).create(cartDetail);
  }

  @patch('/customers/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Customer.CartDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {partial: true}),
        },
      },
    })
    cartDetail: Partial<CartDetail>,
    @param.query.object('where', getWhereSchemaFor(CartDetail)) where?: Where<CartDetail>,
  ): Promise<Count> {
    return this.customerRepository.cartDetails(id).patch(cartDetail, where);
  }

  @del('/customers/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Customer.CartDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CartDetail)) where?: Where<CartDetail>,
  ): Promise<Count> {
    return this.customerRepository.cartDetails(id).delete(where);
  }
}
