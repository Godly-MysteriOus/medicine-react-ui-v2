import { useAdminLuFieldManagamentGridStore } from "./store";
import {useSelectedRowStore} from "../../../components/atomic-components/AGGrid/useGridStore";
import { Modal } from "../../../components/atomic-components/Modal/Modal";
import { useCallback } from "react";
import { Button } from "@mui/material";
import { useStyles } from "./AdminLuFieldManagement.styles";
import { makeAPICall } from "../../../utils/makeAPICall/makeAPICall";
export default function DeleteLuFieldRecord(){
    const {selectedRows,refreshGrid} = useSelectedRowStore(state => state);
    const {openDeleteModal,setOpenDeleteModal} = useAdminLuFieldManagamentGridStore(state=>state);
    const classes = useStyles();
    const handleModalClose = useCallback(()=>{
        setOpenDeleteModal(false);
    },[]);
    const handleSubmit = useCallback(async()=>{
        try{
            console.log('API call to delete the record with id : ',selectedRows[0]._id);
            const {status,response} = await makeAPICall({contextPath:'ADMIN',endpoint:'lu-field',method:'DELETE',bodyContent:{_id:selectedRows[0]?._id}});
            console.log(status,response);
            if(status==200){
                console.log('Deleted successfully');
                refreshGrid();
            }
        }catch(err){
            console.log(err);
        }finally{
            handleModalClose();
        }
    },[selectedRows]);
    const headerContent = <span className={classes.deleteModalHeaderStyle}>Delete Lu Field Record</span>
    const bodyContent = <span>You are about to delete the record with <span className={classes.deleteModalBodyContentFocus}>Field name : {selectedRows[0]?.field}</span> used for <span className={classes.deleteModalBodyContentFocus}>Screen name : {selectedRows[0]?.dataTypeId.shortname}</span>. Are you sure you want to proceed?</span>
    const footerContent = <span className={classes.deleteModalFooterContent}>
        <Button size="small" color="error" variant="contained" onClick={handleSubmit} children="Yes, Delete"/>
        <Button size="small" color="primary" variant="outlined" onClick={handleModalClose} children="No, Keep it"/>
    </span>

    return(
        <Modal  
            open={openDeleteModal} 
            handleClose={handleModalClose}
            headerContent={headerContent}
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    )
}