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
  Billing,
} from '../models';
import {BillingDetailRepository} from '../repositories';

export class BillingDetailBillingController {
  constructor(
    @repository(BillingDetailRepository)
    public billingDetailRepository: BillingDetailRepository,
  ) { }

  @get('/billing-details/{id}/billing', {
    responses: {
      '200': {
        description: 'Billing belonging to BillingDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Billing)},
          },
        },
      },
    },
  })
  async getBilling(
    @param.path.string('id') id: typeof BillingDetail.prototype.id,
  ): Promise<Billing> {
    return this.billingDetailRepository.billing(id);
  }
}
