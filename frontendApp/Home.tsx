import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomerList from './components/CustomerList';
import { CustomSelect } from './components/CustomSelect';
import { useHomeHook } from './hooks/useHome';

export default function Home() {
 const {selectedUserType, toggleUserType, UserType, userData, loading, refreshing, setRefreshing} = useHomeHook();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.seperator} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Types</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.userTypeContainer, { backgroundColor: selectedUserType === UserType.Admin ? '#E8F2FB' : 'white', }]} onPress={() => toggleUserType('Admin')}>
            <CustomSelect isSelected={selectedUserType === UserType.Admin} />
            <Text style={styles.userTypeText}>{UserType.Admin}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.userTypeContainer, { backgroundColor: selectedUserType === UserType.Manager ? '#E8F2FB' : 'white', }]} onPress={() => toggleUserType('Manager')}>
            <CustomSelect isSelected={selectedUserType === UserType.Manager} />
            <Text style={styles.userTypeText}>{UserType.Manager}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
      <View style={{marginHorizontal:16,marginTop:16}}>
      <Text style={styles.headerTitle}>{selectedUserType} Users</Text>
      <CustomerList consumerList={userData} loading={loading} refreshing={refreshing} setRefreshing={setRefreshing} />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: { marginHorizontal: 8, marginVertical: 16 },
  header: {
    backgroundColor: '#fff',
    margin: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  userTypeContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 4,
    paddingLeft: 12,
    borderRadius: 8
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginLeft: 8
  },
  seperator: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 16,
    marginTop: 4
  }
});
