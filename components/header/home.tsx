import React, { useEffect, useState } from 'react'
import { Logo } from '../logo/page'
import { useAuth } from '@/contexts/AuthContext';
import colors from '@/constants/colors'
import Feather from '@expo/vector-icons/Feather';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { supabase } from '@/lib/supabase';
import { ProfileModal } from '../modal/profile';

interface Props {
    onPress: () => void
}
export function Header({ onPress }: Props) {
    const { user } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);

        let query = supabase
            .from("users")
            .select("*")
            .eq("id", user?.id)
            .single()

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar listas:", error.message);
            setLoading(false);
            return;
        }

        setUserData(data)
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => setModalVisible(true)}>
                <Image source={require('../../assets/images/Icon-Profile.jpg')} style={{ height: 40, width: 40, borderRadius: 50 }} />
                <Text style={{ color: colors.black, fontSize: 25, fontWeight: "bold", marginBottom: 5 }}>
                    Hello, {userData?.name}!
                </Text>
            </TouchableOpacity>
            <Pressable onPress={onPress}>
                <Feather name="search" size={34} color="black" />
            </Pressable>

            <ProfileModal name={userData?.name} email={userData?.email} visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})