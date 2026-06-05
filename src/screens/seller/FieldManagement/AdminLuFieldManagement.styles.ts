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
    },
    modalHeaderStyle : {
        fontSize:'1.5rem'
    },  
    deleteModalBodyContentFocus:{
        fontWeight:'600'
    },
    deleteModalFooterContent:{
        display:'flex',
        justifyContent:'end',
        gap:'1rem', 
        padding : '0.5rem 1rem'
    },
    newOrEditModalFooterContent:{
        display: 'flex',
        justifyContent:'center',
        gap : '1rem'
    }
}),{name:'AdminLuFieldManagement',meta:'AdminLuFieldManagement'});

export {useStyles};