import { renderHook, act } from '@testing-library/react-hooks';
import { useHomeHook } from '../useHome';
import { customerApi } from '../../services/api';

// Mock the API
jest.mock('../../services/api', () => ({
  customerApi: {
    getListCustomers: jest.fn(),
  },
}));

describe('useHomeHook', () => {
  const mockCustomers = [
    {
      id: '1',
      name: 'Nagendra Mohan',
      email: 'test1@test.com',
      role: 'Manager'
    },
    {
      id: '2',
      name: 'John Snow',
      email: 'test2@test.com',
      role: 'Admin'
    },
    {
      id: '3',
      name: 'Simran Gupta',
      email: 'test3@test.com',
      role: 'Manager'
    },
    {
      id: '4',
      name: 'Rajesh Kumar',
      email: 'test4@test.com',
      role: 'Admin'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (customerApi.getListCustomers as jest.Mock).mockResolvedValue(mockCustomers);
  });

  it('should initialize with Admin user type selected and load data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHomeHook());
    
    // Initial state should have Admin selected and loading true
    expect(result.current.selectedUserType).toBe('Admin');
    expect(result.current.UserType).toEqual({ Admin: 'Admin', Manager: 'Manager' });
    expect(result.current.loading).toBe(true);
    
    // Wait for the API call to resolve
    await waitForNextUpdate();
    
    // After data loads, should filter to show only Admin users
    expect(result.current.loading).toBe(false);
    expect(result.current.userData.length).toBe(2);
    result.current.userData.forEach(user => {
      expect(user.role).toBe('Admin');
    });
  });

  it('should toggle user type to Manager when requested', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHomeHook());
    
    // Wait for data to load
    await waitForNextUpdate();
    
    act(() => {
      result.current.toggleUserType('Manager');
    });
    
    expect(result.current.selectedUserType).toBe('Manager');
    expect(result.current.userData.length).toBe(2);
    result.current.userData.forEach(user => {
      expect(user.role).toBe('Manager');
    });
  });

  it('should handle API errors', async () => {
    const error = new Error('Failed to fetch customers');
    (customerApi.getListCustomers as jest.Mock).mockRejectedValueOnce(error);
    
    const { result, waitForNextUpdate } = renderHook(() => useHomeHook());
    
    // Initial loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for promise to reject
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(result.current.userData).toEqual([]);
  });
}); 