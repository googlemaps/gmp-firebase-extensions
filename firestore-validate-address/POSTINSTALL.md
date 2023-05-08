## See it in action

This extension validates addresses written to the specified Firestore collection using the Google Maps Address Validation API. It then updates the document with the address validity data and error messages, if any.

### Example Usage

Write an address to the `${param:ADDRESS_COLLECTION}` collection:

```javascript
firebase.firestore().collection("${param:ADDRESS_COLLECTION}").add({
  address: {
    addressLines: ["1600 Amphitheatre Parkway"],
    regionCode: "US",
    locality: "Mountain View",
  },
});
```

Monitor the collection to see the result:

```json
{
  address: {
    line1: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    region: "CA",
    postalCode: "94043",
    country: "US",
  },
  addressValidity: true,
}
```

## Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
