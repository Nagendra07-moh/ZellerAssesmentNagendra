import { useState, useEffect } from 'react';
import { customerApi } from '../services/api';

export interface Customer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export const useCustomer = (id: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await customerApi.getCustomer(id);
  //       setCustomer(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err : new Error('Unknown error'));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomer();
  // }, [id]);

  return { customer, loading, error };
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await customerApi.listCustomers();
        // console.log("response->",response);
        setCustomers(response)
        // setCustomers(response.result.items);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);


  return { customers, loading, error};
}; 