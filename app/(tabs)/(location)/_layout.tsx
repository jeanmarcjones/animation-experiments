import { Stack } from 'expo-router'

import { LocationProvider } from '@/context/LocationContext'

export default function LocationLayout() {
  return (
    <LocationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </LocationProvider>
  )
}
