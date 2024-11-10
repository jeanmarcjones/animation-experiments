import { Stack } from 'expo-router'

import { StyleGuide } from '@/components/style-guide'
import { TimerProvider } from '@/context/timer-context'

export default function TimerLayout() {
  return (
    <TimerProvider>
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
    </TimerProvider>
  )
}
