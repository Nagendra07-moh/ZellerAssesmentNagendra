import { Text, View ,StyleSheet} from "react-native"

export const UserIconBox = ({inital = 'n'}:{inital:string}) => {
    return (
        <View style={styles.userIconBox}>
            <Text style={styles.userIconText}>{inital.toUpperCase()}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    userIconBox: {
        width: 50,
        height: 50,
        borderRadius: 6,
        backgroundColor: '#E8F2FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    userIconText: {
        fontSize: 24,
        fontWeight: 'semibold',
        color: '#0370CE',
    }
})