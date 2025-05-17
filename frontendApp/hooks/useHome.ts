import { useState, useEffect, useMemo } from "react";
import { customerApi } from "../services/api";

interface Customer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export const useHomeHook = () => {
  enum UserType {
    Admin = 'Admin',
    Manager = 'Manager',
  }

  const [selectedUserType, setSelectedUserType] = useState<string>(UserType.Admin);
  const [consumerList, setConsumerList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const toggleUserType = (type: string) => {
    setSelectedUserType(type);
  };

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await customerApi.getListCustomers();
        setConsumerList(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch customers'));
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use memoized filtered data to prevent unnecessary filtering on re-renders
  const userData = useMemo(() => {
    return consumerList.filter((user) => user.role === selectedUserType);
  }, [selectedUserType, consumerList]);

  return {
    selectedUserType,
    toggleUserType,
    UserType,
    userData,
    loading,
    error,
    refreshing,
    setRefreshing
  };
};
