import { create } from "zustand";
export type AdminLuFieldSuportedOperation = 'open' | 'edit';
type AdminLuFieldManagementModalState = {
    open: boolean;
    operation: AdminLuFieldSuportedOperation;
};
interface ModalStateStore{
    openModal :AdminLuFieldManagementModalState
    openDeleteModal : boolean;
    setOpenModal : (val:AdminLuFieldManagementModalState)=>void;
    setOpenDeleteModal : (val:boolean)=>void;
}

export const useAdminLuFieldManagamentStore = create<ModalStateStore>((set)=>({
   openModal: {
        open: false,
        operation: 'open',
    },

    openDeleteModal: false,

    setOpenModal: (val) =>
        set({
            openModal: val,
            openDeleteModal: false,
        }),

    setOpenDeleteModal: (val) =>
        set({
            openDeleteModal: val,
            openModal: {
                open: false,
                operation: 'open',
            },
        }),

}));