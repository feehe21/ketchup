import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button,
} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import MCNavigator from '../navigation/BottomTabNavigator';
import Problems from '../screens/Problems/Problems'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import {SpecialButton} from './components/buttons';


interface Props {
	navigation: any;
}

export default function HomeScreen(props: Props) {
	console.log('HomeScreen props' ,props);
	const navigation = props.navigation;
	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
				
				<View style={{height: '300%', justifyContent: 'center'}}>
					<View style={styles.buffer}></View>
						<View style={styles.headerContainer}>
								<Text style={styles.headerText}>Welcome to Ketchup Math!</Text>
						</View>
						<View style={styles.buffer}></View>
						<Button
							title="Let's Get Started!"
							// title="Go to Problems"
							onPress={() => {
								navigation.navigate('Problems')
								// MCNavigator(question='5+5',answers={['0','1','2','3']}, correctAnswer={2} )
							}}
						/>
				</View>

				{/* <Text>Click it</Text> */}

				{/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
				
				{/* <SpecialButton textValue='settings'/> */}

				{/* <Button onPress={() => {
						navigation.navigate('Details', {
								skills={['math','moreMath','extra Maths', 'bad Mathies', 'actually not math', 'super math', 'whoah, it is not math','oops i cant put an astericks']}
								focus={[true,false,false, true, false, true, true, true]}
							});
				}}title="Settings"/> */}

			</ScrollView>

		</View>
	);
}



HomeScreen.navigationOptions = {
	header: null,
};

function DevelopmentModeNotice() {
	if (__DEV__) {
		const learnMoreButton = (
			<Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
				Learn more
			</Text>
		);

		return (
			<Text style={styles.developmentModeText}>
				Development mode is enabled: your app will be slower but you can use
				useful development tools. {learnMoreButton}
			</Text>
		);
	} else {
		return (
			<Text style={styles.developmentModeText}>
				You are not in development mode: your app will run at full speed.
			</Text>
		);
	}
}

function handleLearnMorePress() {
	WebBrowser.openBrowserAsync(
		'https://docs.expo.io/versions/latest/workflow/development-mode/'
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignContent: 'center',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	newStyle: {
		color: 'green',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	testStyle: {
		color: 'purple',
		fontSize: 40,
		textAlign: 'right',
		fontWeight: 'bold',
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	headerText: {
		fontSize: 30,
		color: '#2e78b7',//blue
},
headerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: '#2e78b7',//blue
		borderWidth: 5,
		borderColor: '#9c9c9c',
},
buffer: {
	flex: 1,
},
});
