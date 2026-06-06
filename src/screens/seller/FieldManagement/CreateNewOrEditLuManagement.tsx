import { Modal } from "@components/atomic-components/Modal/Modal";
import { useSelectedRowStore } from "@store/useGridStore";
import { useAdminLuFieldManagamentStore } from "@store/useAdminLuFieldManagement";
import { Button } from "@mui/joy";
import {useStyles} from './AdminLuFieldManagement.styles'
export default function CreateNewOrEditLuField(){
    const classes = useStyles();
    const {selectedRows,refreshGrid} = useSelectedRowStore(state=>state);
    const {setOpenModal,openModal} = useAdminLuFieldManagamentStore(state=>state);
    function handleSubmit(){
        // API call to create or edit based on the operation type in openModal.operation
        // if openModal.operation is 'open' then create else edit using selectedRows[0] data
        // after successful API call, refresh the grid and close the modal
        console.log('API call to ',openModal.operation=='open' ? 'create' : 'edit',' the record with data : ',openModal.operation=='open' ? 'new data' : selectedRows[0]);
        refreshGrid();
        setOpenModal({open:false,operation:'open'});
    } 
    function handleClose(){
        setOpenModal({open:false,operation:openModal.operation});
    }
    const footerContent = <span className={classes.newOrEditModalFooterContent}>
        <Button size="sm" color="primary" variant="solid" onClick={handleSubmit} children={openModal.operation=='open' ? "Create" : "Edit"}/>
        <Button size="sm" color="danger" variant="outlined" onClick={handleClose} children="Cancel"/>
    </span>
    const headerContent = <span>{openModal.operation=='open' ? "Create New Lu Field" : "Edit Lu Field"}</span>
    const bodyContent = openModal.operation=='open' ? <span>Form to create new Lu Field</span> : <span>Form to edit Lu Field with pre-filled data for <span className={classes.deleteModalBodyContentFocus}>Field name : {selectedRows[0]?.field}</span> used for <span className={classes.deleteModalBodyContentFocus}>Screen name : {selectedRows[0]?.dataTypeId.shortname}</span></span>
    return(
        <Modal
            open={openModal.open}
            onClose={handleClose}
            footerContent={footerContent}
            headerContent={headerContent}
            bodyContent={bodyContent}
            size="md"
        ></Modal>
    );
};