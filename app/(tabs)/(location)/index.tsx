import { Redirect } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import LinkButton from '@/components/link-button'
import { useLocation } from '@/context/LocationContext'

export default function Home() {
  const { error } = useLocation()

  // TODO debug code
  return <Redirect href="/timer" />

  return (
    <View style={styles.layout}>
      <LinkButton href="/find-location">Find Location</LinkButton>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    color: '#D13415',
  },
})
