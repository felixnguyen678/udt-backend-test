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
  Agency,
  Billing,
} from '../models';
import {AgencyRepository} from '../repositories';

export class AgencyBillingController {
  constructor(
    @repository(AgencyRepository) protected agencyRepository: AgencyRepository,
  ) { }

  @get('/agencies/{id}/billings', {
    responses: {
      '200': {
        description: 'Array of Agency has many Billing',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Billing)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Billing>,
  ): Promise<Billing[]> {
    return this.agencyRepository.billings(id).find(filter);
  }

  @post('/agencies/{id}/billings', {
    responses: {
      '200': {
        description: 'Agency model instance',
        content: {'application/json': {schema: getModelSchemaRef(Billing)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agency.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Billing, {
            title: 'NewBillingInAgency',
            exclude: ['id'],
            optional: ['agencyId']
          }),
        },
      },
    }) billing: Omit<Billing, 'id'>,
  ): Promise<Billing> {
    return this.agencyRepository.billings(id).create(billing);
  }

  @patch('/agencies/{id}/billings', {
    responses: {
      '200': {
        description: 'Agency.Billing PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Billing, {partial: true}),
        },
      },
    })
    billing: Partial<Billing>,
    @param.query.object('where', getWhereSchemaFor(Billing)) where?: Where<Billing>,
  ): Promise<Count> {
    return this.agencyRepository.billings(id).patch(billing, where);
  }

  @del('/agencies/{id}/billings', {
    responses: {
      '200': {
        description: 'Agency.Billing DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Billing)) where?: Where<Billing>,
  ): Promise<Count> {
    return this.agencyRepository.billings(id).delete(where);
  }
}
