import { StyleSheet, View } from 'react-native'

import NumberPad from '@/components/number-pad'

export default function SetTime() {
  return (
    <View style={styles.layout}>
      <NumberPad />
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 50,
  },
})
