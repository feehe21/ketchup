import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
    headerContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#f7f7f7'
    },
    headerText:{
        fontSize:30,
        color: '#2e78b7'
    },
    answersContainer:{
        flex: 4, 
        flexWrap: "wrap", 
        flexDirection: "row",
        backgroundColor:'#f7f7f7',
        justifyContent: "space-around",
        alignContent: "space-around",
    },
    answersBlockBuffer:{
        width: '45%',//130
        flexWrap:"wrap", 
        flexDirection:"row",
        justifyContent: "space-around"
    },
    answerBlock:{
        width: '95%',//100
        height: '100%',//100
        flexWrap:"wrap", 
        flexDirection:"row",
        justifyContent: "space-around",
        alignContent: "space-around",
    },
    answerBlockLight: {
        backgroundColor:'#e0e0e0', 
    },
    answerBlockDark:{
        backgroundColor:'#9c9c9c',
    },
    countingBlockBlue:{
        backgroundColor:'#2e78b7',
        width: 30,
        height: 30,
    },
    countingBlockOrange:{
        backgroundColor:'#f57b42',
        width: 30,
        height: 30,
    }
});

interface MSAnswerProps {
    answer: string[];
    selected: boolean;
    onPressed(): void;
}

function MSAnswer(props: MSAnswerProps) {
    const {
        answer,
        selected,
        onPressed,
    } = props;
    
    const selectStyle = selected ? styles.answerBlockDark : styles.answerBlockLight;
    
    return (
        <TouchableHighlight onPress={onPressed}>
            <View style={styles.answersBlockBuffer}>
                <View style={[styles.answerBlock, selectStyle]}>
                    {/* <View style={styles.countingBlockOrange}></View> */}
                    {answer.map((block, id) => 
                        <View key={id} style={(block == '0') ? styles.countingBlockBlue : styles.countingBlockOrange} />
                    )}
                </View>
            </View>
        </TouchableHighlight>
    );
}

interface Props {
    question: string;
    answers: string[][];
    correctAnswer: number;
    onCorrect(): void;
    onIncorrect(): void;
}

interface State {
    wasCorrect?: boolean;
    selected: boolean[];
}

export default class MSScreen extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            selected: props.answers.map(_ => false),
        }
    }
    
    private isCorrect() {
        const { answers, correctAnswer } = this.props;
        const { selected } = this.state;
        for (let i = 0; i < answers.length; i++) {
            if (selected[i] != (answers[i].length == correctAnswer))
                return false;
        }
        return true;
    }
    
    private checkCorrect = () => {
        if (this.isCorrect()) {
            this.props.onCorrect();
        } else {
            console.log('feel bad', this.state.selected, this.props.answers.map(answer => (answer.length === this.props.correctAnswer)), this.props.answers);
        }
    }

    answerPressed(idx: number) {
        const { answers, correctAnswer } = this.props;
        const { selected } = this.state;
        if(!selected[idx] && answers[idx].length!=correctAnswer){//if the answer is wrong
            this.props.onIncorrect();
        }
        this.setState(({ selected }) => {
            const result = [...selected];
            result[idx] = !result[idx];
            return { selected: result };
        }, this.checkCorrect);
    }

    render() {
        const {
            question,
            answers,
            correctAnswer
        } = this.props;
        const {
            selected,
        } = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{question}</Text>
                </View>
                <View style={styles.answersContainer}>
                    {answers.map((answer, idx) => (
                        <MSAnswer
                            key={idx}
                            answer={answer}
                            selected={selected[idx]}
                            onPressed={this.answerPressed.bind(this, idx)}
                        />
                    ))}
                </View>
            </View>
        );
    }

}
