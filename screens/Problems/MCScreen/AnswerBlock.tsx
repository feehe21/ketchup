import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
} from 'react-native';
import { PALE_GREY, BLUE } from '../../colors';

//import { DisappearingButton } from '../components/buttons';

const styles = StyleSheet.create({
	answerText: {
		fontSize: 50,
		color: BLUE,
	},
	answerBlock: {//each answer
		width: '35%',
		height: '35%',
		backgroundColor: PALE_GREY,
		justifyContent: "center",
		alignItems: "center",
	},
});

interface Props {
	answer: string;
	idx: number;
	onPress(idx: number): void;
}

export default function AnswerBlock({ onPress, idx, answer}: Props) {
	const handlePress = React.useCallback(() => onPress(idx), [onPress, idx]);
	return (
		<TouchableHighlight style={styles.answerBlock} onPress={handlePress}>
			<View style={styles.answerBlock}>
				<Text style={styles.answerText}>{answer}</Text>
				{/* <Button onPress={this.answerPressed.bind(this, idx)} title={answer} /> */}
			</View>
		</TouchableHighlight>
	)
}