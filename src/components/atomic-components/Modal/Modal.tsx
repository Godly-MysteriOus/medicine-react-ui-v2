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
    modalProps? : JoyModalProps
}
function Modal({open,onClose,headerContent, headerProps={},bodyContent,bodyProps={},footerContent,size='sm',modalProps} :ModalProps){
    const widthCalc = size==='sm'? '35%' : (size==='md' ? '40%' : '50%');
    const maxWidthCalc = size==='sm'? '37%' : (size==='md' ? '42%' : '52%');
    const headerStyle = headerProps!=undefined ? (headerProps.sx ? headerProps.sx : {}) : {};
    if(headerProps!=undefined && headerProps.sx){
        delete headerProps.sx;
    }
    const modalStyle = modalProps!=undefined ? (modalProps.sx ? modalProps.sx : {}) : {};
    if(modalProps!=undefined && modalProps.sx){
        delete modalProps.sx;
    }
    delete modalProps?.sx;
    return (
        <JoyModal
            open={open}
            onClose={onClose}
            sx={{display:'flex',justifyContent:'center',alignItems:'center',...modalStyle}}
            slotProps={{backdrop:{
                sx:{
                    backdropFilter : 'blur(3px)'
                }
            }}}
            {...modalProps}
        >
            <Sheet
                variant="outlined"
                sx={{ width:widthCalc,maxWidth:maxWidthCalc,minWidth:'300px',maxHeight:'80%',overflowY:"auto",height:"fit-content", borderRadius: 'md', p: 1.5, boxShadow: 'md' }}
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