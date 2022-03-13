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
  Product,
} from '../models';
import {CartDetailRepository} from '../repositories';

export class CartDetailProductController {
  constructor(
    @repository(CartDetailRepository)
    public cartDetailRepository: CartDetailRepository,
  ) { }

  @get('/cart-details/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to CartDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof CartDetail.prototype.id,
  ): Promise<Product> {
    return this.cartDetailRepository.product(id);
  }
}
