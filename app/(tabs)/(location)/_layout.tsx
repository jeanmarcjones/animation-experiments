import { Stack } from 'expo-router'

import { StyleGuide } from '@/components/style-guide'
import { LocationProvider } from '@/context/LocationContext'

export default function LocationLayout() {
  return (
    <LocationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: StyleGuide.palette.background },
        }}
      />
    </LocationProvider>
  )
}
