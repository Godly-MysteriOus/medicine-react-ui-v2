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
            slotProps={{backdrop:{
                sx:{
                    backdropFilter : 'blur(3px)'
                }
            }}}
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