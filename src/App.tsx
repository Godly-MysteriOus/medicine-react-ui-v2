
import Grid from './components/atomic-components/AGGrid/Grid';
import { Button } from '@mui/material';
import { buttonUseStyles } from './utils/CSS/button.styles';
import { useSelectedRowStore } from './components/atomic-components/AGGrid/useGridStore';
function App() {
  console.log(import.meta.env.VITE_SERVER_URL);
  const selectedRow = useSelectedRowStore(state=>state.selectedRows);
  console.log(...selectedRow);
  const buttonMap:Array<React.ReactElement> = [];
  buttonMap.push(<Button size='small' color='primary' variant='outlined' style={buttonUseStyles.root} children={'New'}/>)
  buttonMap.push(<Button size='small' color='primary' variant='outlined' style={buttonUseStyles.root} children={'Edit'}/>)
  buttonMap.push(<Button size='small' color='primary' variant='outlined' style={buttonUseStyles.root} children={'Delete'}/>)
  return (
    <>
      <p style={{height:90}}>Hi</p>
      <div style={{ width: '100%', height: 450, display:'flex',alignContent:'flex-end',padding:'0.25rem 1rem'}}>
        <Grid  dataTypeId={'6a13377f593cdd0677748058'} contextMap='ADMIN' endpoint='lu-field' buttonMap={buttonMap} rowSelection='multiRow'/>
      </div>
    </>
  );
}

export default App
