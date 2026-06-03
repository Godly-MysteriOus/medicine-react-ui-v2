import { makeStyles } from "@mui/styles";
import fontFamilyList from "./utils/CSS/fontMap";

const useStyles = makeStyles(()=>({
    root:{
        minWidth : '100vw',
        maxWidth : '100vw',
        minHeight : '100vh',
        maxHeight : '100vh',
        overflow:'hidden'
    },
    header:{
        minHeight : '8vh',
        maxHeight : '8vh',
        width: '100%',
        display : 'flex',
        justifyContent: 'space-between',
        padding : '0.5rem 1rem',
        borderBottom : '2px solid darkgray',
        backgroundColor : '#0F172A',
        color:'#F8FAFC',
    },
    logoImageHolder:{
        width : '9vw',
        display : 'flex',
        alignItems : 'center',
        justifyContent:'center',
        '& img' : {
            width : '100%',
            height : 'fit-content'
        }
    },
    loggedInUserDetail : {
    },
    userName : {
        fontFamily : fontFamilyList.noto,
        fontSize : '0.7rem'
    },
    loggedInDetail : {
        fontFamily: fontFamilyList.montserrat,
        color : '#484848',
        fontSize : '0.65rem'
    },
    body:{
        width : '100%',
        minHeight : '92vh',
        maxHeight : '92vh',
        overflow:'hidden',
        display : 'flex',
        backgroundColor : '#F1F5F9'
    },
    navigationHolder : {
        width : '4.5vw',
        height : '92vh',
        borderRight : '1px solid #E2E8F0',
        overflowY : 'hidden',
        background:'#F8FAFC'
    },
    renderableContentBody : {
        width : '95.5vw',
        minHeight : '92vh',
        maxHeight : '92vh',
        overflowX : 'hidden',
        overflowY : 'auto',
        padding : '0.25rem 1rem'
    }
}),{name:'App',meta:'App'});

export {useStyles};