import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
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
                {Object.entries(skills)
                    .sort(([skill1], [skill2]) => skill1.localeCompare(skill2))
                    .map(([skill, value]) => (  
                    <SettingsToggle skill={skill} value={value} onToggle={switchFocus} key={skill} />
                )) }
                
            </View>
        </ScrollView>
    );
}