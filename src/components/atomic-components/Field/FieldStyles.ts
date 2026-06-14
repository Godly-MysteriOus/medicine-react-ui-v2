import type { CSSProperties } from "@mui/styles";
import fontFamilyList from "@utils/CSS/fontMap";

 export const fieldContainer={
    width: '100%',
    height: 'fit-content',
    padding : "0.5rem 0rem",
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    // border : '1px solid red'
}
export const formLabel:CSSProperties = {
    width: '30%' ,
    fontWeight:550 ,
    fontFamily:fontFamilyList.montserrat,
    fontSize:'0.65rem',

    padding : '0.25rem 0rem',
    display:'flex',
    alignItems:'start',
    // border : '1px solid red',
    margin : 'auto 0',
    // border : "1px solid black"
}
export const defaultComponentStyle:CSSProperties = {
    width : '60%',
    // border : "1px solid green",
}