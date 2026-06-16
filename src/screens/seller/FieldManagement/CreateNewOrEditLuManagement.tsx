import { Modal } from "@components/atomic-components/Modal/Modal";
import { useSelectedRowStore } from "@store/useGridStore";
import { useAdminLuFieldManagamentStore, type AdminLuFieldSuportedOperation } from "@store/useAdminLuFieldManagement";
import { Button } from "@mui/joy";
import { FieldV2 } from "@components/atomic-components/Field/FieldV2";
import {useStyles} from './AdminLuFieldManagement.styles';
import {datatypeDropdown} from './api';
import { useEffect, useState } from "react";
import useDropdownStore from "@store/useDropdownStore";
export default function CreateNewOrEditLuField({ mode }: { mode: AdminLuFieldSuportedOperation }){
    const classes = useStyles();
    const {selectedRows,refreshGrid} = useSelectedRowStore(state=>state);
    const {setOpenModal,openModal} = useAdminLuFieldManagamentStore(state=>state);

    const fetchDropdown = useDropdownStore(state=>state.fetchData);
    const [dropdownVal,setDropdownVal] = useState<Array<any>>([]);
    useEffect(()=>{
        const loadOptions = async()=>{
            try{
                const data= await fetchDropdown('lu-field','data-type',datatypeDropdown);
                setDropdownVal(data);
            }catch(err){
                console.error("Failed to load roles", err);
                setDropdownVal([]);
            }
        }
        loadOptions();
    },[fetchDropdown]);
    function handleSubmit(){
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
    return(
        <Modal
            open={openModal.open}
            onClose={handleClose}
            footerContent={footerContent}
            headerContent={headerContent}
            bodyContent={bodyContent(dropdownVal,selectedRows[0],mode)}
            size="md"
        ></Modal>
    );
};

function bodyContent(dropdownVal:any,record:Record<string,any>,mode:AdminLuFieldSuportedOperation){
    return (
        <div>
            <FieldV2
                label={"Field"}
                required
                inputProps={{defaultValue:(mode==="edit" ? record?.field:undefined)}}
            />
            <FieldV2
                label={"Header Name"}
                required
                inputProps={{defaultValue : (mode==="edit" ? record?.headerName : undefined)}}
            />
            <FieldV2
                label={"Screen Name"}
                selectProps={{ size: 'sm', value: mode === 'edit' ? record?.dataTypeId?._id : undefined }}
                required
                inputType="select"
                selectOptions={dropdownVal}

            />
            <FieldV2
                label={"Minimum Column Width"}
                inputProps={{type:'number',endDecorator:'px',defaultValue:(mode==='edit' && record?.minWidth)}}
            />
            <FieldV2
                label={"Flex (CSS Property)"}
                inputProps={{type:'number', defaultValue:(mode==='edit'&& record?.flex)}}
            />
            <FieldV2
                label={"Cell DataType"}
                // error
                inputType="select"
                selectOptions={[{label:'TEXT',value:'text'},{label:'NUMBER',value:'number'},{label:'BOOLEAN',value:'boolean'},{label:'DATE',value:'date'},{label:'DATESTRING',value:'dateString'},{label:'OBJECT',value:'object'}]}
                errorText="Damm Dumm"
                selectProps={{defaultValue:(mode==='edit' ? record?.cellDataType : undefined)}}
            />
            <br />
            <fieldset style={{padding:'0rem 1.5rem'}}>
                <legend>Field Configuration</legend>
            <div style={{display:'flex', flex:'1'}}>
                <FieldV2
                    label={"Enable Sorting"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.sortable)}}
                />
                <FieldV2
                    label={"Enable Filter"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.filter)}}
                />
            </div>
            <div style={{display:'flex', flex:'1'}}>
                <FieldV2
                    label={"Enable Resizing"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.resizable)}}
                />
                <FieldV2
                    label={"Enable Column Editing"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.editable)}}
                />
            </div>
            <div style={{display:'flex', flex:'1'}}>
                <FieldV2
                    label={"Pin Column"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.pinned)}}
                />
                <FieldV2
                    label={"Enable Floating Filter"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                    checkboxProps={{defaultChecked:(mode==='edit' && record?.floatingFilter)}}
                />
            </div>
            </fieldset>
        </div>
    )
}