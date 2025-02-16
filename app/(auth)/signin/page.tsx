import { router } from 'expo-router'
import colors from '@/constants/colors'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Star from '../../../components/star/page'
import { Back } from '../../../components/button/back'
import { Input } from '../../../components/input/default'
import { ButtonBlack } from '../../../components/button/black'
import InputPassword from '../../../components/input/password'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    async function HandleSignin() {
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
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
                <Back onPress={() => router.back()} />
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={styles.content}>
                        <Star />
                        <View style={styles.containerTexts}>
                            <Text style={{ color: colors.black, fontSize: 41, fontWeight: "bold" }}>Sign In</Text>
                        </View>
                        <View style={styles.containerForm}>
                            <Input name='Email Address' onValue={setEmail} />
                            <InputPassword onPassword={setPassword} />
                            <ButtonBlack name='Sign In' onPress={HandleSignin} />
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
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    containerTexts: {
        width: "95%",
    },
    containerForm: {
        width: '100%',
        gap: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
})