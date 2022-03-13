import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Billing, BillingRelations, BillingDetail, Agency, Customer, Transaction} from '../models';
import {BillingDetailRepository} from './billing-detail.repository';
import {AgencyRepository} from './agency.repository';
import {CustomerRepository} from './customer.repository';
import {TransactionRepository} from './transaction.repository';

export class BillingRepository extends DefaultCrudRepository<
  Billing,
  typeof Billing.prototype.id,
  BillingRelations
> {

  public readonly billingDetails: HasManyRepositoryFactory<BillingDetail, typeof Billing.prototype.id>;

  public readonly agency: BelongsToAccessor<Agency, typeof Billing.prototype.id>;

  public readonly customer: BelongsToAccessor<Customer, typeof Billing.prototype.id>;

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Billing.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('BillingDetailRepository') protected billingDetailRepositoryGetter: Getter<BillingDetailRepository>, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Billing, dataSource);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.agency = this.createBelongsToAccessorFor('agency', agencyRepositoryGetter,);
    this.registerInclusionResolver('agency', this.agency.inclusionResolver);
    this.billingDetails = this.createHasManyRepositoryFactoryFor('billingDetails', billingDetailRepositoryGetter,);
    this.registerInclusionResolver('billingDetails', this.billingDetails.inclusionResolver);
  }
}
