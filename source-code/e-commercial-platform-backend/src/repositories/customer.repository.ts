import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Customer, CustomerRelations, CartDetail, Billing} from '../models';
import {CartDetailRepository} from './cart-detail.repository';
import {BillingRepository} from './billing.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly cartDetails: HasManyRepositoryFactory<CartDetail, typeof Customer.prototype.id>;

  public readonly billings: HasManyRepositoryFactory<Billing, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('CartDetailRepository') protected cartDetailRepositoryGetter: Getter<CartDetailRepository>, @repository.getter('BillingRepository') protected billingRepositoryGetter: Getter<BillingRepository>,
  ) {
    super(Customer, dataSource);
    this.billings = this.createHasManyRepositoryFactoryFor('billings', billingRepositoryGetter,);
    this.registerInclusionResolver('billings', this.billings.inclusionResolver);
    this.cartDetails = this.createHasManyRepositoryFactoryFor('cartDetails', cartDetailRepositoryGetter,);
    this.registerInclusionResolver('cartDetails', this.cartDetails.inclusionResolver);
  }
}
