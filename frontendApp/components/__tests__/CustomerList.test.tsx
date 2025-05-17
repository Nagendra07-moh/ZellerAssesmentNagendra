import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomerList from '../CustomerList';

// Define Customer interface here to avoid import issues
interface Customer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

describe('CustomerList Component', () => {
  const mockCustomers: Customer[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
  ];
  const mockSetRefreshing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render customer list correctly', () => {
    const { getByTestId, getByText } = render(
      <CustomerList 
        consumerList={mockCustomers}
        loading={false}
        refreshing={false}
        setRefreshing={mockSetRefreshing}
      />
    );
    
    expect(getByTestId('customer-flatlist')).toBeDefined();
    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('Admin')).toBeDefined();
    expect(getByText('Jane Smith')).toBeDefined();
    expect(getByText('Manager')).toBeDefined();
  });

  it('should render loading indicator when loading', () => {
    const { getByTestId } = render(
      <CustomerList 
        consumerList={mockCustomers}
        loading={true}
        refreshing={false}
        setRefreshing={mockSetRefreshing}
      />
    );
    
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('should handle refresh correctly', async () => {
    const { getByTestId } = render(
      <CustomerList 
        consumerList={mockCustomers}
        loading={false}
        refreshing={false}
        setRefreshing={mockSetRefreshing}
      />
    );
    
    const flatList = getByTestId('customer-flatlist');
    
    // Trigger refresh
    fireEvent(flatList, 'refresh');
    
    // Check if setRefreshing was called
    expect(mockSetRefreshing).toHaveBeenCalledWith(true);
  });
}); 