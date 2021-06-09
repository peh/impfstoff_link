import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Right, Text, Title} from "native-base";
import React, {useEffect} from "react";
import {useIsFetching, useQuery} from "react-query";
import axios from "axios";
import {Linking, StatusBar, Vibration} from "react-native";
import ApiResponse from "../model/ApiResponse";
import Location from "../model/Location";
import LOCATION_DRUGS from "../constants/LocaitonDrug";
import * as WebBrowser from 'expo-web-browser';
import LOCATION_LINK from "../constants/LocationLink";

export default function Application() {

    const [refresh, setRefresh] = React.useState(true)
    const {error, data} = useQuery('data', async () => await axios.get<ApiResponse>('https://api.impfstoff.link/?v=0.3&robot=1'),
        {
            enabled: refresh,
            refetchInterval: 2000
        })
    const isFetching = useIsFetching()
    const toggleRefresh = () => setRefresh(!refresh)

    if (isFetching) {
        StatusBar.setNetworkActivityIndicatorVisible(true)
    }

    if (error) {
        return (
            <Container>
                <Text>ERROR</Text>
            </Container>
        )
    }

    useEffect(() => {
        if (data?.data) {
            const playSound = !!data.data.stats.find(l => l.open)
            if (playSound)
                Vibration.vibrate([1000, 1000, 1000, 1000, 1000])
        }
    }, [data?.data])

    const getColor = (location: Location) => location.open ? '#cfc' : '#fcc'
    const onCardPress = (location: Location) => WebBrowser.openBrowserAsync(LOCATION_LINK[location.id])
    let cards = null

    if (data && data.data) {
        cards = data.data.stats.map(c => (
            <Card key={c.id}>
                <CardItem header style={{backgroundColor: getColor(c)}} button onPress={() => onCardPress(c)}>
                    <Text>{c.name}</Text>
                </CardItem>
                <CardItem button onPress={() => onCardPress(c)}>
                    <Body>
                        <Text>{LOCATION_DRUGS[c.id].join(",")}</Text>
                    </Body>
                </CardItem>
            </Card>
        ))
    }


    return (
        <Container>
            <Header>
                <Body>
                    <Title>impfstoff.link App</Title>
                </Body>
                <Right>
                    <Button transparent onPress={toggleRefresh}>
                        <Icon name={refresh ? "pause" : "play-outline"}/>
                    </Button>
                </Right>
            </Header>
            <Content>
                {cards}
                <Text>All data is coming directly from:</Text>
                <Button transparent onPress={() => Linking.openURL("https://impfstoff.link")}><Text>impfstoff.link</Text></Button>
                <Text>This is an open source application you can help improving it on</Text>
                <Button transparent onPress={() => Linking.openURL("https://github.com/peh/impfstoff_link")}><Text>github</Text></Button>
                <Text>Privacy Policy:</Text>
                <Text>No personal data is being stored by this application!</Text>
            </Content>
        </Container>
    )
}
