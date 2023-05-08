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

import { AxiosError, AxiosResponse, AxiosRequestHeaders } from "axios";

export function createMockAxiosError(
  data: any,
  message: string,
  status: number,
  statusText: string
): AxiosError {
  const error = new Error(message) as AxiosError;

  const response: AxiosResponse = {
    data,
    status,
    statusText,
    headers: {},
    config: {
      url: "",
      method: "get",
      //@ts-ignore
      headers: {} as Partial<AxiosRequestHeaders>,
      baseURL: "",
      timeout: 0,
      responseType: "json",
      maxContentLength: -1,
      validateStatus: () => true,
      maxBodyLength: -1,
    },
  };

  error.response = response;
  error.isAxiosError = true;
  return error;
}
