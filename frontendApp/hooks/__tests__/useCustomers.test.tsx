import { renderHook, act } from '@testing-library/react-hooks';
import { customerApi } from '../../services/api';
import { useCustomer, useCustomers } from '../useCustomers';

// Mock the API
jest.mock('../../services/api', () => ({
  customerApi: {
    getCustomer: jest.fn(),
    listCustomers: jest.fn(),
  },
}));

describe('useCustomer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return customer data', async () => {
    const mockCustomer = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };

    (customerApi.getCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);

    const { result, waitForNextUpdate } = renderHook(() => useCustomer('123'));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the API call to resolve
    await waitForNextUpdate();

    // Updated state after API call
    expect(result.current.loading).toBe(false);
    expect(result.current.customer).toEqual(mockCustomer);
    expect(result.current.error).toBeNull();
    expect(customerApi.getCustomer).toHaveBeenCalledWith('123');
  });

  it('should handle API errors', async () => {
    const error = new Error('Failed to fetch customer');
    (customerApi.getCustomer as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useCustomer('123'));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.customer).toBeNull();
    expect(result.current.error).toEqual(error);
  });
});

describe('useCustomers hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return customers list', async () => {
    const mockResponse = {
      items: [
        {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
        },
        {
          id: '456',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Manager',
        },
      ],
      nextToken: 'next-page-token',
    };

    (customerApi.listCustomers as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useCustomers({ limit: 10 }));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.customers).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the API call to resolve
    await waitForNextUpdate();

    // Updated state after API call
    expect(result.current.loading).toBe(false);
    expect(result.current.customers).toEqual(mockResponse.items);
    expect(result.current.hasMore).toBe(true);
    expect(customerApi.listCustomers).toHaveBeenCalledWith({ limit: 10 });
  });

  it('should handle API errors for list customers', async () => {
    const error = new Error('Failed to fetch customers');
    (customerApi.listCustomers as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useCustomers());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.customers).toEqual([]);
    expect(result.current.error).toEqual(error);
  });

  it('should load more customers when calling loadMore', async () => {
    // Initial response
    const initialResponse = {
      items: [{ id: '123', name: 'John Doe', role: 'Admin' }],
      nextToken: 'next-token',
    };

    // Next page response
    const nextPageResponse = {
      items: [{ id: '456', name: 'Jane Smith', role: 'Manager' }],
      nextToken: null,
    };

    (customerApi.listCustomers as jest.Mock)
      .mockResolvedValueOnce(initialResponse)
      .mockResolvedValueOnce(nextPageResponse);

    const { result, waitForNextUpdate } = renderHook(() => useCustomers());

    // Wait for initial load to complete
    await waitForNextUpdate();

    expect(result.current.customers).toEqual(initialResponse.items);
    expect(result.current.hasMore).toBe(true);

    // Load more
    await act(async () => {
      result.current.loadMore();
      await waitForNextUpdate();
    });

    expect(result.current.customers).toEqual([
      ...initialResponse.items,
      ...nextPageResponse.items,
    ]);
    expect(result.current.hasMore).toBe(false);
    expect(customerApi.listCustomers).toHaveBeenCalledTimes(2);
    expect(customerApi.listCustomers).toHaveBeenLastCalledWith({
      nextToken: 'next-token',
    });
  });
}); 