import {makeStyles} from '@mui/styles';
const useStyles = makeStyles(()=>({
    buttonContainer:{
        padding:'0.5rem 1.5rem',
        display:'flex',
        justifyContent:'space-between',
    },
    predefinedButton:{
        // border:'1px solid red',
        display:'flex',
        gap:'1rem'
    },
    passedButton:{
        // border : '1px solid black'
        display:'flex',
        gap:'1rem'
    }
}),{name:'AG-GRID',meta:'AG-GRID'})

export {useStyles};