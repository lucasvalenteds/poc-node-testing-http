import Axios, { AxiosInstance, AxiosResponse } from "axios";

export interface Customer {
  id: number;
  name: string;
}

export interface Failure {
  message: string;
}

export interface CustomerAPI {
  findCustomerById(id: number): Promise<Customer | Failure>;
}

export class CustomerAPIDefault implements CustomerAPI {
  public constructor(private httpClient: AxiosInstance = Axios) {}

  async findCustomerById(id: number): Promise<Customer | Failure> {
    try {
      const response: AxiosResponse<Customer> = await this.httpClient.get(
        "/customer/" + id
      );

      return response.data;
    } catch (error) {
      return { message: "Could not find customer with ID " + id };
    }
  }
}
