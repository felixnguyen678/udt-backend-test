import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Product, ProductRelations, CartDetail, Agency, BillingDetail} from '../models';
import {CartDetailRepository} from './cart-detail.repository';
import {AgencyRepository} from './agency.repository';
import {BillingDetailRepository} from './billing-detail.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly cartDetails: HasManyRepositoryFactory<CartDetail, typeof Product.prototype.id>;

  public readonly agency: BelongsToAccessor<Agency, typeof Product.prototype.id>;

  public readonly billingDetails: HasManyRepositoryFactory<BillingDetail, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('CartDetailRepository') protected cartDetailRepositoryGetter: Getter<CartDetailRepository>, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>, @repository.getter('BillingDetailRepository') protected billingDetailRepositoryGetter: Getter<BillingDetailRepository>,
  ) {
    super(Product, dataSource);
    this.billingDetails = this.createHasManyRepositoryFactoryFor('billingDetails', billingDetailRepositoryGetter,);
    this.registerInclusionResolver('billingDetails', this.billingDetails.inclusionResolver);
    this.agency = this.createBelongsToAccessorFor('agency', agencyRepositoryGetter,);
    this.registerInclusionResolver('agency', this.agency.inclusionResolver);
    this.cartDetails = this.createHasManyRepositoryFactoryFor('cartDetails', cartDetailRepositoryGetter,);
    this.registerInclusionResolver('cartDetails', this.cartDetails.inclusionResolver);
  }
}
