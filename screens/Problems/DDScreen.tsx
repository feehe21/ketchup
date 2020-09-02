import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    View,
    Animated,
} from 'react-native';
// import Draggable from 'react-native-draggable';
import { createDndContext } from "react-native-easy-dnd";

const { Provider, Droppable, Draggable } = createDndContext();

const styles = StyleSheet.create({
    questionBlock:{
        flex:1,justifyContent: "center",alignItems: "center",backgroundColor:'#f7f7f7'
    },
    questionText:{
        fontSize:30,color: '#2e78b7'
    },
    middleBlock:{
        flex: 4,
        flexDirection: "column",
        backgroundColor:'#b3b3b3',
        justifyContent: "space-around",
        alignContent: "space-around",
        flexWrap: "wrap",
    },
    bottomBlock:{
        flex: 1,
        // flexDirection: "row",
        // justifyContent: "space-around",
        // alignContent: "space-around",
        // flexWrap: "wrap",
    },
    box:{
        width: '40px',
        height: '40px',
        backgroundColor: '#2e78b7',
        justifyContent: "center",
        alignItems: "center",
    }
});

interface Props {
    question: string;
    answers?: string[];
    correctAnswer: number;
    
}

interface State {
    wasCorrect?: boolean;
    // counter: number;
    numBlocks: number;
}

export default class DDScreen extends Component<Props, State> {

    state: State = { numBlocks: 0 };
    
    checkCorrect = () => {
        if (this.state.numBlocks == this.props.correctAnswer) {
            alert('Yay you did it');
        } else {
        }

        // this.setState({ wasCorrect: (blocks.length == this.props.correctAnswer) });
        
    }
    
    handleDrop = ({ payload }: any) => {
        console.log('Draggable with the following payload was dropped', payload);
        this.setState(({ numBlocks }) => ({ numBlocks: (numBlocks + 1) }), this.checkCorrect);
        this.state.numBlocks
    }

    render() {
        const {
            question,
            correctAnswer
        } = this.props;
        const {
            numBlocks,
        } = this.state;
        // const {
        //     counter
        // }= this.state

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.questionBlock}>
                    <Text style={styles.questionText}>{question}</Text>
                </View>
                <Provider>
                    {/* <View style={styles.middleBlock}> */}
                        <Droppable
                            onEnter={() => {
                                console.log('Draggable entered');
                            }}
                            onLeave={() => {
                                console.log('Draggable left');
                            }}
                            onDrop={this.handleDrop}
                        >
                            {({ active, viewProps }) => (
                                <Animated.View
                                    {...viewProps}
                                    style={[
                                    
                                        styles.middleBlock
                                    ,
                                    viewProps.style,
                                    ]}
                                >
                                    <Text style={{ fontWeight: "bold", color: "white" }}>Drop here</Text>
                                    
                                    {Array(numBlocks).map((_, idx) => (
                                        <View style={styles.box} key={idx}></View>
                                    ))}
                                    
                                </Animated.View>
                            )}
                        </Droppable>
                    {/* </View> */}
                    <View style={styles.bottomBlock}>
                        {/* <View style={styles.box}/> */}
                        {/* <Draggable x={500} y={50}> */}
                            {/* <View style={styles.box}/> */}
                        {/* </Draggable> */}
                        <Draggable
                            onDragStart={() => {
                                console.log('Started draggging');
                            }}
                            onDragEnd={() => {
                                console.log('Ended draggging');
                            }}
                            payload="my-draggable-item"
                            >
                            {({ viewProps }) => {
                                return (
                                <Animated.View
                                    {...viewProps}
                                    style={[viewProps.style, styles.box]}
                                >
                                    {/* <View style={styles.box}/> */}
                                </Animated.View>
                                );
                            }}
                        </Draggable>
                        
                    </View>
                </Provider>
            </View>
        );
    }

}
