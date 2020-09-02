import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ReinforcementService, { Reinforcement } from '../../services/ReinforcementService';
import { Video, AVPlaybackStatus } from 'expo-av';


const styles = StyleSheet.create({
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
      },
});

/** Timeout in ms */
const REINFORCEMENT_TIMEOUT = 10000;

interface Props {
    score: number;
    onDone(): void,
}

interface State {
    media: Reinforcement | null,
}

export default class ReinforcementDisplayScreen extends Component<Props, State> {
    private mounted = false;
    private timerHandle?: number;
    
    state: State = {
        media: null,
    }
    
    private async loadMedia() {
        const media = await ReinforcementService.getSingle(this.props.score);
        if (!this.mounted)
            return;
        console.log(media);
        this.setState({ media });
        if (media.type !== 'video') {
            console.log(media, 'startTimer')
            this.startTimer();
        }
    }
    
    /** Start timer for onDone */
    private startTimer() {
        this.clearTimer();
        this.timerHandle = window.setTimeout(this.handleTimer, REINFORCEMENT_TIMEOUT);
    }
    
    /** Clear/cancel timer for onDone */
    private clearTimer() {
        if (this.timerHandle !== undefined) {
            window.clearTimeout(this.timerHandle);
            this.timerHandle = undefined;
        }
    }
    
    /** Called when reinforcement timer ticks */
    private handleTimer = () => {
        console.log('timer tick')
        this.props.onDone();
    }
    
    componentDidMount() {
        this.mounted = true;
        this.loadMedia();
    }
    
    componentWillUnmount() {
        this.mounted = false;
        this.clearTimer();
    }
    
    handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded && !Number.isNaN(status)) {
            
        }
        if (status.isPlaying && this.timerHandle === undefined) {
            console.log('is playing -> start timer')
            this.startTimer();
        }
        if (status.didJustFinish) {
            console.log('didJustFinish')
            this.clearTimer();
            this.handleTimer();
        }
        console.log('playback status', status);
    }
    
    render() {
        const { media } = this.state;
        
        if (media == null) {
            // Render loading
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
        if(media.type == 'image'){
            return (
                <Image
                    source={{ uri: media.uri}}
                    style={styles.thumbnail}
                />
            );
        }else{
            return (
                <Video
                    source={{ uri: media.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    onPlaybackStatusUpdate={this.handlePlaybackStatusUpdate}
                    style={{ width: 300, height: 300 }}
                />
            );
        }
    }

}
