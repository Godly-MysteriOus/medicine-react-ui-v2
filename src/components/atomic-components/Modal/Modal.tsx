// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import type { ReactElement } from 'react';
// import fontFamilyList from '../../../utils/CSS/fontMap';
// import type React from 'react';
// export type Size = 'small' | 'medium' | 'large';
// const headerStyles = {
//     fontSize : '0.5rem',
//     fontWeight : 600,
//     fontFamily : fontFamilyList.poppins,
//     padding : '0.75rem 1.5rem'
// }

// const bodyStyle = {
//     fontFamily : fontFamilyList.poppins,
//     fontWeight : 300,
//     color : 'black',
//     fontSize : '0.75rem'
// }

// const root = (size: Size): React.CSSProperties => {
//     return {
//         maxWidth:size === "small"? "37%": size === "medium"? "42%": "52%",
//         width:size === "small"? "35%": size === "medium"? "40%": "50%",
//         minWidth: "300px",
//         height: "fit-content",
//         minHeight: "150px",
//     };
// };
// interface ModalProps{
//     open : boolean,
//     handleClose : ()=>void,
//     headerContent : ReactElement,
//     headerStyle? : object,
//     bodyContent : ReactElement,
//     bodyStyle? : object,
//     footerContent : ReactElement,
//     footerStyle? : object,
//     size : Size,
// }
// function Modal({open=false,handleClose,...props}:ModalProps){
//     return(
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//             role="alertdialog"
//             slotProps={{paper:{sx:root(props.size)}}}
//         >
//             <div id="alert-dialog-title" style={{...headerStyles,...props.headerStyle}}>
//                 {props.headerContent}
//             </div>
//             <div style={{padding:'0.25rem 1.5rem'}}>
//                 <div id="alert-dialog-description" style={{...bodyStyle,...props.bodyStyle}}>
//                     {props.bodyContent}
//                 </div>
//             </div>
//             <DialogActions style={{...props.footerStyle}}>
//                 {props.footerContent}
//             </DialogActions>
//         </Dialog>
//     )
// }
// export {Modal};

import * as React from 'react';
import JoyModal, {type  ModalProps as JoyModalProps } from '@mui/joy/Modal';
import { Typography, type TypographyProps } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/joy';
interface ModalProps{
    open : boolean,
    onClose : ()=>void,
    headerContent : React.ReactElement,
    headerProps? : TypographyProps,
    bodyContent : React.ReactElement,
    bodyProps? : TypographyProps,
    footerContent : React.ReactElement,
    size? : 'sm' | 'md' | 'lg';
}
function Modal({open,onClose,headerContent, headerProps,bodyContent,bodyProps,footerContent,size='sm'}:ModalProps){
    const widthCalc = size==='sm'? '35%' : (size==='md' ? '40%' : '50%');
    const maxWidthCalc = size==='sm'? '37%' : (size==='md' ? '42%' : '52%');
    const headerStyle = headerProps!=undefined ? headerProps.sx : {};
    delete headerProps?.sx;
    console.log(headerStyle);
    return (
        <JoyModal
            open={open}
            onClose={onClose}
            sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
            <Sheet
                variant="outlined"
                sx={{ width:widthCalc,maxWidth:maxWidthCalc,minWidth:'300px',height:"fit-content", borderRadius: 'md', p: 1.5, boxShadow: 'md' }}
            >
                <Typography
                    component="h3"
                    id="modal-title"
                    level="body-md"
                    textColor="inherit"
                    sx={{ fontWeight: 'lg', mb: 1, color:'#353535',...headerStyle, display:'flex',justifyContent:'space-between',alignItems:'center'}}
                    {...headerProps}
                >
                   {headerContent}
                   <IconButton onClick={onClose} size='sm'><CloseIcon fontSize='large' /></IconButton>
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" level='body-sm' {...bodyProps}>
                    {bodyContent}
                </Typography>
                <Typography sx={{paddingTop:2}}>
                    {footerContent}
                </Typography>
            </Sheet>
        </JoyModal>
    )
};

export {Modal};