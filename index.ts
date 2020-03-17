import Axios, { AxiosInstance, AxiosResponse } from "axios";

export interface Customer {
  id: number;
  name: string;
}

export interface Failure {
  message: string;
}

export async function findCustomerById(
  id: number,
  httpClient: AxiosInstance = Axios
): Promise<Customer | Failure> {
  try {
    const response: AxiosResponse<Customer> = await httpClient.get(
      "/customer/" + id
    );

    return response.data;
  } catch (error) {
    return { message: "Could not find customer with ID " + id };
  }
}
