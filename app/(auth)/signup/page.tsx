import { router } from 'expo-router'
import React, { useState } from 'react'
import colors from '@/constants/colors'
import { supabase } from '@/lib/supabase'
import Star from '../../../components/star/page'
import { Back } from '../../../components/button/back'
import { Input } from '../../../components/input/default'
import InputPassword from '../../../components/input/password'
import { ButtonBlack } from '../../../components/button/black'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSignup() {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) {
            Alert.alert('Error', error.message)
            setLoading(false)
            return;
        }

        setLoading(false)
        router.replace('/(panel)/home/page')

    }
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", paddingHorizontal: 15 }}>
                <Back />
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={styles.content}>
                        <Star />
                        <View style={styles.containerTexts}>
                            <Text style={{ color: colors.black, fontSize: 41, fontWeight: "bold" }}>Create account</Text>
                        </View>
                        <View style={styles.containerForm}>
                            <Input name='Username' onValue={setName} />
                            <Input name='Email Address' onValue={setEmail} />
                            <InputPassword onPassword={setPassword} />
                            <ButtonBlack name='Create Account' onPress={handleSignup} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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