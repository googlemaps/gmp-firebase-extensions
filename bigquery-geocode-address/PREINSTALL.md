## How This Extension Works

Use this extension to perform the following operations in a BigQuery table:
* Retrieve the latitude and longitude for stored addresses.
* Estimate the best driving time between two stored addresses.

This extension deploys two [BigQuery Remote Functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/remote-functions) to your BigQuery instance that can be used directly in your BigQuery queries.

These remote functions use the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) and [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) from Google Maps Platform.

### Retrieve latitude and longitude for an address

Given an address, this function returns the latitude and longitude as a JSON string.

```sql
latLong(address: STRING)
```

### Estimate the best driving time between two addresses

Given an origin and destination address, this functions returns the driving time in seconds as a JSON string.

```sql
drivingTime(origin: STRING, destination: STRING)
```

## Before installing

To use this extension, your Firebase project must:
* A BigQuery instance to install the extension into
* A BigQuery dataset with addresses
* Be on the [Blaze pay-as-you-go pricing plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan). The Blaze plan is required to install any extension.


Additionally, take the following actions in your Firebase project before installing the extension:
* [Enable the Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Enable the Distance Matrix API](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Obtain a Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan.

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* Geocoding API - [see billing details](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* Distance Matrix API - [see billing details ](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* BigQuery - [see billing details](https://cloud.google.com/bigquery/pricing#bigquery-pricing)
* Cloud Functions for Firebase (1st gen) - [see billing details](https://firebase.google.com/functions/pricing)