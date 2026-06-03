import { create } from "zustand";
type ModalState = {
    open: boolean;
    operation: 'open' | 'edit';
};
interface ModalStateStore{
    openModal :ModalState
    openDeleteModal : boolean;
    setOpenModal : (val:ModalState)=>void;
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