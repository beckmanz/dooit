import React from 'react'
import { Stack } from 'expo-router'

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/preauth/page" options={{ headerShown: false }} />
      <Stack.Screen name="(panel)/home/page" options={{ headerShown: false }} />
      <Stack.Screen name="(panel)/newlist/page" options={{ headerShown: false }} />
    </Stack>
  )
}
