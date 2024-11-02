import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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
