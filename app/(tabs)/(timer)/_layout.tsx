import { Stack } from 'expo-router'

import { StyleGuide } from '@/components/style-guide'

export default function LocationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: StyleGuide.palette.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="set-time"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
