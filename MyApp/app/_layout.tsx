import 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import HomeScreen from './index';


export default function RootLayout() {

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeScreen/>
      </ScrollView>
    </SafeAreaView>
  );
}
