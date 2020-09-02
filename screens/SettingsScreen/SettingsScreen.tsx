import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
    View, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback,
} from 'react-native';
import SettingsToggle from './SettingsToggle';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    answersContainer: {//holds all answers
        flex: 7,
        backgroundColor: '#f7f7f7',//almost-white grey
        flexDirection: "column",
        // justifyContent: "space-around",
        alignContent: "space-around",
        // flexWrap: "wrap",
    },
    answerBlock: {//each answer
        width: '90%',
        height: '50px',
        backgroundColor: '#c7c7c7',//pale grey
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 30,
        color: '#2e78b7',
    },
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#9c9c9c',//grey
    },
});

interface Props {
    skills: Record<string, boolean>;
    switchFocus(skill: string, value: boolean): void;
}

export default function SettingsScreen({ skills, switchFocus }: Props) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Focused Skills</Text>
            </View>
            <View style={styles.answersContainer}>
                {Object.entries(skills).map(([skill, value]) => (
                    <SettingsToggle skill={skill} value={value} onToggle={switchFocus} key={skill} />
                )) }
                
            </View>
        </ScrollView>
    );
}



{/* <SettingsScreen
skills={['Addition 0-10','Subtraction 0-10','Counting 1-10', 'Numeral Identification 1-10', 'Addition 0-20', 'Subtraction 0-20', 'Reading 3 Number Places']}
focus={[true,false,false, true, false, true, true, true]}
/> */}