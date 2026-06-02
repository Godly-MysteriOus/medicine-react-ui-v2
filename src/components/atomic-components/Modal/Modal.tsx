import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { CSSProperties } from '@mui/material/styles';
import type { ReactElement } from 'react';
import fontFamilyList, {type FontFamilyList} from '../../../utils/CSS/fontMap';
import type React from 'react';

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
interface ModalProps{
    open : boolean,
    handleClose : ()=>void,
    headerContent : ReactElement,
    headerStyle? : object,
    bodyContent : ReactElement,
    bodyStyle? : object,
    footerContent : ReactElement,
    footerStyle? : object
}
function Modal({open=false,handleClose,...props}:ModalProps){
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
        >
            <div id="alert-dialog-title" style={{...headerStyles,...props.headerStyle}}>
                {props.headerContent}
            </div>
            <div style={{padding:'0.25rem 1.5rem', width : '80%'}}>
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