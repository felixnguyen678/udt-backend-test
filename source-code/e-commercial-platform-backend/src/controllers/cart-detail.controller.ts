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
import {CartDetail} from '../models';
import {CartDetailRepository} from '../repositories';

export class CartDetailController {
  constructor(
    @repository(CartDetailRepository)
    public cartDetailRepository : CartDetailRepository,
  ) {}

  @post('/cart-details')
  @response(200, {
    description: 'CartDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(CartDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {
            title: 'NewCartDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    cartDetail: Omit<CartDetail, 'id'>,
  ): Promise<CartDetail> {
    return this.cartDetailRepository.create(cartDetail);
  }

  @get('/cart-details/count')
  @response(200, {
    description: 'CartDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CartDetail) where?: Where<CartDetail>,
  ): Promise<Count> {
    return this.cartDetailRepository.count(where);
  }

  @get('/cart-details')
  @response(200, {
    description: 'Array of CartDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CartDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CartDetail) filter?: Filter<CartDetail>,
  ): Promise<CartDetail[]> {
    return this.cartDetailRepository.find(filter);
  }

  @patch('/cart-details')
  @response(200, {
    description: 'CartDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {partial: true}),
        },
      },
    })
    cartDetail: CartDetail,
    @param.where(CartDetail) where?: Where<CartDetail>,
  ): Promise<Count> {
    return this.cartDetailRepository.updateAll(cartDetail, where);
  }

  @get('/cart-details/{id}')
  @response(200, {
    description: 'CartDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CartDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CartDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<CartDetail>
  ): Promise<CartDetail> {
    return this.cartDetailRepository.findById(id, filter);
  }

  @patch('/cart-details/{id}')
  @response(204, {
    description: 'CartDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartDetail, {partial: true}),
        },
      },
    })
    cartDetail: CartDetail,
  ): Promise<void> {
    await this.cartDetailRepository.updateById(id, cartDetail);
  }

  @put('/cart-details/{id}')
  @response(204, {
    description: 'CartDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cartDetail: CartDetail,
  ): Promise<void> {
    await this.cartDetailRepository.replaceById(id, cartDetail);
  }

  @del('/cart-details/{id}')
  @response(204, {
    description: 'CartDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartDetailRepository.deleteById(id);
  }
}
