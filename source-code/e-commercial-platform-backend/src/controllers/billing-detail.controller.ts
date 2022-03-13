import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {BillingDetail} from '../models';
import {BillingDetailRepository} from '../repositories';

export class BillingDetailController {
  constructor(
    @repository(BillingDetailRepository)
    public billingDetailRepository : BillingDetailRepository,
  ) {}

  @post('/billing-details')
  @response(200, {
    description: 'BillingDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(BillingDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {
            title: 'NewBillingDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    billingDetail: Omit<BillingDetail, 'id'>,
  ): Promise<BillingDetail> {
    return this.billingDetailRepository.create(billingDetail);
  }

  @get('/billing-details/count')
  @response(200, {
    description: 'BillingDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BillingDetail) where?: Where<BillingDetail>,
  ): Promise<Count> {
    return this.billingDetailRepository.count(where);
  }

  @get('/billing-details')
  @response(200, {
    description: 'Array of BillingDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BillingDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BillingDetail) filter?: Filter<BillingDetail>,
  ): Promise<BillingDetail[]> {
    return this.billingDetailRepository.find(filter);
  }

  @patch('/billing-details')
  @response(200, {
    description: 'BillingDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {partial: true}),
        },
      },
    })
    billingDetail: BillingDetail,
    @param.where(BillingDetail) where?: Where<BillingDetail>,
  ): Promise<Count> {
    return this.billingDetailRepository.updateAll(billingDetail, where);
  }

  @get('/billing-details/{id}')
  @response(200, {
    description: 'BillingDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BillingDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BillingDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<BillingDetail>
  ): Promise<BillingDetail> {
    return this.billingDetailRepository.findById(id, filter);
  }

  @patch('/billing-details/{id}')
  @response(204, {
    description: 'BillingDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {partial: true}),
        },
      },
    })
    billingDetail: BillingDetail,
  ): Promise<void> {
    await this.billingDetailRepository.updateById(id, billingDetail);
  }

  @put('/billing-details/{id}')
  @response(204, {
    description: 'BillingDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() billingDetail: BillingDetail,
  ): Promise<void> {
    await this.billingDetailRepository.replaceById(id, billingDetail);
  }

  @del('/billing-details/{id}')
  @response(204, {
    description: 'BillingDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.billingDetailRepository.deleteById(id);
  }
}
