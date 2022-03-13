import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Transaction, TransactionRelations, Billing} from '../models';
import {BillingRepository} from './billing.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id,
  TransactionRelations
> {

  public readonly billing: BelongsToAccessor<Billing, typeof Transaction.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('BillingRepository') protected billingRepositoryGetter: Getter<BillingRepository>,
  ) {
    super(Transaction, dataSource);
    this.billing = this.createBelongsToAccessorFor('billing', billingRepositoryGetter,);
    this.registerInclusionResolver('billing', this.billing.inclusionResolver);
  }
}
