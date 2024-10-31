import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(location)"
        options={{
          title: 'Location',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'location' : 'location-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="playground"
        options={{
          title: 'Playground',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'balloon' : 'balloon-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
