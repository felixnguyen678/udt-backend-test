import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {BillingDetail, BillingDetailRelations, Product, Billing} from '../models';
import {ProductRepository} from './product.repository';
import {BillingRepository} from './billing.repository';

export class BillingDetailRepository extends DefaultCrudRepository<
  BillingDetail,
  typeof BillingDetail.prototype.id,
  BillingDetailRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof BillingDetail.prototype.id>;

  public readonly billing: BelongsToAccessor<Billing, typeof BillingDetail.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('BillingRepository') protected billingRepositoryGetter: Getter<BillingRepository>,
  ) {
    super(BillingDetail, dataSource);
    this.billing = this.createBelongsToAccessorFor('billing', billingRepositoryGetter,);
    this.registerInclusionResolver('billing', this.billing.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
