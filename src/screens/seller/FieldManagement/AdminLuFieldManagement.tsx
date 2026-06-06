import Grid from "@components/atomic-components/AGGrid/Grid";
import { Button } from "@mui/joy";
import { useStyles } from "./AdminLuFieldManagement.styles";
import { useSelectedRowStore } from "@store/useGridStore";
import type { ColDef } from 'ag-grid-community';
import { useAdminLuFieldManagamentStore } from "../../../store/useAdminLuFieldManagement";
import DeleteLuFieldRecord from "./DeleteLuFieldRecord";
import { booleanRenderer } from "@utils/commonRendererUtils";
import CreateNewOrEditLuField from "./CreateNewOrEditLuManagement";

const minWidthRenderer =  (prop:any)=>{
  return `${prop.value} px`
}

const renderers: Record<string, any> = {
  // filter: filterColumnRenderer,
  minWidth : minWidthRenderer,
  sortable : booleanRenderer,
  resizable : booleanRenderer,
  editable : booleanRenderer,
  pinned : booleanRenderer
};


const fieldConfigMap: Record<string, Partial<ColDef> & { field: string }> = {
  filter: {
    field: 'filter',
    cellDataType: 'text',
  }
};
export default function AdminLuFieldManagement(){
  const classes = useStyles();
  const selectedRow = useSelectedRowStore(state => state.selectedRows);
  const {openModal,openDeleteModal,setOpenModal,setOpenDeleteModal} = useAdminLuFieldManagamentStore(state=>state);
  const buttonMap: Array<React.ReactElement> = [];
  buttonMap.push(<Button size='sm' color='primary' variant='outlined'  children={'New'} onClick={()=>setOpenModal({open:true,operation:'open'})} />);
  buttonMap.push(<Button disabled={selectedRow.length == 1 ? false : true} size='sm' color='warning' variant='outlined'  children={'Edit'} onClick={()=>setOpenModal({open:true,operation:'edit'})} />);
  buttonMap.push(<Button disabled={selectedRow.length == 1 ? false : true} size='sm' color='danger' variant='outlined'  children={'Delete'} onClick={()=>setOpenDeleteModal(true)}/>);

  return (
    <>
      {openModal.open && <CreateNewOrEditLuField/>}
      {openDeleteModal && <DeleteLuFieldRecord/>}
      <div className={classes.headerClass}>Lu Field Management Screen</div>
      <div className={classes.gridHolder}>
        <Grid
          dataTypeId={'6a13377f593cdd0677748058'}
          contextMap='ADMIN'
          endpoint='populate-lu-field'
          buttonMap={buttonMap}
          rowSelection={{ mode: 'multiRow', checkboxes: true, enableClickSelection: false }}
          cellRenderer={renderers}
          fieldConfigMap={fieldConfigMap}
          style={{
            height : '69vh'
          }}
        />
      </div>
    </>
  );
}