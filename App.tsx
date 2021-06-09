import React from 'react';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {QueryClient, QueryClientProvider} from 'react-query'
import Application from "./src/components/Application";

const queryClient = new QueryClient()

export default function App() {

    const [fontsLoaded, setFontsLoaded] = React.useState(false)

    if (!fontsLoaded) {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setFontsLoaded(true));
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Application/>
        </QueryClientProvider>
    );
}
