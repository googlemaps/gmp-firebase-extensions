This extension validates and standardizes addresses in your Firestore documents in real-time.

On install, you will be asked to provide a target Firestore collection. When documents are created or updated within that collection, a Cloud Function is trigged that calls the [Address Validation API](https://developers.google.com/maps/documentation/address-validation/overview) to do the following:

* Check whether the value at the address field is valid or not, and store the result in the `addressValidity` field.
* If the address is valid, standardize the address field (field name is configurable).

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

Will be transformed into the following document:

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

## Before installing

Before installing this extension, you must do the following in your Firebase project:
* [Upgrade to the Blaze pricing plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan). Blaze plan is required to install any extension.
* [Set up Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) or use an existing one.
* [Enable the Address Validation API](https://console.cloud.google.com/apis/library/addressvalidation.googleapis.com?utm_source=Docs_EnableSpecificAPI&_gl=1*d8oh8l*_ga*NzE3NDA4NzkuMTY4MzU4MTE3NA..*_ga_NRWSTWS78N*MTY4MzYyMDE3MS43LjEuMTY4MzYyMTM5My4wLjAuMA..).
* [Obtain a Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key). You must provide this API key during installation.

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#blaze-pricing-plan).

You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).

This extension uses the following Firebase and Google Cloud services which may have associated charges if you exceed the service’s no-cost tier:

* [Address Validation API pricing](https://developers.google.com/maps/documentation/address-validation/usage-and-billing)
* [Cloud Functions (1st gen) pricing](https://firebase.google.com/functions/pricing)
* [Cloud Firestore pricing](https://firebase.google.com/docs/firestore/pricing)
