import React, { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native';

interface Props {
    name: string;
    onValue: (InputValue: string) => void
}

export function Input({ name, onValue }: Props) {
    const [InputValue, setInputValue] = useState('');

    const EmailChange = (newValue: string) => {
        setInputValue(newValue);
        onValue(newValue);
    };
    return (
        <View>
            <TextInput style={styles.input} placeholder={name} value={InputValue} onChangeText={EmailChange} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 56,
        width: 353,
        borderWidth: 1,
        borderRadius: 25,
        fontSize: 15,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingHorizontal: 17
    }
})