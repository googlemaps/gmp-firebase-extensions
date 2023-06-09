## How This Extension Works

Use this extension to fetch latitude and longitude for an address or calculate driving time between two addresses within your BigQuery queries using a familiar SQL syntax. You can easily query the latitude and longitude of addresses stored inside a BigQuery table, or query the best driving time between two addresses.

When installed, this extension deploys and adds two BigQuery Remote Functions to your BigQuery instance. These are Cloud Functions that call the Google Maps API and can be used directly in your BigQuery queries. Sample queries will be provided after install to help you understand the syntax.

### Retrieve latitude and longitude for an address

```sql
latLong(address: STRING): Given an address, returns the latitude and longitude as a JSON string.
```

### Calculate the best driving time between two addresses

```sql
drivingTime(origin: STRING, destination: STRING): Given an origin and destination address, returns the driving time in seconds as a JSON string.
```

### Pre-requisites

* BigQuery dataset: You'll need a BigQuery dataset to use with the extension. You can either create a new dataset or use an existing one. Remember to provide the dataset ID during the extension installation.
* Google Maps API key: Enable the Google Maps API for your project and obtain an API key. Follow the instructions provided in the Google Maps documentation to set up your API key.

### Additional Setup

Before installing this extension, make sure that you've set up a BigQuery instance in your Google Cloud Platform project. A valid Google Maps API key is required as part of the extension installation process.

### Billing

To install an extension, your project must be on the Blaze (pay as you go) plan.

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service's no-cost tier:

* Cloud Google Maps API
* Cloud Functions (Node.js 14+ runtime. See [FAQs](https://firebase.google.com/support/faq#extensions-pricing))
