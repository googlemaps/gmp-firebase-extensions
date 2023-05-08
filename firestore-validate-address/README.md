# Validate Address in Firestore

**Author**: Google Maps Platform (**[https://mapsplatform.google.com](https://mapsplatform.google.com)**)

**Description**: Validates addresses in Firestore using the Address Validation API by Google Maps Platform.



**Details**: 
## How This Extension Works

This extension validates and standardizes addresses in your Firestore documents in real-time using the Google Maps Platform API.

On install, you will be asked to provide a Firestore collection. When documents are created or updated within that collection, a Cloud Function will trigger that calls Google Maps API to do the following:

* Check whether the value at the address field is valid or not, and store the result in the “addressValidity” field
* If the address is indeed valid, standardize the address field (field name is configurable).

For example, the following document:

```
{
    …,
    address: {
        addressLines: ["1600 Amphitheatre Parkway"],
        regionCode: "US",
        locality: "Mountain View",
    }
}
```

Will be transformed to the following document:

```
{
    …,
    address: {
        line1: "1600 Amphitheatre Parkway",
        city: "Mountain View",
        region: "CA",
        postalCode: "94043",
        country: "US"
    },
    addressValidity: true
}
```

## Additional Setup

Before installing this extension, make sure that you've set up a [Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

Additionally, make sure that you've enabled the [Address Validation API](https://developers.google.com/maps/documentation/address-validation/cloud-setup) for your project and obtained an API key. You will be asked to provide this API key during installation.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan. You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:

* [Address Validation API](https://developers.google.com/maps/documentation/address-validation/usage-and-billing)
* Cloud Firestore
* Cloud Functions (Node.js 14+ runtime. See [FAQs](https://firebase.google.com/support/faq#extensions-pricing))




**Configuration Parameters:**

* Addresses Collection: Firestore collection in which addresses are stored.

* Google Address Validation API Key: API key for the Google Address Validation API. You can create an API key in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).



**Cloud Functions:**

* **validateAddressTrigger:** Processes document changes in the specified Cloud Firestore collection, syncing them to custom claims in Firebase Auth users.

* **retryOnUnknownError:** Handles tasks from unknown address validation responses.



**APIs Used**:

* addressvalidation.googleapis.com (Reason: Allows the extension to validate addresses using the Address Validation API.)



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows the extension to write sync information back to Firestore.)
