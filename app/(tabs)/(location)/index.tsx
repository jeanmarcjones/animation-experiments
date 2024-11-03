import { StyleSheet, Text, View } from 'react-native'

import LinkButton from '@/components/link-button'
import Timer from '@/components/animations/timer'
import { useLocation } from '@/context/LocationContext'

export default function Home() {
  // const { error } = useLocation()

  return <Timer />
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
