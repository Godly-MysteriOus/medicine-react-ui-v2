import {create} from 'zustand';
import type { GridApi } from 'ag-grid-community';


interface GridState{
    selectedRows : Record<string,any>[];
    setSelectedRows : (rows:Record<string,any>[])=>void;
    gridApi: GridApi | null;
    setGridApi: (api: GridApi) => void;
    refreshGrid: () => void;
};

export const useSelectedRowStore = create<GridState>((set,get)=>({
    selectedRows:[],
    setSelectedRows:(rows)=>set({selectedRows:rows}),
    gridApi: null,
    setGridApi: (api) => set({ gridApi: api }),
    refreshGrid: () => {
        get().gridApi?.purgeInfiniteCache();
    },
}));