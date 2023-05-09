# Geocode Address in BigQuery

**Author**: Google Maps Platform (**[https://mapsplatform.google.com](https://mapsplatform.google.com)**)

**Description**: Enables running geocoding functions directly in BigQuery queries using Geocoding API by Google Maps Platform.



**Details**: Use this extension to:
* Retrieve the latitude and longitude for address stored in a BigQuery table.
* Estimate the best driving time between two address stored in a BigQuery table.

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

Before installing this extension, you need to do the following in your project:
* [Upgrade to the Blaze pricing plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan). Blaze plan is required to install any extension.
* [Set up a new BigQuery instance](https://cloud.google.com/bigquery/docs/introduction#get-started-with-bigquery) or use an existing one.
* [Create a BigQuery dataset](https://cloud.google.com/bigquery/docs/datasets) with address data or use an existing one.
* [Enable the Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Enable the Distance Matrix API](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Obtain a Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan.

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* [Geocoding API pricing](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* [Distance Matrix API pricing](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* [Cloud Functions (1st gen) pricing](https://firebase.google.com/functions/pricing)
* [BigQuery pricing](https://cloud.google.com/bigquery/pricing#bigquery-pricing)




**Configuration Parameters:**

* BigQuery Dataset ID: The ID of the dataset where the extension will create a connection.

* Maps API key: The key to use for the Maps API. You can get a key from the [Google Cloud](https://console.cloud.google.com/google/maps-apis/overview).

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).



**Cloud Functions:**

* **createBigQueryConnection:** Creates a BigQuery connection and creates BigQuery Remote Functions using the connection.

* **getLatLong:** Remote Function to retrieve latitude and longitude of a given address.

* **getDrivingTime:** Remote Function to calculate the driving time between two addresses.



**APIs Used**:

* bigquery.googleapis.com (Reason: Powers all BigQuery tasks performed by the extension)

* bigqueryconnection.googleapis.com (Reason: Allows the extension to create a BigQuery connection)

* geocoding-backend.googleapis.com (Reason: Allows the extension to get information such as latiutude and longitue from addresses)

* distance-matrix-backend.googleapis.com (Reason: Allows the extension to calculate driving times between two addresses)



**Access Required**:



This extension will operate with the following project IAM roles:

* bigquery.jobUser (Reason: Allows the extension to create BigQuery jobs)

* bigquery.dataOwner (Reason: Allows the extension to create BigQuery routines)

* bigquery.connectionAdmin (Reason: Allows the extension to create a BigQuery connection)
