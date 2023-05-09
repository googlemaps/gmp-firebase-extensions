## How This Extension Works

Use this extension to:
* Retrieve and write the latitude and longitude for an address in a Firestore document.
* Estimate and write the best driving time between two addresses in a Firestore document.

The extension listens to specified fields in documents within a Firestore collection and updates the `latitude`, `longitude`, and `best driving time` fields as needed.

On install, you will be asked to provide a Firestore collection. When documents are created or updated within the collection, a Cloud Function is triggered that performs the operation using the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) and [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) from Google Maps Platform.

### Retrive latitude and longitude for an address

This feature will geocode an address when a valid address has been added/updated in a document from the specified collection.

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

## Additional setup

Before installing this extension, take the following actions in your Firebase project:
* Enable the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).
* Have or set up a [Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart).
* Enable the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/cloud-setup).
* Enable the [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/cloud-setup#enabling-apis).
* Obtain a [Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* Geocoding API - see [billing details](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* Distance Matrix API - see [billing details](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* Cloud Firestore - see [billing details](https://firebase.google.com/docs/firestore/pricing)
* Cloud Functions - see [billing details](https://cloud.google.com/functions/pricing)
