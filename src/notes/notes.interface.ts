export interface Note{
    id: string;
    title: string;
    content: string;
    category: string;
    isPinned: boolean;
    userId: string;
    userName?: string;
    readingTime: number;
    tags: string[];
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
    environment ?: string,
    maxNotes ?: number,
    isReadOnly ?: boolean
}