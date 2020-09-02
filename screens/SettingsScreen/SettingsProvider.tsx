import React from 'react';
import SettingsService, { Settings } from '../../services/SettingsService';

interface Props {
    renderLoading?: () => React.ReactNode;
    children: (settings: Settings) => React.ReactNode;
}

interface State {
    settings: Settings | null;
}

export default class SettingsProvider extends React.Component<Props, State> {
    private mounted = false;
    
    state: State = {
        settings: null,
    }
    
    private async loadSettings() {
        const settings = await SettingsService.getSkills();
        if (!this.mounted)
            return;
        this.setState({ settings });
    }
    
    componentDidMount() {
        this.mounted = true;
        SettingsService.watch(this.handleSettingsChanged);
        this.loadSettings();
    }
    
    componentWillUnmount() {
        this.mounted = false;
        SettingsService.unwatch(this.handleSettingsChanged);
    }
    
    private handleSettingsChanged = (settings: Settings) => {
        this.setState({settings});
    }
    
    render() {
        const { settings } = this.state;
        if (settings === null) {
            // Render loading
            const { renderLoading } = this.props;
            return renderLoading ? renderLoading() : null;
        } else {
            return this.props.children(settings);
        }
    }
}