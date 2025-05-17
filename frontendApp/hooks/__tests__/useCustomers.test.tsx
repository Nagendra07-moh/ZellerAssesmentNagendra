import { renderHook } from '@testing-library/react-hooks';
import { customerApi } from '../../services/api';
import { useCustomers } from '../useCustomers';

// Mock the API
jest.mock('../../services/api', () => ({
  customerApi: {
    getListCustomers: jest.fn(),
  },
}));

describe('useCustomers hook', () => {
  const mockCustomers = [
    {
      id: '1',
      name: 'TestCustomer1',
      email: 'test1@test.com',
      role: 'Manager',
    },
    {
      id: '2',
      name: 'TestCustomer2',
      email: 'test2@test.com',
      role: 'Admin',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (customerApi.getListCustomers as jest.Mock).mockResolvedValue(mockCustomers);
  });

  it('should fetch and return customers list', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCustomers());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.customers).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the API call to resolve
    await waitForNextUpdate();

    // Updated state after API call
    expect(result.current.loading).toBe(false);
    expect(result.current.customers).toEqual(mockCustomers);
    expect(result.current.error).toBeNull();
    expect(customerApi.getListCustomers).toHaveBeenCalled();
  });

  it('should handle API errors for list customers', async () => {
    const error = new Error('Failed to fetch customers');
    (customerApi.getListCustomers as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useCustomers());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.customers).toEqual([]);
    expect(result.current.error).toEqual(error);
  });
}); 