import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'

interface Props {
    onPassword: (password: string) => void
}
export default function password({ onPassword }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const PasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        onPassword(newPassword);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={!isPasswordVisible} value={password} onChangeText={PasswordChange} />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'} size={20} color="rgba(0, 0, 0, 0.5)" style={{ paddingRight: 50 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 56,
        width: 353,
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    input: {
        width: "90%",
        height: "100%",
        fontSize: 15,
        paddingHorizontal: 17
    },
})