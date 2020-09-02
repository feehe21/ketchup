import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import { createDndContext } from "react-native-easy-dnd";
import { WHITE_GREY } from '../colors';

const { Provider, Droppable, Draggable } = createDndContext();

const styles = StyleSheet.create({
    problemBlock: {
        flex: 4, 
        flexDirection: "column", 
        backgroundColor: WHITE_GREY,
        justifyContent: "space-around",
        alignContent: "space-around",
    },
    singleProblem: {
        flexDirection:"row",
        justifyContent: "flex-start",
        alignContent: "space-around",
        backgroundColor: '#9c9c9c',
        alignItems: 'center',
    },
    blockHolder:{
        backgroundColor: WHITE_GREY,
        // backgroundColor: '#00e632',//green
        width: 150,
        height: 100,
        flexWrap:"wrap", 
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    questionText:{
        fontSize:30,color: '#2e78b7'
    },
    countingBlock:{
        backgroundColor:'#2e78b7',
        width:'34%', 
        height:'40%'
    },
    smallCountingBlock:{
        backgroundColor:'#2e78b7',
        width:'26%', 
        height:'40%'
    },
    answerBlock: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "space-around",
        flexWrap: "wrap"
    },
    answer:{
        width: '85%', 
        // height: '75%', 
        backgroundColor: '#c7c7c7',
        justifyContent: "center",
        alignItems: "center"
    },
    answerText:{
        fontSize: 50,
        color: '#2e78b7'
    },
    collection:{
        // width: '100%',
        height: '100%',
        // backgroundColor: '#e80000',//red
    },
    answerBuffer:{
        flex:1,
    },
});

interface Props {
    question: string,
    answers: string[],
    correctAnswer?: number,
}

interface State {
    
}

export default class MatchScreen extends Component<Props, State> {

    answerDropped(questionIdx:number, answerIdx:number) {
        if (questionIdx == answerIdx) {
            alert('Yay you did it');
        } else {
            alert('Feel bad');
        }

        // this.setState({ wasCorrect: (idx == this.props.correctAnswer) });
    }

    render() {
        const {
            question,
            answers,
            correctAnswer
        } = this.props;
        const questions = question.split(",");

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Provider>
                    <View style={styles.problemBlock}>
                        {questions.map((q, idx) =>
                            
                                <Droppable
                                    onEnter={() => {
                                        console.log('Draggable entered');
                                    }}
                                    onLeave={() => {
                                        console.log('Draggable left');
                                    }}
                                    onDrop={({ payload }) => {
                                        console.log('Draggable with the following payload was dropped', payload);
                                        this.answerDropped(idx,payload);
                                    }}
                                    >
                                    {({ active, viewProps }) => {
                                        return (
                                        <Animated.View
                                            {...viewProps}
                                            style={[
                                            
                                                styles.singleProblem
                                            ,
                                            viewProps.style,
                                            ]}
                                        >
                                            {/* <Text style={{ fontWeight: "bold", color: "white" }}>Drop here</Text> */}
                                            <View style={styles.blockHolder}>
                                                <Text style={styles.questionText}>{q}</Text>
                                            </View>
                                            <View style={styles.collection}>

                                            </View>
                                            
                                        </Animated.View>
                                        );
                                    }}
                                </Droppable> 
                            
                            
                        )}
                            
                    </View>
                    <View style={styles.answerBlock}>
                        {answers.map((answer, idx) =>
                            <View style={styles.answerBuffer}>
                                <Draggable
                                    onDragStart={() => {
                                        console.log('Started draggging');
                                    }}
                                    onDragEnd={() => {
                                        console.log('Ended draggging');
                                    }}
                                    payload = {idx}
                                    >
                                    {({ viewProps }) => {
                                        return (
                                        <Animated.View
                                            {...viewProps}
                                            style={[viewProps.style, styles.answer]}
                                        >
                                            <View style={styles.answer}>
                                                <Text style={styles.answerText}>{answer}</Text>
                                            </View>
                                        </Animated.View>
                                        );
                                    }}
                                </Draggable>
                            </View>    
                            
                            
                        )}
                    </View>
                </Provider>
            </View>
        );
    }

}

