
export interface Application {
  id: string;
  age: string;
  discord: string;
  username: string;
  playerDescription: string;
  goals: string;
  playtime: string;
  motivation: string;
  additionalInfo: string;
  status: 'Pending' | 'Accepted' | 'Denied';
  submittedAt: number;
}

export interface Mod {
  id: string;
  name: string;
  description: string;
  features: string[];
  link?: string;
  category?: string;
  version?: string;
}

export interface ModSuggestion {
  id: string;
  modName: string;
  reason: string;
  link?: string;
  submittedBy: string;
  discord: string;
  submittedAt: number;
}
