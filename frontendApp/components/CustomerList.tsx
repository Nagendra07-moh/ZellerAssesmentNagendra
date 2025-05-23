import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { UserIconBox } from './UserIconBox';

interface Customer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface CustomerListProps {
  consumerList: Customer[];
  loading: boolean;
  refreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ consumerList, loading, refreshing, setRefreshing }) => {
 

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setRefreshing(false);
    }
  };

  const renderCustomerItem = useCallback(({ item }: { item: Customer }) => (
    <View style={{flexDirection:'row',alignItems:'center',marginTop:16}}>
      <UserIconBox inital={item?.name?.charAt(0) || ''} />
      <View>
      <Text style={styles.customerName}>{item?.name}</Text>
      <Text style={styles.customerRole}>{item?.role}</Text>
      </View>
    </View>
  ), [consumerList]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" testID="loading-indicator" />
      </View>
    );
  }

  return (
    <FlatList
      testID="customer-flatlist"
      data={consumerList}
      keyExtractor={(item) => item.id}
      renderItem={renderCustomerItem}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  customerItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  customerRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 8,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default CustomerList; 