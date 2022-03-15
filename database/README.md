# UDT Backend test

## Selected Database: MongoDB


Select **MongoDB** as the database to deploy the system

Strengths of MongoDB:
- Has a syntax quite similar to Javascript language and represents data as JSON, so it is quite easy to get used to.
- Has high flexibility because it is schemaless database.
- Setup is simpler and faster than other types of RDBMS because it does not contain many constraints

=> Esier for development.
- Super fast reading speed because it is a document-stored database (High Availability).
- There is a sharding mechanism that separates data into many clusters to distribute the load on each database server.
- There is a replication mechanism to query from any location and also support load for the database server.

=> Suitable for platform with large amounts of data, when the platform is used by more and more people.\
=> Customers often use E-commerce platform to view a lot of products before deciding to buy one, Mongodb exhibits high availability as I said before will bring to customer extremely high reading speed.

Weaknesses of MongoDB:
- Consumes a lot of storage space because of high availability, typically a replication mechanism.
- Low consistency because there are no constraints and relationships between documents.
