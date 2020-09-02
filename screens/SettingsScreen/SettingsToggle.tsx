import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
    answerText: {
        fontSize: 70,
        color: '#2e78b7',
    },
    answerBlock: {//each answer
        width: '90%',
        height: '95%',
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: '#2e78b7',
    },
    inactive: {
        backgroundColor: '#c7c7c7', // Pale grey
    },
    answerBuffer: {
        height:'20%',
        // backgroundColor: '#2e78b7',
        justifyContent: "center",
        alignItems: "center",
    },
});

interface Props {
    skill: string;
    value: boolean;
    onToggle: (skill: string, value: boolean) => void;
}


export default function SettingsToggle({ skill, value, onToggle }: Props) {
    
    const handlePress = React.useCallback(() => onToggle(skill, !value),
        [skill, value, onToggle]);
    
    const colorStyle = value ? styles.active : styles.inactive;
    
    return (
        <View style={styles.answerBuffer}>
            <TouchableHighlight style={[styles.answerBlock, colorStyle]} onPress={handlePress}>
            
                <View style={styles.answerBlock}>
                    <Text>{skill}</Text>
                    <Text>{value ? 'T':'F'}</Text>
                    {/* <Button onPress={this.switchFocus.bind(this, idx)} title={skill} /> */}
                </View>
            
            </TouchableHighlight>
        </View>
    )
}