import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomSelectProps {
    isSelected: boolean;
}

export const CustomSelect:FC<CustomSelectProps> = ({ isSelected = false }) => {
    return (
        <View style={styles.container}>
            {isSelected && <View style={styles.selectedContainer }></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#0370CE',
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedContainer: {
        width: 14,
        height: 14,
        backgroundColor: '#0370CE',
        borderRadius: 100
    }
});
