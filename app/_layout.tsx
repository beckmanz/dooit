import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {

  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        setAuth(session.user)
        router.replace('/(panel)/home/page')
        return;
      }

      setAuth(null)
      router.replace('/(auth)/welcome/page')

    })
  }, [])

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/preauth/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/welcome/page" options={{ headerShown: false }} />
      <Stack.Screen name="(panel)/home/page" options={{ headerShown: false }} />
      <Stack.Screen name="(panel)/newlist/page" options={{ headerShown: false }} />
    </Stack>
  )
}
