import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomerList from '../CustomerList';
import { useCustomers } from '../../hooks/useCustomers';

// Mock the custom hook
jest.mock('../../hooks/useCustomers');

describe('CustomerList Component', () => {
  // Helper function to setup the mock for useCustomers
  const mockUseCustomers = (mockData: {
    customers: any[];
    loading: boolean;
    error: Error | null;
    loadMore: () => void;
    hasMore: boolean;
  }) => {
    (useCustomers as jest.Mock).mockReturnValue(mockData);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state correctly', () => {
    mockUseCustomers({
      customers: [],
      loading: true,
      error: null,
      loadMore: jest.fn(),
      hasMore: false,
    });

    const { getByTestId } = render(<CustomerList />);
    
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('should render error state correctly', () => {
    const errorMessage = 'Failed to load customers';
    mockUseCustomers({
      customers: [],
      loading: false,
      error: new Error(errorMessage),
      loadMore: jest.fn(),
      hasMore: false,
    });

    const { getByText } = render(<CustomerList />);
    
    expect(getByText('Error loading customers')).toBeDefined();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('should render customer list correctly', () => {
    const customers = [
      { id: '1', name: 'John Doe', role: 'Admin' },
      { id: '2', name: 'Jane Smith', role: 'Manager' },
    ];
    
    mockUseCustomers({
      customers,
      loading: false,
      error: null,
      loadMore: jest.fn(),
      hasMore: false,
    });

    const { getByText } = render(<CustomerList />);
    
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('Admin')).toBeDefined();
    expect(getByText('Jane Smith')).toBeDefined();
    expect(getByText('Manager')).toBeDefined();
  });

  it('should call onSelectCustomer when a customer is pressed', () => {
    const customers = [{ id: '1', name: 'John Doe', role: 'Admin' }];
    const mockLoadMore = jest.fn();
    const mockOnSelectCustomer = jest.fn();
    
    mockUseCustomers({
      customers,
      loading: false,
      error: null,
      loadMore: mockLoadMore,
      hasMore: false,
    });

    const { getByText } = render(
      <CustomerList onSelectCustomer={mockOnSelectCustomer} />
    );
    
    // Press the customer item
    fireEvent.press(getByText('John Doe'));
    
    expect(mockOnSelectCustomer).toHaveBeenCalledWith(customers[0]);
  });

  it('should render footer loader when hasMore is true', () => {
    mockUseCustomers({
      customers: [{ id: '1', name: 'John Doe', role: 'Admin' }],
      loading: false,
      error: null,
      loadMore: jest.fn(),
      hasMore: true,
    });

    const { getByTestId } = render(<CustomerList />);
    
    expect(getByTestId('footer-loader')).toBeDefined();
  });

  it('should not render footer loader when hasMore is false', () => {
    mockUseCustomers({
      customers: [{ id: '1', name: 'John Doe', role: 'Admin' }],
      loading: false,
      error: null,
      loadMore: jest.fn(),
      hasMore: false,
    });

    const { queryByTestId } = render(<CustomerList />);
    
    expect(queryByTestId('footer-loader')).toBeNull();
  });

  it('should call loadMore when list is scrolled to the end', () => {
    const mockLoadMore = jest.fn();
    
    mockUseCustomers({
      customers: [{ id: '1', name: 'John Doe', role: 'Admin' }],
      loading: false,
      error: null,
      loadMore: mockLoadMore,
      hasMore: true,
    });

    const { getByTestId } = render(<CustomerList />);
    
    // Simulate reaching the end of the list
    const flatList = getByTestId('customer-flatlist');
    fireEvent(flatList, 'endReached');
    
    expect(mockLoadMore).toHaveBeenCalled();
  });
}); 