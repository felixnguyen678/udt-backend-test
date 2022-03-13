import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BillingDetail,
  Product,
} from '../models';
import {BillingDetailRepository} from '../repositories';

export class BillingDetailProductController {
  constructor(
    @repository(BillingDetailRepository)
    public billingDetailRepository: BillingDetailRepository,
  ) { }

  @get('/billing-details/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to BillingDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof BillingDetail.prototype.id,
  ): Promise<Product> {
    return this.billingDetailRepository.product(id);
  }
}
