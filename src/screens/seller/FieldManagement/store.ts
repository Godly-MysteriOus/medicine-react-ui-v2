import { create } from "zustand";

interface GridState{
    openNewModal : boolean;
    openEditModal : boolean;
    openDeleteModal : boolean;
    setOpenNewModal : (val:boolean)=>void;
    setOpenEditModal : (val:boolean)=>void;
    setOpenDeleteModal : (val:boolean)=>void;
}

export const useAdminLuFieldManagamentGridStore = create<GridState>((set)=>({
    openNewModal : false,
    openEditModal : false,
    openDeleteModal : false,
    setOpenNewModal:(val)=> set({
        openNewModal : val,
        openEditModal : false,
        openDeleteModal : false,
    }),
    setOpenEditModal:(val)=>set({
        openEditModal : val,
        openNewModal : false,
        openDeleteModal : false,
    }),
    setOpenDeleteModal:(val)=>set({
        openDeleteModal : val,
        openNewModal : false,
        openEditModal : false,
    }),

}));