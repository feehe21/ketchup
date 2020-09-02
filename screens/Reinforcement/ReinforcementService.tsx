import { AsyncStorage } from 'react-native';

type SkillName = string;
type SkillValue = boolean;

export type Reinforcement = {
    type: 'image' | 'video';
    uri: string;
}


const REINFORCEMENT_KEY = 'reinforcement';

type ReinforcementChangedHandler = (settings: Reinforcement[]) => void;

class ReinforcementService {
    private reinforcement?: Reinforcement[];
    private loadPromise?: Promise<Reinforcement[]>;
    private changeHandlers: ReinforcementChangedHandler[] = [];
    private updatePromise?: Promise<void>;
    
    watch(handler: ReinforcementChangedHandler) {
        this.changeHandlers.push(handler);
    }
    
    unwatch(handler: ReinforcementChangedHandler) {
        const idx = this.changeHandlers.indexOf(handler);
        if (idx >= 0) {
            this.changeHandlers.splice(idx, 1);
        }
    }
    
    private async loadMedia(): Promise<Reinforcement[]> {
        const reinforcements = await AsyncStorage.getItem(REINFORCEMENT_KEY);
        if (reinforcements === null)
            return [];
        let result: Reinforcement | null = null;
        try {
            result = JSON.parse(reinforcements);
        } catch (e) {
            console.log('error loading result', e);
        }
        if (result === null || !Array.isArray(result))
            return [];
        return result;
    }
    
    private async saveMedia(reinforcement: Reinforcement[]) {
        const serialized = JSON.stringify(reinforcement);
        await AsyncStorage.setItem(REINFORCEMENT_KEY, serialized);
    }
    
    private async updateMedia(mutator: (reinforcement: Reinforcement[]) => Reinforcement[]) {
        const reinforcement = await this.getMedia();
        const modified = mutator(reinforcement);
        this.reinforcement = modified;
        for (const handler of this.changeHandlers)
            handler(modified);
        
        if (this.updatePromise)
            this.updatePromise = this.updatePromise.then(() => this.saveMedia(modified));
        else
            this.updatePromise = this.saveMedia(modified);
        
        const updatePromise = this.updatePromise;
        try {
            await updatePromise;
        } finally {
            if (this.updatePromise === updatePromise)
                this.updatePromise = undefined;
        }
    }
    
    async getMedia(): Promise<Reinforcement[]> {
        if (this.reinforcement !== undefined) {
            return this.reinforcement;
        }
        
        if (this.loadPromise !== undefined)
            return this.loadPromise;
        
        const loadPromise = this.loadMedia();
        this.loadPromise = loadPromise;
        const reinforcement = await loadPromise;
        this.loadPromise = undefined;
        
        this.reinforcement = reinforcement;
        return reinforcement;
    }

    async getSingle(): Promise<Reinforcement>{
        const array = await this.getMedia();
        return array[Math.floor(Math.random()*array.length)];
    }
    
    async addMedia(type: 'image' | 'video', uri: string) {
        await this.updateMedia(reinforcements => [...reinforcements, { type, uri }]);
    }
}

export default new ReinforcementService();