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

import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { Address } from "./types";

export function addressesChanged(a: Address, b?: Address) {
  return (
    JSON.stringify({
      addressLines: a.addressLines,
      locality: a.locality,
      regionCode: a.regionCode,
    }) !==
    JSON.stringify({
      addressLines: b?.addressLines,
      locality: b?.locality,
      regionCode: b?.regionCode,
    })
  );
}

export async function checkDataValidity(
  after: firestore.DocumentSnapshot | undefined
) {
  // If the document was deleted, terminate.
  if (!after || !after.exists) {
    return false;
  }

  if (after.data()?.address || after.data()?.address == "") {
    const address = after.data()?.address;

    if (!address.hasOwnProperty("addressLines")) {
      functions.logger.error(Errors.MissingRequiredField);

      // Write the error back to the document.
      await after.ref.set(
        { error: Errors.MissingRequiredField },
        { merge: true }
      );

      // Don't proceed.
      return false;
    } else {
      // If the address has an addressLines field, make sure it's an array.
      if (
        !Array.isArray(address.addressLines) ||
        address.addressLines.length < 1
      ) {
        functions.logger.error(Errors.MissingRequiredField);

        // Write the error back to the document.
        await after.ref.set(
          { error: Errors.MissingRequiredField },
          { merge: true }
        );

        // Don't proceed.
        return false;
      }
    }
  } else {
    // Don't proceed.
    return false;
  }
  // If the above lines don't throw an error, the data is valid.
  return true;
}

enum Errors {
  MissingRequiredField = 'Missing required field "addressLines", please make sure that your "address" field is a map and it contains an "addressLines" array field.',
  UnknownError = "Unknown Error",
}
