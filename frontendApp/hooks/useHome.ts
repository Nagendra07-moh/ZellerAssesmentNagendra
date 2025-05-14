import { useState, useEffect } from "react";
import { Customer } from "./useCustomers";

export const useHomeHook = () => {
  enum UserType {
    Admin = 'Admin',
    Manager = 'Manager',
  }
  const [selectedUserType, setSelectedUserType] = useState<string>(UserType.Admin);
  const toggleUserType = (type: string) => {
    setSelectedUserType(type);
  }
  const consumerList: Customer[] = [
    {
      "id": "1",
      "name": "Nagendra Mohan",
      "email": "test1@test.com",
      "role": "Manager"
    },
    {
      "id": "2",
      "name": "John Snow",
      "email": "test2@test.com",
      "role": "Admin"
    },
    {
      "id": "3",
      "name": "Simran Gupta",
      "email": "test3@test.com",
      "role": "Manager"
    },
    {
      "id": "4",
      "name": "Rajesh Kumar",
      "email": "test4@test.com",
      "role": "Admin"
    }
  ]
  const [userData, setUserData] = useState<Customer[]>(consumerList);

  useEffect(() => {
    const userData = consumerList.filter((user) => user.role === selectedUserType);
    setUserData(userData);
  }, [selectedUserType])
  return {
    selectedUserType,
    toggleUserType,
    UserType,
    userData
  }
}