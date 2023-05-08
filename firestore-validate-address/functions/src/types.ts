/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

type SupportedRegions =
  | "AU" // Australia
  | "AT" // Austria
  | "BE" // Belgium
  | "BR" // Brazil
  | "CA" // Canada
  | "CL" // Chile
  | "CO" // Colombia
  | "DK" // Denmark
  | "FI" // Finland
  | "FR" // France
  | "DE" // Germany
  | "HU" // Hungary
  | "IE" // Ireland
  | "IT" // Italy
  | "MY" // Malaysia
  | "MX" // Mexico
  | "NL" // Netherlands
  | "NZ" // New Zealand
  | "PL" // Poland
  | "PR" // Puerto Rico
  | "SG" // Singapore
  | "SI" // Slovenia
  | "ES" // Spain
  | "SE" // Sweden
  | "CH" // Switzerland
  | "GB" // United Kingdom
  | "US"; // United States

export type Address = {
  addressLines: [string];
  locality?: string;
  // Supported regions: https://developers.google.com/maps/documentation/address-validation/coverage
  regionCode?: SupportedRegions;
};
