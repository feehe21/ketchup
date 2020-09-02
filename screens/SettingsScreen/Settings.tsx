import React from 'react';
import { View, Text } from 'react-native';
import SettingsScreen from './SettingsScreen';
import SettingsService from './SettingsService';
import SettingsProvider from './SettingsProvider';

function renderLoading() {
    // Render loading
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

export default function Settings() {
    return (
        <SettingsProvider renderLoading={renderLoading}>
            {settings => (
                <SettingsScreen
                    skills={settings}
                    switchFocus={(name: string, value: boolean) => SettingsService.setSkill(name, value)}
                />
            )}
        </SettingsProvider>
    )
}