## How This Extension Works

Use this extension to fetch latitude and longitude for an address or calculate driving time between two addresses within your BigQuery queries using a familiar SQL syntax. You can easily query the latitude and longitude of addresses stored inside a BigQuery table, or query the best driving time between two addresses.

When installed, this extension deploys and adds two BigQuery Remote Functions to your BigQuery instance. These are Cloud Functions that call the Geocoding API and the Distance Matrix API, and can be used directly in your BigQuery queries. Sample queries will be provided after install to help you understand the syntax.

### Retrieve latitude and longitude for an address

```sql
latLong(address: STRING): Given an address, returns the latitude and longitude as a JSON string.
```

### Calculate the best driving time between two addresses

```sql
drivingTime(origin: STRING, destination: STRING): Given an origin and destination address, returns the driving time in seconds as a JSON string.
```

## Additional setup

Before installing this extension, take the following actions in your Firebase project:
* Enable the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).
* Set up a [BigQuery instance](https://cloud.google.com/bigquery/docs/introduction) if you do not already have one.
* Find or create a [BigQuery dataset](https://cloud.google.com/bigquery/docs/datasets-intro) if you do not already have one. You will provide the dataset ID during the extension installation.
* Enable the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/cloud-setup).
* Enable the [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/cloud-setup#enabling-apis).
* Obtain a [Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* Geocoding API - see [billing details](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* Distance Matrix API - see [billing details](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* BigQuery - see [billing details](https://cloud.google.com/bigquery/pricing#bigquery-pricing)
* Cloud Functions - see [billing details](https://cloud.google.com/functions/pricing)