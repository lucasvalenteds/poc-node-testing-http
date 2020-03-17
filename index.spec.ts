import Axios, { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { Customer, Failure, findCustomerById } from ".";

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

  test("It returns customer when ID exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(200, customer);

    const result = await findCustomerById(customer.id, httpClient);

    expect(result).toStrictEqual(customer);
  });

  test("It returns failure when ID does not exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(404);

    const result = await findCustomerById(customer.id, httpClient);

    expect(result).toStrictEqual(failure);
  });
});

describe("Using static instance", () => {
  const mock: AxiosMockAdapter = new AxiosMockAdapter(Axios);

  test("It returns customer when ID exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(200, customer);

    const result = await findCustomerById(customer.id);

    expect(result).toStrictEqual(customer);
  });

  test("It returns failure when ID does not exists", async () => {
    mock.onGet("/customer/" + customer.id).reply(404);

    const result = await findCustomerById(customer.id);

    expect(result).toStrictEqual(failure);
  });
});
