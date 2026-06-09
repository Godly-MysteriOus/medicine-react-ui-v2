import type { CSSProperties } from "@mui/styles";
import fontFamilyList from "@utils/CSS/fontMap";

 export const fieldContainer={
    width: '100%',
    height: 'fit-content',
    padding: '0.5rem 0.6rem',
    display: 'flex',
    justifyContent:'space-around',
    alignItems: 'flex-start',
}
export const formLabel = {
    width: '30%' ,
    fontWeight:550 ,
    fontFamily:fontFamilyList.montserrat,
    fontSize:'0.65rem',

    padding : '0.5rem 0rem'
}
export const defaultComponentStyle:CSSProperties = {
    width : '60%',
    display : 'flex',
    flexDirection:'column',
    justifyContent: 'center',

}