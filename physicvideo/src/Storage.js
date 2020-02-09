import AsyncStorage from '@react-native-community/async-storage';
const Storage = {
    getItem: async function (key) {

        let value = null ;

        try {
            value = await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }

        return value ;

    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};
export default Storage