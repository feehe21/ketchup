import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Button,
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
        alignContent: "space-around"
    },
    answersBlockBuffer:{
        width:'130px',
        flexWrap:"wrap", 
        flexDirection:"row",
        justifyContent: "space-around"
    },
    answerBlock:{
        backgroundColor:'#f7f7f7', 
        width:'100px', 
        height:'100px', 
        flexWrap:"wrap", 
        flexDirection:"row",
        justifyContent: "space-around"
    },
    countingBlockBlue:{
        backgroundColor:'#2e78b7',
        width:'30px', 
        height:'30px'
    },
    countingBlockOrange:{
        backgroundColor:'#f57b42',
        width:'30px', 
        height:'30px'
    }
});

interface Props {
    question: string;
    answers: string[][];
    correct: number;
}

interface State {
    
}


export default class MSScreen extends Component<Props, State> {

    answerPressed(idx: number) {
        if (idx == this.props.correct) {
            alert('Yay you did it');
        } else {
            alert('Feel bad');
        }

        this.setState({ wasCorrect: (idx == this.props.correct) });
    }

    render() {
        const {
            question,
            answers,
            correct
        } = this.props;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{question}</Text>
                </View>
                <View style={styles.answersContainer}>
                    {answers.map((answer, idx) =>
                        // <Text>he</Text>
                        <TouchableHighlight onPress={this.answerPressed.bind(this, idx)}>
                            <View style={styles.answersBlockBuffer}>
                                <View style={styles.answerBlock}>
                                {answer.map((block, idx) => 
                                    {if(block='0'){
                                        <View style={styles.countingBlockBlue}></View>
                                    }else{
                                        <View style={styles.countingBlockOrange}></View>
                                    }}
                                    // <View style={styles.countingBlockBlue}></View>
                                )}
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                        
                        
                        
                        
                </View>
            </View>
        );
    }

}
