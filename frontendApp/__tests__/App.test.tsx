import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Home from '../Home';
import { useHomeHook } from '../hooks/useHome';
import CustomerList from '../components/CustomerList';

// Define the Customer interface directly to avoid import issues
interface Customer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

// Mock the hooks and components
jest.mock('../hooks/useHome');
jest.mock('../components/CustomerList', () => {
  return jest.fn().mockImplementation(({ consumerList }) => {
    return (
      <View testID="mock-customer-list">
        {consumerList.map((customer: Customer) => (
          <View key={customer.id} testID={`customer-${customer.id}`}>
            <Text>{customer.name}</Text>
            <Text>{customer.role}</Text>
          </View>
        ))}
      </View>
    );
  });
});

describe('Home Component', () => {
  const mockToggleUserType = jest.fn();
  const mockSetRefreshing = jest.fn();
  const mockAdminUsers = [
    {
      id: '2',
      name: 'John Snow',
      email: 'test2@test.com',
      role: 'Admin'
    },
    {
      id: '4',
      name: 'Rajesh Kumar',
      email: 'test4@test.com',
      role: 'Admin'
    }
  ];
  
  const mockManagerUsers = [
    {
      id: '1',
      name: 'Nagendra Mohan',
      email: 'test1@test.com',
      role: 'Manager'
    },
    {
      id: '3',
      name: 'Simran Gupta',
      email: 'test3@test.com',
      role: 'Manager'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (CustomerList as jest.Mock).mockClear();
    (useHomeHook as jest.Mock).mockReturnValue({
      selectedUserType: 'Admin',
      toggleUserType: mockToggleUserType,
      UserType: { Admin: 'Admin', Manager: 'Manager' },
      userData: mockAdminUsers,
      loading: false,
      refreshing: false,
      setRefreshing: mockSetRefreshing
    });
  });

  it('should render the header with User Types title', () => {
    const { getByText } = render(<Home />);
    expect(getByText('User Types')).toBeDefined();
  });

  it('should render both Admin and Manager filter options', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Admin')).toBeDefined();
    expect(getByText('Manager')).toBeDefined();
  });

  it('should render the Admin Users title when Admin is selected', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Admin Users')).toBeDefined();
  });

  it('should call toggleUserType when a filter option is clicked', () => {
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Manager'));
    expect(mockToggleUserType).toHaveBeenCalledWith('Manager');
  });

  it('should pass the correct user data to CustomerList', () => {
    render(<Home />);
    expect(CustomerList).toHaveBeenCalledWith(
      expect.objectContaining({
        consumerList: mockAdminUsers
      }),
      expect.anything()
    );
  });

  it('should show Manager users when Manager filter is selected', () => {
    // Update the mock to return Manager users
    (useHomeHook as jest.Mock).mockReturnValue({
      selectedUserType: 'Manager',
      toggleUserType: mockToggleUserType,
      UserType: { Admin: 'Admin', Manager: 'Manager' },
      userData: mockManagerUsers
    });
    
    const { getByText } = render(<Home />);
    expect(getByText('Manager Users')).toBeDefined();
    
    // Verify that CustomerList is called with manager data
    expect(CustomerList).toHaveBeenCalledWith(
      expect.objectContaining({
        consumerList: mockManagerUsers
      }),
      expect.anything()
    );
  });
}); 