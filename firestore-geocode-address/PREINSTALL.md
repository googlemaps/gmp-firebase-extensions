## How This Extension Works

Use this extension to:
* Retrieve the latitude and longitude for an address in a Firestore document.
* Estimate the best driving time between two addresses in a Firestore document.

On install, you will be asked to provide a target Firestore collection. When the configured fields are added to or updated in a document from the collection, a Cloud Function is triggered that updates the `latitude`, `longitude`, and `best driving time` fields as needed.

This extenion uses the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) and [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) from Google Maps Platform.

### Retrive latitude and longitude for an address

This feature will geocode (retrive latitude and longitude) an address when a valid address has been added/updated in a document from the specified collection. 

When a document in the target collection is created or updated with a 

For example, if we configure the extension to listen to the `address_book` collection, we can use the code snippet below to create a new document with an `address` field set to `1600 Amphitheatre Parkway, Mountain View, CA`. This will trigger the extension to add `latitude` and `longitude` fields to the document that map to the address.

```javascript
admin.firestore().collection('address_book').add({
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
});
```

### Estimate the best driving time between two addresses

If an origin and destination are provided to the collection, the extension calls the Distance Matrix API to calculate the best driving time between two addresses.

This extension will estimate bestDrivingTime information based on the provided origin and destination addresses.

```javascript
admin.firestore().collection('address_book').add({
  origin: '1600 Amphitheatre Parkway, Mountain View, CA',
  destination: '85 10th Ave, New York, NY' 
});
```

### Implements Google Maps Platform best practices

According to Google Maps Platform [Terms of Service](https://cloud.google.com/maps-platform/terms/maps-service-terms), geocode information cannot be stored for longer than 30 days. Whenever geocode information is retrieved for a Firestore document, a scheduled Cloud Task is created which will re-query the geocode information after 30 days.

Whenever there are intermittent issues with the Google Maps Platform APIs, this extension implements automatic retries using an exponential backoff strategy as recommended [here](https://developers.google.com/maps/documentation/routes/web-service-best-practices#exponential-backoff).

## Before installing

To use this extension, your Firebase project must:
* Have a Cloud Firestore database with a collection for documents with the configured address fields.
* Be on the [Blaze pay-as-you-go pricing plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan). The Blaze plan is required to install any extension.

Additionally, take the following actions in your Firebase project before installing the extension:
* [Enable the Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Enable the Distance Matrix API](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Obtain a Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* Geocoding API - see [billing details](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* Distance Matrix API - see [billing details](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* Cloud Firestore - see [billing details](https://firebase.google.com/docs/firestore/pricing)
* Cloud Functions - see [billing details](https://cloud.google.com/functions/pricing)
