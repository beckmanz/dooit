import { Modal, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '@/constants/colors'; import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
;

interface Props {
    name: string;
    email: string;
    visible: boolean;
    onClose: () => void;
}

export function ProfileModal({ name, email, visible, onClose }: Props) {
    const [logoutError, setLogoutErro] = useState('')
    const { user, setAuth } = useAuth()

    async function handleSignout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            setLogoutErro(error.message)
            return;
        }

        setAuth(null)
        router.replace("/(auth)/preauth/page")
    }
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="closecircle" size={24} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header}>
                        <Image source={require('../../assets/images/Icon-Profile.jpg')} style={{ height: 100, width: 100, borderRadius: 50 }} />
                        <View style={{ gap: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <FontAwesome6 name="user-tag" size={24} color="black" />
                                <Text>{name}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <MaterialIcons name="email" size={30} color="black" />
                                <Text>{user?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                        <TouchableOpacity style={styles.logoutBtn} onPress={handleSignout}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>Logout</Text>
                            <MaterialCommunityIcons name="logout-variant" size={24} color={colors.white} />
                        </TouchableOpacity>
                        {logoutError && <Text style={{ color: 'red' }}>{logoutError}</Text>}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        padding: 15,
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 10,
        gap: 10,
    },
    header: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        padding: 15,
        borderRadius: 8
    },
    logoutBtn: {
        width: "70%",
        backgroundColor: 'rgba(255, 0, 0, 0.66)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        gap: 5,
        borderRadius: 10,
    }
});