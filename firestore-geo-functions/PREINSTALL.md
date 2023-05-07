## How This Extension Works

Use this extension to perform geocoding operations on Firestore documents using the Google Maps API. This extension can help you:

* Automatically deduce the latitude and longitude of an address
* Figure out the best driving time between two addresses

The extension listens to specified fields in documents within a Firestore collection and updates the latitude, longitude, and best driving time fields as needed.

On install, you will be asked to provide a Firestore collection. When documents are created or updated within that collection, a Cloud Function will trigger that calls Google Maps API to execute a geocoding operation.

### Automatically retrieves latitude and longitude for an address

This feature will geocode an address when a valid address has been added/updated in a document.

```javascript
admin.firestore().collection('address_book').add({
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
});
```

## Calculates the best driving time between two addresses

This extension will calculate bestDrivingTime information based on the provided origin and destination addresses.

```javascript
admin.firestore().collection('address_book').add({
  origin: '1600 Amphitheatre Parkway, Mountain View, CA',
  destination: '85 10th Ave, New York, NY' 
});
```

## Implements Google Maps Platform Best Practices

According to Google Maps Platform [ToS](https://cloud.google.com/maps-platform/terms/maps-service-terms), geocode information cannot be stored for longer than 30 days. Whenever geocode information is retrieved for a Firestore document, a scheduled Cloud Task is created which will re-query the geocode information after 30 days.

Whenever there are intermittent issues with the Google Maps API, this extension implements automatic retries using an exponential backoff strategy as recommended [here](https://developers.google.com/maps/documentation/routes/web-service-best-practices#exponential-backoff).

## Additional setup

Before installing this extension, make sure that you've set up a [Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project. A valid Google Maps API key is required as part of the extension installation process.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan.

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:

* Cloud Google Maps API
* Cloud Firestore
* Cloud Functions (Node.js 14+ runtime. See [FAQs](https://firebase.google.com/support/faq#extensions-pricing))
