import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CartDetail,
  Customer,
} from '../models';
import {CartDetailRepository} from '../repositories';

export class CartDetailCustomerController {
  constructor(
    @repository(CartDetailRepository)
    public cartDetailRepository: CartDetailRepository,
  ) { }

  @get('/cart-details/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to CartDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('id') id: typeof CartDetail.prototype.id,
  ): Promise<Customer> {
    return this.cartDetailRepository.customer(id);
  }
}
