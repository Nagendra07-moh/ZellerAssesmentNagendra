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
  getCustomer: async (id: string) => {
    try {
      // Find customer by id or return a default one
      const customer = MOCK_CUSTOMERS.find(c => c.id === id) || {
        id,
        name: 'Unknown Customer',
        email: `customer${id}@example.com`,
        role: 'Admin'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  listCustomers : async () => {
    return MOCK_CUSTOMERS;
    const query = `
      query {
        listZellerCustomers {
          items {
            id
            name
            email
            role
          }
          nextToken
        }
      }
    `;
  
    try {
      const response = await axios.post('http://localhost:9002/', {
        query,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('GraphQL Response:->', response.data);
      return response.data;
    } catch (error) {
      console.error('GraphQL Error:', error);
    }
  }
};

export default axios.create({
  baseURL: 'http://localhost:9002/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}); 