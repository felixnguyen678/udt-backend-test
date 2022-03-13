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
  Product,
  BillingDetail,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductBillingDetailController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Array of Product has many BillingDetail',
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
    return this.productRepository.billingDetails(id).find(filter);
  }

  @post('/products/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(BillingDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillingDetail, {
            title: 'NewBillingDetailInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) billingDetail: Omit<BillingDetail, 'id'>,
  ): Promise<BillingDetail> {
    return this.productRepository.billingDetails(id).create(billingDetail);
  }

  @patch('/products/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Product.BillingDetail PATCH success count',
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
    return this.productRepository.billingDetails(id).patch(billingDetail, where);
  }

  @del('/products/{id}/billing-details', {
    responses: {
      '200': {
        description: 'Product.BillingDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BillingDetail)) where?: Where<BillingDetail>,
  ): Promise<Count> {
    return this.productRepository.billingDetails(id).delete(where);
  }
}
