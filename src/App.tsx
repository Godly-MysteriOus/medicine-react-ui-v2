
import Grid from './components/atomic-components/AGGrid/Grid';
import { Button } from '@mui/material';
import { buttonUseStyles } from './utils/CSS/button.styles';
import { useSelectedRowStore } from './components/atomic-components/AGGrid/useGridStore';
import type { ColDef } from 'ag-grid-community';

function App() {
  const selectedRow = useSelectedRowStore(state => state.selectedRows);
  const buttonMap: Array<React.ReactElement> = [];
  buttonMap.push(<Button size='small' color='primary' variant='outlined' style={buttonUseStyles.root} children={'New'} />);
  buttonMap.push(<Button disabled={selectedRow.length == 1 ? false : true} size='small' color='secondary' variant='outlined' style={buttonUseStyles.root} children={'Edit'} />);
  buttonMap.push(<Button disabled={selectedRow.length == 1 ? false : true} size='small' color='error' variant='outlined' style={buttonUseStyles.root} children={'Delete'} />);

  const filterColumnRenderer = (prop: any) => {
    if (typeof prop.value === 'boolean') {
      return <span style={{ color: 'lightgray' }}>No Filter applied</span>;
    } else if (typeof prop.value === 'string') {
      return prop.value.replaceAll('"',"");
    } else {
      return 'error';
    }
  };
  const minWidthRenderer =  (prop:any)=>{
    return `${prop.value} px`
  }
  const renderers: Record<string, any> = {
    filter: filterColumnRenderer,
    minWidth : minWidthRenderer
  };

  const fieldConfigMap: Record<string, Partial<ColDef> & { field: string }> = {
    filter: {
      field: 'filter',
      cellDataType: 'text',
    },
  };

  return (
    <>
      <p style={{ height: 90 }}>Hi</p>
      <div style={{ width: '100%', height: 450, display: 'flex', alignContent: 'flex-end', padding: '0.25rem 1rem' }}>
        <Grid
          dataTypeId={'6a13377f593cdd0677748058'}
          contextMap='ADMIN'
          endpoint='lu-field'
          buttonMap={buttonMap}
          rowSelection={{ mode: 'multiRow', checkboxes: true, enableClickSelection: false }}
          cellRenderer={renderers}
          fieldConfigMap={fieldConfigMap}
          style={{
            color: 'darkgray',
          }}
        />
      </div>
    </>
  );
}

export default App;
