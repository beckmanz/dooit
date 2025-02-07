import React, { useState } from 'react'
import colors from '@/constants/colors'
import InputPassword from '../../../components/input/password'
import { Input } from '../../../components/input/default'
import Star from '../../../components/star/page'
import { ButtonBlack } from '../../../components/button/black'
import { Back } from '../../../components/button/back'
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const CreateAccount = () => {

    }
    const NameChange = (newName: string) => {
        setName(newName)
    }
    const EmailChange = (newEmail: string) => {
        setEmail(newEmail)
    }
    const PasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", paddingHorizontal: 15 }}>
                <Back />
            </View>
            <View style={styles.content}>
                <Star />
                <View style={styles.containerTexts}>
                    <Text style={{ color: colors.black, fontSize: 41, fontWeight: "bold" }}>Create account</Text>
                </View>
                <View style={styles.containerForm}>
                    <Input name='Username' onValue={NameChange} />
                    <Input name='Email Address' onValue={EmailChange} />
                    <InputPassword onPassword={PasswordChange} />
                    <ButtonBlack name='Create Account' onPress={CreateAccount} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerTexts: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    containerForm: {
        width: '100%',
        gap: 5,
        marginTop: 20
    },
})