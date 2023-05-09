## How This Extension Works

Use this extension to:
* Retrieve the latitude and longitude for an address in a Firestore document.
* Estimate the best driving time between two addresses in a Firestore document.

On install, you will be asked to provide a target Firestore collection. When the configured fields are added to or updated in a document from the collection, a Cloud Function is triggered that updates the `latitude`, `longitude`, and `best driving time` fields as needed.

This extenion uses the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) and [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) from Google Maps Platform.

### Retrive latitude and longitude for an address

The extension will geocode (retrive latitude and longitude) an address when a valid address has been added/updated in a document from the target collection. 

For example, if we configure the extension to listen to the `address_book` collection, we can use the code snippet below to create a new document with an `address` field set to `1600 Amphitheatre Parkway, Mountain View, CA`. This will trigger the extension to add `latitude` and `longitude` fields to the document that map to the address.

```javascript
admin.firestore().collection('address_book').add({
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
});
```

### Estimate the best driving time between two addresses

The extension estimate best dirivng time between two addresses when an origin and destination are added/updated in a document from the target collection.

For example, if we configure the extension to listen to the `address_book` collection - the document created from the code snippet below will trigger the extension to add an estimate for `bestDrivingTime` between the `origin` and `destination` address to the document.

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

Before installing this extension, you need to do the following in your project:
* [Upgrade to the Blaze pricing plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan). Blaze plan is required to install any extension.
* [Set up Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) or use an existing one.
* [Create a Firestore collection](https://firebase.google.com/docs/firestore/quickstart#add_data) for documents with address data or use an existing one. The extension will ask for a collection path during install.
* [Enable the Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Enable the Distance Matrix API](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*17pcy1v*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzU5Njk5NS40LjEuMTY4MzU5NzE4Ny4wLjAuMA..).
* [Obtain a Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* [Geocoding API pricing](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* [Distance Matrix API pricing](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* [Cloud Functions (1st gen) pricing](https://firebase.google.com/functions/pricing)
* [Cloud Firestore pricing](https://firebase.google.com/docs/firestore/pricing)
