import React from 'react';
import { View, StyleSheet, Image, ImageBackground,Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
const ParkingSpot = ({ isOccupied, direction, isAccessible }) => {
    // const spotStyle = isOccupied ? styles.occupied : styles.empty;
    const spotDirectionStyle = direction === 'r' ? styles.directionRight : styles.directionLeft;

    const cars = [
        <Image source={require('../../assets/top-car-view-png-34859.png')} style={{ width: 80, height: 45 }} />,
        <Image source={require('../../assets/top-car-view-png-34874.png')} style={{ width: 80, height: 45 }} />,
        <Image source={require('../../assets/top-car-view-png-34880.png')} style={{ width: 80, height: 45 }} />,
        <Image source={require('../../assets/car-top-view-icon-11562.png')} style={{ width: 80, height: 40 }} />,
        <Image source={require('../../assets/car-top-view-icon-11559.png')} style={{ width: 80, height: 40 }} />,
    ]
    let x = Math.floor((Math.random() * 5) + 0);
    return (
        <>
            <View style={[{ borderWidth: 3, borderColor: '#1c1c1c'}, spotDirectionStyle]}>
                    <ImageBackground source={require('../../assets/asfalto.jpg')}style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: 124}} >
                        {direction === 'l' && (
                            <>
                            {isAccessible ?
                                <Fontisto name="paralysis-disability" size={24} color="black" style={{paddingLeft: '10%'}} />
                            : <View></View>
                            }
                            </>)}
                        <View style={[styles.spot]}>
                            {isOccupied ? cars[x] : ''}
                        </View>
                        {direction === 'r' && (<>
                            {isAccessible ?
                                <Fontisto name="paralysis-disability" size={24} color="black" style={{paddingRight: '10%'}} />
                            : <View></View>
                            }
                        </>)}
                    </ImageBackground>
                </View>
        </>

    );
};

const styles = StyleSheet.create({
    spot: {
        width: 100,
        height: 50,
        margin: 5,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    directionRight: {
        borderLeftWidth: 0,
    },
    directionLeft: {
        borderRightWidth: 0,
    },
    empty: {
        backgroundColor: '#30a34d'
    },
    occupied: {
        backgroundColor: '#fb3943'
    },
});

export default React.memo(ParkingSpot);