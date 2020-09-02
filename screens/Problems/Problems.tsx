import React from 'react';
import { View, Text } from 'react-native';
import MCScreen from './MCScreen';
import MSScreen from './MSScreen';
// import DDScreen from './DDScreen';
// import MatchScreen from './MatchScreen';
import ProblemsService, { Problem, ProblemType } from '../../services/ProblemsService';
import { Settings } from '../../services/SettingsService';
import SettingsProvider from '../SettingsScreen/SettingsProvider';
import ReinforcementDisplayScreen from './ReinforcementDisplayScreen';

// pull skill -> pull problem -> show problem on relevant screen -> record answer(correct/attempts) -> loop


function renderLoading() {
    // Render loading
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

const SCORE_ALPHA = 0.95;

interface Props {
    settings: Settings;
}

interface State {
    score: number;
    problem: Problem | null;
    reinforcement: boolean;
    incorrectYet: boolean;
}


class ProblemsInner extends React.Component<Props, State> {
    private mounted = false;
    
    state: State = {
        score: 0,
        problem: null,
        reinforcement: false,
        incorrectYet: false,
    }
    
    private async loadProblem() {
        const prevId = this.state.problem ? this.state.problem.id : undefined;
        const problem = await ProblemsService.getProblem(this.props.settings, prevId);
        if (!this.mounted)
            return;
        this.setState({ problem });
    }
    
    componentDidMount() {
        this.mounted = true;
        this.loadProblem();
    }
    
    componentWillUnmount() {
        this.mounted = false;
    }

    private handleCorrect = () => {
        const { incorrectYet } = this.state;
        console.log('Yay you did i1t');
        if(!incorrectYet){
            this.setState(({ score }) => ({ score: (score * SCORE_ALPHA + 1) }));
        }
        this.setState(({ reinforcement: true, problem: null,}));
        this.loadProblem();
        this.setState({incorrectYet:false})
    }
    
    handleIncorrect = () => {
        const { incorrectYet } = this.state;
        console.log('Feel bad');
        if(!incorrectYet){
            this.setState({incorrectYet:true})
            this.setState(({ score }) => ({ score: (score * SCORE_ALPHA + 0) }));
        }
    }

    private handleReinforcementDone = () => {
        this.setState({reinforcement:false});
    }
    
    render() {
        const { problem, reinforcement, score } = this.state;

        if(reinforcement){
            return(
                <ReinforcementDisplayScreen
                    onDone={this.handleReinforcementDone}
                    score={score}
                />
            )
        }
        
        if (problem === null) {
            // Render loading
            return renderLoading();
        }
        
        
        
        switch (problem.type) {
            case ProblemType.MULTIPLE_CHOICE:
                return (
                    <MCScreen
                        question={problem.question}
                        answers={problem.answers}
                        correctAnswer={problem.correctAnswer}
                        onCorrect={this.handleCorrect}
                        onIncorrect={this.handleIncorrect}
                    />
                )
            case ProblemType.MATCH:
                break;
            case ProblemType.DRAG_N_DROP:
                break;
            case ProblemType.MULTI_SELECTION:
                return (
                    <MSScreen
                        question={problem.question}
                        answers={problem.answers}
                        correctAnswer={problem.correctAnswer}
                        onCorrect={this.handleCorrect}
                        onIncorrect={this.handleIncorrect}
                    />
                )
                // return 'x';
            default:
                return (
                    <View>
                        <Text>Imagine if this worked</Text>
                    </View>
                );
        }
        
    }
}

export default function Problems() {
    return (
        <SettingsProvider renderLoading={renderLoading}>
            {settings => (<ProblemsInner settings={settings} />)}
        </SettingsProvider>
    )
}