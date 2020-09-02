import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableHighlight,
} from 'react-native';
import * as Problems from './Problems';

//import { DisappearingButton } from '../components/buttons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    answersContainer: {//holds all answers
        flex: 3,
        backgroundColor: '#f7f7f7',//almost-white grey
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "space-around",
        flexWrap: "wrap",
    },
    answerText: {
        fontSize: 70,
        color: '#2e78b7',
    },
    answerBlock: {//each answer
        width: '35%',
        height: '35%',
        backgroundColor: '#c7c7c7',//pale grey
        justifyContent: "center",
        alignItems: "center",
    },
    questionText: {
        fontSize: 50,
        color: '#2e78b7',
    },
    equation: {
        fontSize: 75,
        color: '#2e78b7',
    },
    questionContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#9c9c9c',//grey
    },
    block: {
        flex: 1,
        backgroundColor: '#7ef542',//green
    },
});

interface Props {
    question: string;
    answers: string[];
    correctAnswer: number;
    onCorrect(): void;
    onIncorrect(): void;
}

interface State {
}

export default class MCScreen extends Component<Props, State> {

    state: State = { wasCorrect: undefined };
    

    answerPressed(idx: number) {
        if (idx == this.props.correctAnswer) {
            this.props.onCorrect();
            // navigation.navigate('Problems')
        } else {
            this.props.onIncorrect();
        }
    }

    render() {
        const {
            question,
            answers,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>What is</Text>
                    <Text style={styles.equation}>{question}?</Text>
                </View>
                <View style={styles.answersContainer}>
                    {answers.map((answer, idx) =>
                        <TouchableHighlight key={idx} style={styles.answerBlock} onPress={this.answerPressed.bind(this, idx)}>
                            <View style={styles.answerBlock} key={idx}>
                                <Text style={styles.answerText}>{answer}</Text>
                                {/* <Button onPress={this.answerPressed.bind(this, idx)} title={answer} /> */}
                            </View>
                        </TouchableHighlight>
                    )}
                    
                    {/* <View style={styles.answerBlock}>
                        <Button onPress={() => navigation.navigate('Home')} title="25" />
                    </View> */}
                </View>
            </View>
        );
    }

}
