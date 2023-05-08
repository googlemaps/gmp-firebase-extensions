# Geocode Address in Firestore

**Author**: Google Maps Platform (**[https://mapsplatform.google.com](https://mapsplatform.google.com)**)

**Description**: Geocodes addresses in Firestore and finds the best route between two addresses using the Geocoding and Distance Matrix APIs by Google Maps Platform.



**Details**: Use this extension to perform geocoding operations on Firestore documents using the Geocoding API and travel time estimates using the Distance Matrix API. This extension can help you:

* Automatically deduce the latitude and longitude of an address
* Figure out the best driving time between two addresses

The extension listens to specified fields in documents within a Firestore collection and updates the `latitude`, `longitude`, and `best driving time` fields as needed.

On install, you will be asked to provide a Firestore collection. When documents are created or updated within that collection, a Cloud Function will trigger that calls Geocoding API to execute a geocoding operation.

### Automatically retrieves latitude and longitude for an address

This feature will geocode an address when a valid address has been added/updated in a document.

```javascript
admin.firestore().collection('address_book').add({
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
});
```

### If an origin and destination are provided to the collection, the extension calls the Distance Matrix API to calculate the best driving time between two addresses

This extension will calculate bestDrivingTime information based on the provided origin and destination addresses.

```javascript
admin.firestore().collection('address_book').add({
  origin: '1600 Amphitheatre Parkway, Mountain View, CA',
  destination: '85 10th Ave, New York, NY' 
});
```

### Implements Google Maps Platform Best Practices

According to Google Maps Platform [Terms of Service](https://cloud.google.com/maps-platform/terms/maps-service-terms), geocode information cannot be stored for longer than 30 days. Whenever geocode information is retrieved for a Firestore document, a scheduled Cloud Task is created which will re-query the geocode information after 30 days.

Whenever there are intermittent issues with the Google Maps Platform APIs, this extension implements automatic retries using an exponential backoff strategy as recommended [here](https://developers.google.com/maps/documentation/routes/web-service-best-practices#exponential-backoff).

## Additional setup

Before installing this extension, make sure that you've set up a [Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project. 

Additionally, make sure that you've enabled the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/cloud-setup) and [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/cloud-setup#enabling-apis) for your project and obtained an [API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You will be asked to provide this API key during installation.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan.

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:

* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing)
* Cloud Firestore
* Cloud Functions (Node.js 14+ runtime. See [FAQs](https://firebase.google.com/support/faq#extensions-pricing))




**Configuration Parameters:**

* Collection ID: The ID of the collection where the extension will listen for writes.

* Maps API key: The key to use for the Maps API. You can get a key from the [Google Cloud](https://console.cloud.google.com/google/maps-apis/overview).

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).



**Cloud Functions:**

* **updateLatLong:** Update the longitue and latitude.

* **writeLatLong:** Listen for writes of addresses to a collection and writes back the latitude and longitude of that address to the same collection.

* **writeBestDrivingTime:** Listen for writes of addresses to a collection and writes back the best driving time in seconds.



**APIs Used**:

* geocoding-backend.googleapis.com (Reason: Allows the extension to get information such as latiutude and longitue from addresses)

* distance-matrix-backend.googleapis.com (Reason: Allows the extension to calculate driving times between two addresses)



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows the extension to read and write to Cloud Firestore.)
