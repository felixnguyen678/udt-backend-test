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
  BillingDetail,
} from '../models';
import {BillingRepository} from '../repositories';

export class BillingBillingDetailController {
  constructor(
    @repository(BillingRepository) protected billingRepository: BillingRepository,
  ) { }

  @get('/billings/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Array of Billing has many BillingDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BillingDetail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BillingDetail>,
  ): Promise<BillingDetail[]> {
    return this.billingRepository.billingDetails(id).find(filter);
  }

  @post('/billings/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Billing model instance',
        content: {'application/json': {schema: getModelSchemaRef(BillingDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Billing.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {
            title: 'NewBillingDetailInBilling',
            exclude: ['id'],
            optional: ['billingId']
          }),
        },
      },
    }) billingDetail: Omit<BillingDetail, 'id'>,
  ): Promise<BillingDetail> {
    return this.billingRepository.billingDetails(id).create(billingDetail);
  }

  @patch('/billings/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Billing.BillingDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {partial: true}),
        },
      },
    })
    billingDetail: Partial<BillingDetail>,
    @param.query.object('where', getWhereSchemaFor(BillingDetail)) where?: Where<BillingDetail>,
  ): Promise<Count> {
    return this.billingRepository.billingDetails(id).patch(billingDetail, where);
  }

  @del('/billings/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Billing.BillingDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BillingDetail)) where?: Where<BillingDetail>,
  ): Promise<Count> {
    return this.billingRepository.billingDetails(id).delete(where);
  }
}
