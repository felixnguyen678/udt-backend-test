import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Billing,
  Customer,
} from '../models';
import {BillingRepository} from '../repositories';

export class BillingCustomerController {
  constructor(
    @repository(BillingRepository)
    public billingRepository: BillingRepository,
  ) { }

  @get('/billings/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Billing',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('id') id: typeof Billing.prototype.id,
  ): Promise<Customer> {
    return this.billingRepository.customer(id);
  }
}
