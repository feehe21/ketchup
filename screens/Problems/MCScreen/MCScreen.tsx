import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { WHITE_GREY, GREY, GREEN, BLUE } from '../../colors';
import AnswerBlock from './AnswerBlock';

//import { DisappearingButton } from '../components/buttons';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	answersContainer: {//holds all answers
		flex: 3,
		backgroundColor: WHITE_GREY,
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "space-around",
		flexWrap: "wrap",
	},
	questionText: {
		fontSize: 50,
		color: BLUE,
	},
	equation: {
		fontSize: 75,
		color: BLUE,
	},
	questionContainer: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: GREY,
	},
	block: {
		flex: 1,
		backgroundColor: GREEN,
	},
});

interface Props {
	question: string;
	answers: string[];
	correctAnswer: number;
	onCorrect(): void;
	onIncorrect(): void;
}

export default class MCScreen extends React.Component<Props> {
	
	private answerPressed = (idx: number) => {
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
					{answers.map((answer, idx) => (
						<AnswerBlock
							key={idx}
							idx={idx}
							answer={answer}
							onPress={this.answerPressed}
						/>
                    ))}
				</View>
			</View>
		);
	}

}
