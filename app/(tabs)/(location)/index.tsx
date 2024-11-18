import { Link, Redirect } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/button'
import { useLocation } from '@/context/location-context'

export default function Home() {
  const { error } = useLocation()

  // TODO debug code
  // return <Redirect href="/playground" />

  return (
    <View style={styles.layout}>
      <Link href="/find-location" asChild>
        <Button>Find Location</Button>
      </Link>

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
