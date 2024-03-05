# JSNote
A notes app written in JS with Node and the Fastify framework. Used for learning.

# Database config

The database is currently set up using a development version of Cloudspanner within GCP. This database is
also used for any integration tests.

To recreate the tables if need be, navigate to the route folder and execute the following commands:

Create an instance:

```shell
gcloud spanner instances create test-instance --config=regional-us-central1 \
    --description="Test Instance" --nodes=1
```

Create a database and schema:

```shell
node schema.js createDatabase test-instance example-db starlit-surge-416209
```

You can then populate it using SQL commands or by calling the REST API
