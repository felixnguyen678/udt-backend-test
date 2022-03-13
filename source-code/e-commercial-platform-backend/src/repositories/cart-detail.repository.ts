import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CartDetail, CartDetailRelations, Customer, Product} from '../models';
import {CustomerRepository} from './customer.repository';
import {ProductRepository} from './product.repository';

export class CartDetailRepository extends DefaultCrudRepository<
  CartDetail,
  typeof CartDetail.prototype.id,
  CartDetailRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof CartDetail.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof CartDetail.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(CartDetail, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
