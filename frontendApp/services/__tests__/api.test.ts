import { customerApi } from '../api';

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomer', () => {
    it('should fetch customer with ID that exists in mock data', async () => {
      const result = await customerApi.getCustomer('1');
      
      expect(result).toEqual({
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        role: 'Admin'
      });
    });

    it('should return default customer for non-existent ID', async () => {
      const nonExistentId = '999';
      const result = await customerApi.getCustomer(nonExistentId);
      
      expect(result).toEqual({
        id: nonExistentId,
        name: 'Unknown Customer',
        email: `customer${nonExistentId}@example.com`,
        role: 'Admin'
      });
    });
  });

  // describe('listCustomers', () => {
  //   it('should fetch all customers when no filter is provided', async () => {
  //     const result = await customerApi.listCustomers();
      
  //     expect(result.items).toHaveLength(4);
  //     expect(result.nextToken).toBeNull();
  //   });

  //   it('should filter customers by role', async () => {
  //     const result = await customerApi.listCustomers({
  //       filter: { role: { eq: 'Admin' } }
  //     });
      
  //     expect(result.items).toHaveLength(2);
  //     expect(result.items[0].role).toBe('Admin');
  //     expect(result.items[1].role).toBe('Admin');
  //   });

  //   it('should paginate results when limit is provided', async () => {
  //     const limit = 2;
  //     const result = await customerApi.listCustomers({ limit });
      
  //     expect(result.items).toHaveLength(limit);
  //     expect(result.nextToken).toBe('2'); // Next page starts at index 2
  //   });

  //   it('should use nextToken for pagination', async () => {
  //     const firstPage = await customerApi.listCustomers({ limit: 2 });
  //     expect(firstPage.items).toHaveLength(2);
  //     expect(firstPage.nextToken).toBe('2');
      
  //     // Check type safety for nextToken
  //     if (firstPage.nextToken) {
  //       const secondPage = await customerApi.listCustomers({ 
  //         limit: 2, 
  //         nextToken: firstPage.nextToken 
  //       });
        
  //       expect(secondPage.items).toHaveLength(2);
  //       expect(secondPage.nextToken).toBeNull(); // No more pages
        
  //       // Ensure second page has different items than first page
  //       expect(secondPage.items[0].id).not.toBe(firstPage.items[0].id);
  //       expect(secondPage.items[1].id).not.toBe(firstPage.items[1].id);
  //     }
  //   });
  // });
}); 