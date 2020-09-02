import { AsyncStorage } from 'react-native';

type SkillName = string;
type SkillValue = boolean;

export type Settings = Record<SkillName, SkillValue>;

const defaultSkills: Settings = {
    'Addition 0-10': true,
    'Subtraction 0-10': false,
    'Counting 1-10': false,
    'Numeral Identification 1-10': true,
    'Addition 0-20': false,
    'Subtraction 0-20': true,
    'Reading 3 Number Places': true,
};

const SETTINGS_KEY = 'settings';

type SettingsChangedHandler = (settings: Settings) => void;

class SettingsService {
    private settings?: Settings;
    private loadPromise?: Promise<Settings>;
    private changeHandlers: SettingsChangedHandler[] = [];
    private updatePromise?: Promise<void>;
    
    watch(handler: SettingsChangedHandler) {
        this.changeHandlers.push(handler);
    }
    
    unwatch(handler: SettingsChangedHandler) {
        const idx = this.changeHandlers.indexOf(handler);
        if (idx >= 0) {
            this.changeHandlers.splice(idx, 1);
        }
    }
    
    private async loadSkills() {
        const settings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (settings === null)
            return defaultSkills;
        let result: Settings | null = null;
        try {
            result = JSON.parse(settings);
        } catch (e) {
            console.log('error loading result', e);
        }
        if (result === null)
            return defaultSkills;
        return result;
    }
    
    private async saveSkills(settings: Settings) {
        const serialized = JSON.stringify(settings);
        await AsyncStorage.setItem(SETTINGS_KEY, serialized);
    }
    
    private async updateSkills(mutator: (settings: Settings) => Settings) {
        const settings = await this.getSkills();
        const modified = mutator(settings);
        this.settings = modified;
        for (const handler of this.changeHandlers)
            handler(modified);
        
        if (this.updatePromise)
            this.updatePromise = this.updatePromise.then(() => this.saveSkills(modified));
        else
            this.updatePromise = this.saveSkills(modified);
        
        const updatePromise = this.updatePromise;
        try {
            await updatePromise;
        } finally {
            if (this.updatePromise === updatePromise)
                this.updatePromise = undefined;
        }
    }
    
    async getSkills(): Promise<Settings> {
        if (this.settings !== undefined) {
            return this.settings;
        }
        
        if (this.loadPromise !== undefined)
            return this.loadPromise;
        
        const loadPromise = this.loadSkills();
        this.loadPromise = loadPromise;
        const settings = await loadPromise;
        this.loadPromise = undefined;
        
        this.settings = settings;
        return settings;
    }
    
    async setSkill(skill: string, value: boolean) {
        await this.updateSkills(skills => ({ ...skills, [skill]: value }));
    }
}

export default new SettingsService();