## See it in action

Two new BigQuery Remote Functions have been created:

* `latLong(address: STRING)`:
Given an address, returns the latitude and longitude as a JSON string.
* `drivingTime(origin: STRING, destination: STRING)`:
Given an origin and destination address, returns the driving time in seconds as a JSON string.

## Example Usage

Run the following examples in BigQuery:

**Get Geocode information from addresses in BigQuery.**

```sql
WITH result AS (
  SELECT 
    origin AS address,
    `extensions-sample.bq_dlp_testing`.latLong(origin) AS location 
  FROM `extensions-sample.bq_dlp_testing.addresses`
)
SELECT 
  address, 
  json_extract_scalar(location, '$.lat') AS lat, 
  json_extract_scalar(location, '$.lng') AS lng
FROM result 
```

**Get driving distance and duration between two addresses.**

```sql
WITH result AS (
  SELECT 
    origin,
    destination,
    `extensions-sample.bq_dlp_testing`.drivingTime(origin, destination) AS driveTime 
  FROM `extensions-sample.bq_dlp_testing.addresses`
)
SELECT 
  origin, 
  destination, 
  driveTime
FROM result 
```

## Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
