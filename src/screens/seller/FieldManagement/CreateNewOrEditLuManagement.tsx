import { Modal } from "@components/atomic-components/Modal/Modal";
import { useSelectedRowStore } from "@store/useGridStore";
import { useAdminLuFieldManagamentStore } from "@store/useAdminLuFieldManagement";
import { Button } from "@mui/joy";
import { FieldV2 } from "@components/atomic-components/Field/FieldV2";
import {useStyles} from './AdminLuFieldManagement.styles';
import {datatypeDropdown} from './api';
import { useEffect, useState } from "react";
import useDropdownStore from "@store/useDropdownStore";
export default function CreateNewOrEditLuField(){
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
    return(
        <Modal
            open={openModal.open}
            onClose={handleClose}
            footerContent={footerContent}
            headerContent={headerContent}
            bodyContent={bodyContent(dropdownVal)}
            size="md"
        ></Modal>
    );
};

function bodyContent(dropdownVal:any){
    return (
        <div>
            <FieldV2
                label={"Field"}
                required
            />
            <FieldV2
                label={"Header Name"}
                required
            />
            <FieldV2
                label={"Screen Name"}
                selectProps={{size:'sm'}}
                required
                inputType="select"
                selectOptions={dropdownVal}
            />
            <FieldV2
                label={"Minimum Column Width"}
                inputProps={{type:'number',endDecorator:'px'}}
            />
            <FieldV2
                label={"Flex (CSS Property)"}
                inputProps={{type:'number'}}
            />
            <FieldV2
                label={"Cell DataType"}
                // error
                inputType="select"
                selectOptions={[{label:'TEXT',value:'text'},{label:'NUMBER',value:'number'},{label:'BOOLEAN',value:'boolean'},{label:'DATE',value:'date'},{label:'DATESTRING',value:'dateString'},{label:'OBJECT',value:'object'}]}
                errorText="Damm Dumm"
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
                />
                <FieldV2
                    label={"Enable Filter"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                />
            </div>
            <div style={{display:'flex', flex:'1'}}>
                <FieldV2
                    label={"Enable Resizing"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                />
                <FieldV2
                    label={"Enable Column Editing"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                />
            </div>
            <div style={{display:'flex', flex:'1'}}>
                <FieldV2
                    label={"Pin Column"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                />
                <FieldV2
                    label={"Enable Floating Filter"}
                    inputType="checkbox"
                    labelStyle={{width:'60%'}}
                    componentStyle={{width:'30%'}}
                />
            </div>
            </fieldset>
        </div>
    )
}