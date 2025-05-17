import axios from 'axios';

// Fake data to be used without a server
const MOCK_CUSTOMERS = [
  {
    "id": "1",
    "name": "TestCustomer1",
    "email": "test1@test.com",
    "role": "Manager"
  },
  {
    "id": "2",
    "name": "TestCustomer2",
    "email": "test2@test.com",
    "role": "Admin"
  },
  {
    "id": "3",
    "name": "TestCustomer3",
    "email": "test3@test.com",
    "role": "Manager"
  },
  {
    "id": "4",
    "name": "TestCustomer4",
    "email": "test4@test.com",
    "role": "Admin"
  }
]

export const customerApi = {
  getListCustomers: async () => {
    try {
      const response = await axios.post('http://10.0.2.2:9002/', {
        query: `
          query {
            listZellerCustomers {
              items {
                id
                name
                email
                role
              }
            }
          }
        `
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data?.data?.listZellerCustomers?.items || [];
    } catch (error: any) {
      console.error("GraphQL fetch error:", error.message);
      return MOCK_CUSTOMERS;
    }
  }
};

export default axios.create({
  baseURL: 'http://10.0.2.2:9002/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}); 