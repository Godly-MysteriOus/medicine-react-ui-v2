import { Modal } from "@components/atomic-components/Modal/Modal";
import { useSelectedRowStore } from "@store/useGridStore";
import { useAdminLuFieldManagamentStore } from "@store/useAdminLuFieldManagement";
import { Button } from "@mui/joy";
// import {useStyles,labelStyleLeft,componentStyleLeft,fieldStyleLeft,labelStyleRight,componentStyleRight,fieldStyleRight} from './AdminLuFieldManagement.styles';
// import { Field } from "@components/atomic-components/Field/Field";
import { FieldV2 } from "@components/atomic-components/Field/FieldV2";
import {useStyles} from './AdminLuFieldManagement.styles';
import { IoIosMail } from "react-icons/io";
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
    return(
        <Modal
            open={openModal.open}
            onClose={handleClose}
            footerContent={footerContent}
            headerContent={headerContent}
            bodyContent={bodyContent()}
            size="md"
        ></Modal>
    );
};

// function bodyContent(){
//     return(
//         <div>
//             <Field inputLabel={'Field'} inputType="input"  error={true} errorText="pidi badmash hogyi"/>
//             <Field inputLabel={'Header Name'} inputType="input" error errorText="pidi maha badmosh"/>
//             <Field inputLabel={'Screen Name will be a dropdown'} inputType="input"/>
//             <Field inputLabel={'Min Width'} inputType="input" inputProps={{type:'number'}}/>
//             <Field inputLabel={'Flex (CSS Property)'} inputType="input" inputProps={{type:'number'}}/>
//             <Field inputLabel={'Column Type'} inputType="input"/>
//             <Field inputLabel={'Tooltip Text'} inputType="input"/>
//             <Field inputLabel={'Tooltip Component'} inputType="input"/>
//             <Field inputLabel={'Cell Datatype'} inputType="input"/>
//             <fieldset>
//             <legend>Field Configuration</legend>
//             <div style={{display:'flex', flex:'1',padding:'0.5rem 0'}}>
//                 <Field 
//                     inputLabel={'Is Sorting Enabled'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}} 
//                     labelStyle={labelStyleLeft}
//                     componentStyle={componentStyleLeft}
//                 />
//                 <Field 
//                     inputLabel={'Is Filter Enabled'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}}
//                     labelStyle={labelStyleRight}
//                     componentStyle={componentStyleRight}
//                     fieldContainerStyle={fieldStyleRight}
//                 />
//             </div>
//             <div style={{display:'flex', flex:'1',padding:'0.5rem 0'}}>
//                 <Field 
//                     inputLabel={'Resizable'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}}
//                     labelStyle={labelStyleLeft}
//                     componentStyle={componentStyleLeft}
//                 />
                    
//                 <Field 
//                     inputLabel={'Editable'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}}
//                     labelStyle={labelStyleRight}
//                     componentStyle={componentStyleRight}
//                     fieldContainerStyle={fieldStyleRight}
//                 />
//             </div>
//             <div style={{display:'flex', flex:'1',padding:'0.5rem 0'}}>
//                 <Field 
//                     inputLabel={'Is Pinned'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}}
//                     labelStyle={labelStyleLeft}
//                     componentStyle={componentStyleLeft}
//                 />
//                 <Field 
//                     inputLabel={'Is Floating Filter Enabled'} 
//                     inputType="switch" 
//                     switchProp={{defaultChecked:true}}
//                     labelStyle={labelStyleRight}
//                     componentStyle={componentStyleRight}
//                     fieldContainerStyle={fieldStyleRight}
//                 />
//             </div>
//             </fieldset>
            
//         </div>
//     )
// }
function bodyContent(){
    return (
        <div>
            <FieldV2
                label={"Field"}
                required
                error 
                errorText="hihi khikhi"
                showInfoIcon
                infoDescription="damm daumm"
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
                selectOptions={[{label:'Hihi',value:'a'},{label:'Hihi',value:'a'},{label:'Hihi',value:'a'},{label:'Hihi',value:'a'},{label:'Hihi',value:'a'},{label:'Hihi',value:'a'},{label:'Hihi',value:'a'}]}
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
                required
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