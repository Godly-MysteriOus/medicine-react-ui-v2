import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import type { CSSProperties } from '@mui/material/styles';
import type { ReactElement } from 'react';
import fontFamilyList from '../../../utils/CSS/fontMap';
import type React from 'react';
export type Size = 'small' | 'medium' | 'large';
const headerStyles = {
    fontSize : '0.5rem',
    fontWeight : 600,
    fontFamily : fontFamilyList.poppins,
    padding : '0.75rem 1.5rem'
}

const bodyStyle = {
    fontFamily : fontFamilyList.poppins,
    fontWeight : 300,
    color : 'black',
    fontSize : '0.75rem'
}

const root = (size: Size): React.CSSProperties => {
    return {
        maxWidth:size === "small"? "37%": size === "medium"? "42%": "52%",
        width:size === "small"? "35%": size === "medium"? "40%": "50%",
        minWidth: "300px",
        height: "fit-content",
        minHeight: "150px",
    };
};
interface ModalProps{
    open : boolean,
    handleClose : ()=>void,
    headerContent : ReactElement,
    headerStyle? : object,
    bodyContent : ReactElement,
    bodyStyle? : object,
    footerContent : ReactElement,
    footerStyle? : object,
    size : Size,
}
function Modal({open=false,handleClose,...props}:ModalProps){
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            slotProps={{paper:{sx:root(props.size)}}}
        >
            <div id="alert-dialog-title" style={{...headerStyles,...props.headerStyle}}>
                {props.headerContent}
            </div>
            <div style={{padding:'0.25rem 1.5rem'}}>
                <div id="alert-dialog-description" style={{...bodyStyle,...props.bodyStyle}}>
                    {props.bodyContent}
                </div>
            </div>
            <DialogActions style={{...props.footerStyle}}>
                {props.footerContent}
            </DialogActions>
        </Dialog>
    )
}
export {Modal};