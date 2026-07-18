export interface Note{
    id: number;
    title: string;
    content: string;
    category: string;
    isPinned: boolean;
}

export interface Stats{
    totalNotes: number;
    pinnedNotes: number;
    unpinnedNotes: number;
}

export interface Info{
    appName : string,
    version ?: string,
    status ?: string,
    environment ?: string
}