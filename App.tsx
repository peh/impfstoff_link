import React from 'react';
import {Container, Text} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

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
        <Container>
            <Text>Open up App.js to start working on your app!</Text>
        </Container>
    );
}
