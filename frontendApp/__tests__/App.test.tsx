import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';
import App from '../Home';
import { useCustomers } from '../hooks/useCustomers';
import CustomerList from '../components/CustomerList';

// Mock the hooks and components
jest.mock('../hooks/useCustomers');
jest.mock('../components/CustomerList', () => {
  return jest.fn().mockImplementation(({ onSelectCustomer }) => {
    return (
      <TouchableOpacity 
        testID="mock-customer-list" 
        onPress={() => {
          if (onSelectCustomer) {
            onSelectCustomer({
              id: '123',
              name: 'John Doe',
              email: 'john@example.com',
              role: 'Admin'
            });
          }
        }}
      >
        <Text>Mock Customer List</Text>
      </TouchableOpacity>
    );
  });
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CustomerList as jest.Mock).mockClear();
  });

  it('should render the header with correct title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Zeller Customers')).toBeDefined();
  });

  it('should render the CustomerList component initially', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-customer-list')).toBeDefined();
    expect(CustomerList).toHaveBeenCalled();
  });

  it('should show customer details when a customer is selected', () => {
    const { getByTestId, getByText } = render(<App />);
    
    // Simulate selecting a customer
    fireEvent.press(getByTestId('mock-customer-list'));
    
    // Customer details should be displayed
    expect(getByText('Customer Details')).toBeDefined();
    expect(getByText('Name: John Doe')).toBeDefined();
    expect(getByText('Email: john@example.com')).toBeDefined();
    expect(getByText('Role: Admin')).toBeDefined();
  });
}); 