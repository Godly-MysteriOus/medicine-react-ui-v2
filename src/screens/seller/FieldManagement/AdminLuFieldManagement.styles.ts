import { makeStyles } from "@mui/styles";
import fontFamilyList from "../../../utils/CSS/fontMap";

const useStyles = makeStyles(()=>({
    headerClass:{
        height:'10vh',
        width:'100%',
        borderBottom:'2px solid lightgray',
        fontSize: '1.25rem',
        fontWeight:'bolder',
        fontFamily:fontFamilyList.poppins,
        display:'grid',
        alignItems:'center',
    },
    gridHolder:{
        width: '100%', 
        maxHeight: '80vh',
        minHeight: '80vh', 
        display: 'flex', 
        alignContent: 'flex-end', 
        // border : '1px solid red', 
        overflow:'auto',
        padding:'1rem 0rem'
    }
}),{name:'AdminLuFieldManagement',meta:'AdminLuFieldManagement'});

export {useStyles};