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
  CartDetail,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductCartDetailController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Array of Product has many CartDetail',
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
    return this.productRepository.cartDetails(id).find(filter);
  }

  @post('/products/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(CartDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {
            title: 'NewCartDetailInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) cartDetail: Omit<CartDetail, 'id'>,
  ): Promise<CartDetail> {
    return this.productRepository.cartDetails(id).create(cartDetail);
  }

  @patch('/products/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Product.CartDetail PATCH success count',
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
    return this.productRepository.cartDetails(id).patch(cartDetail, where);
  }

  @del('/products/{id}/cart-details', {
    responses: {
      '200': {
        description: 'Product.CartDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CartDetail)) where?: Where<CartDetail>,
  ): Promise<Count> {
    return this.productRepository.cartDetails(id).delete(where);
  }
}
