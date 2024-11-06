import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/button'
import { useLocation, useLocationDispatch } from '@/context/LocationContext'

export default function DisplayLocationScreen() {
  const { location } = useLocation()
  const { reset } = useLocationDispatch()

  return (
    <View style={styles.layout}>
      <Text>
        Location is {location?.coords.latitude} / {location?.coords.longitude}
      </Text>

      <Link href="/" asChild onPress={reset}>
        <Button>Reset</Button>
      </Link>
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
})
