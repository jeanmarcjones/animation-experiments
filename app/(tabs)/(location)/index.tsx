import { Link, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const { error } = useLocalSearchParams<{ error?: string }>()

  return (
    <View style={styles.layout}>
      <Link href="/find-location" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Find Location</Text>
        </Pressable>
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
  },
  button: {
    backgroundColor: '#0D74CE',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#EEEEEE',
  },
  errorText: {
    color: '#D13415',
    marginTop: 20,
  },
})
