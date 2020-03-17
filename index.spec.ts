import Axios, { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { CustomerAPI, CustomerAPIDefault, Customer, Failure } from ".";

const customer: Customer = {
  id: 1,
  name: "John Smith",
};

const failure: Failure = {
  message: "Could not find customer with ID " + customer.id,
};

describe("Using custom instance", () => {
  const httpClient: AxiosInstance = Axios.create();
  const mock: AxiosMockAdapter = new AxiosMockAdapter(httpClient);
  const api: CustomerAPI = new CustomerAPIDefault(httpClient);

  test("It returns customer when ID exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(200, customer);

    const result = await api.findCustomerById(customer.id);

    expect(result).toStrictEqual(customer);
  });

  test("It returns failure when ID does not exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(404);

    const result = await api.findCustomerById(customer.id);

    expect(result).toStrictEqual(failure);
  });
});

describe("Using static instance", () => {
  const mock: AxiosMockAdapter = new AxiosMockAdapter(Axios);
  const api: CustomerAPI = new CustomerAPIDefault();

  test("It returns customer when ID exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(200, customer);

    const result = await api.findCustomerById(customer.id);

    expect(result).toStrictEqual(customer);
  });

  test("It returns failure when ID does not exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(404);

    const result = await api.findCustomerById(customer.id);

    expect(result).toStrictEqual(failure);
  });
});
