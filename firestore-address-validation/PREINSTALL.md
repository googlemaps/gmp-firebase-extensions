
## How This Extension Works

This extension validates and standardizes addresses in your Firestore documents in real-time using the Google Maps Platform API.

On install, you will be asked to provide a Firestore collection. When documents are created or updated within that collection, a Cloud Function will trigger that calls Google Maps API to do the following:

* Check whether the value at the address field is valid or not, and store the result in the “addressValidity” field
* If the address is indeed valid, standardize the address field (field name is configurable).

For example, the following document:

```json
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

```json
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

Additionally, make sure that you've enabled the Google Maps Geocoding API for your project and obtained an API key.

Follow the instructions provided in the [Google Maps API documentation](https://developers.google.com/maps/documentation/geocoding/start) to set up your API key.

## Billing

To install an extension, your project must be on the Blaze (pay as you go) plan. You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:

* Google Maps Geocoding API
* Cloud Firestore
* Cloud Functions (Node.js 14+ runtime. See [FAQs](https://firebase.google.com/support/faq#extensions-pricing))
