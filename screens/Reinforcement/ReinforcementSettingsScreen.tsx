import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { Video } from 'expo-av';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';


import ReinforcementService, { Reinforcement } from '../../services/ReinforcementService';

//import { DisappearingButton } from '../components/buttons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    questionContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#9c9c9c',//grey
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
      },
      instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
      }, 
      button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 5,
      },
      buttonDelete: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
      }, 
      thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
      },
      error:{
        color: 'red',
      },
});

interface Props {
    
}

interface State {
    error?: string;
    media: Reinforcement[] | null;
    textInput: string;
}

export default class ReinforcementSettingsScreen extends Component<Props, State> {
    private mounted: boolean = false;
    state: State = { media: null, textInput: '' };
    
    componentDidMount() {
        this.mounted = true;
        ReinforcementService.watch(this.handleReinforcementsChanged);
        this.loadReinforcements();
    }
    
    componentWillUnmount() {
        this.mounted = false;
        ReinforcementService.unwatch(this.handleReinforcementsChanged);
    }
    
    private async loadReinforcements() {
        const media = await ReinforcementService.getMedia();
        this.setState({ media })
    }
    
    private handleReinforcementsChanged = (media: Reinforcement[]) => {
        this.setState({ media })
    }
    
    private openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!this.mounted)
            return;

        if (permissionResult.granted === false) {
            // alert('Permission to access camera roll is required!');
            this.setState({error: 'Permission to access camera roll is required!'});
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            base64: true,
        });

        console.log(pickerResult)
        if (pickerResult.cancelled === true || !this.mounted) {
            return;
        }
        
        
        const { uri } = pickerResult;

        this.setState({ error: undefined });
        ReinforcementService.addMedia('image', uri);
        // setSelectedImage({ localUri: pickerResult.uri });
    }

    handleChangeText = (text: string) => {
        this.setState({textInput: text});
    }
    
    handleVideoSubmit = () => {
        ReinforcementService.addMedia('video', this.state.textInput);
        this.setState({textInput:""});
    }
    clearMedia = () => {
        ReinforcementService.clearMedia();
    }

    render() {
        const {
            error,
            media = [],
            textInput,
        } = this.state;
        console.log(media)
        
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container2}>
                    {/* <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} /> */}
                    <Text>To upload reinforcement, click below</Text>
                    
                    { error && <Text style={styles.error}>{error}</Text> }

                    <TouchableOpacity onPress={this.openImagePickerAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Pick a photo</Text>
                    </TouchableOpacity>
                    <Text>Or copy and paste the link to a video here:</Text>
                    <Text>(Youtube videos will not work)</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '70%' }}
                        onChangeText={this.handleChangeText}
                        value={textInput}
                    />
                    <TouchableOpacity onPress={this.handleVideoSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Submit Video</Text>
                    </TouchableOpacity>
                    
                </View>
                <View>
                    {(media === null) ? null : media.map((img, idx) => {
                        if(img.type == "image"){
                            return (
                                <Image
                                    key={idx}
                                    source={{ uri: img.uri }}
                                    style={styles.thumbnail}
                                />
                            );
                        } else {
                            return (
                                <Video
                                    key={idx}
                                    source={{ uri: img.uri }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    style={{ width: 300, height: 300 }}
                                />
                            );
                        }
                    })}
                </View>
                <TouchableOpacity onPress={this.clearMedia} style={styles.buttonDelete}>
                        <Text style={styles.buttonText}>Delete All Media</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }

}
