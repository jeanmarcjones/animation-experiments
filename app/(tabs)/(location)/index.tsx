import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/button'
import { useLocation } from '@/context/LocationContext'

export default function Home() {
  const { error } = useLocation()

  return (
    <View style={styles.layout}>
      <Button href="/find-location">Find Location</Button>

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
