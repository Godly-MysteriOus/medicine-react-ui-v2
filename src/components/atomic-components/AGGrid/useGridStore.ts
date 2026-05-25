import {create} from 'zustand';

interface GridState{
    selectedRows : Record<string,any>[];
    setSelectedRows : (rows:Record<string,any>[])=>void
};

export const useSelectedRowStore = create<GridState>((set)=>({
    selectedRows:[],
    setSelectedRows:(rows)=>set({selectedRows:rows})
}));