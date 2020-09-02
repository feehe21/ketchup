import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

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
}

interface State {
    wasCorrect?: boolean;
}



export default class MCScreen extends Component<Props, State> {

    state: State = { wasCorrect: undefined };

    
    answerPressed(idx: number) {
        if (idx == this.props.correctAnswer) {
            alert('Yay you did it');
        } else {
            alert('Feel bad');
        }

        this.setState({ wasCorrect: (idx == this.props.correctAnswer) });
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
                    <Text style={styles.equation}>5+5?</Text>
                </View>
                <View style={styles.answersContainer}>
                    {answers.map((answer, idx) =>
                        <TouchableHighlight style={styles.answerBlock} onPress={this.answerPressed.bind(this, idx)}>
                            <View style={styles.answerBlock} key={idx}>
                                <Text style={styles.answerText}>{answer}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    
                </View>
            </View>
        );
    }

}
