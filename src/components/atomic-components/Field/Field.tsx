// import { FormControl, FormHelperText, FormLabel,Input } from "@mui/joy";
// import { makeStyles } from "@mui/styles";
// import {Box} from '@mui/joy';
// import { useMemo, type ReactElement } from "react";
// import fontFamilyList from "@utils/CSS/fontMap";
// import fieldStyles from "./FieldStyles";
// import mergeClasses from "@utils/CSS/mergeClass";
// type InputSize = 'sm' | 'md' | 'lg';
// interface FieldProps{
    
// }
// interface FielldProp{
//     label? : string,
//     error? : boolean,
//     startIcon? : ReactElement,
//     endIcon? : ReactElement,
//     errorText?: ReactElement|string,
//     errorTextIcon? : ReactElement,
//     helperText : string|ReactElement,
//     size? : InputSize,
//     placeHolder? : string,
//     type? : string,
//     style? : any,
//     showForgetPassword? : boolean,
//     linkToResetPassword? : string,
//     onForgetPasswordClick? : (val:boolean)=>void,
//     [key: string]: any,
//     inputRef? : React.RefObject<HTMLInputElement|null>,
// }
// export default function Field({
//     label,
//     error,
//     startIcon,
//     endIcon,
//     errorText='',
//     helperText='',
//     errorTextIcon,
//     size = 'sm',
//     placeHolder = 'Enter Text Here .....',
//     type = 'text',
//     style = {},
//     showForgetPassword = false,
//     linkToResetPassword = '#',
//     inputRef,
//     onForgetPasswordClick,
//     ...inputProps
// }:FielldProp){
//     const mergedCSS = mergeClasses(fieldStyles,style);
//     console.log(mergedCSS);
//     const useStyle = useMemo(()=>makeStyles(({...mergedCSS}),{name:'FieldCSS',meta:'FieldCSS'}),[]) ;
//     const classes = useStyle();
//     console.log(classes);
//     const inputStyle = {
//         '--Input-focusedThickness': '0.05rem',
//         ...style,
//     }
//     return(
//         <FormControl error={error} sx={{ padding : '0.4rem 0.2rem'}}>
//             <FormLabel sx={{display:'flex',justifyContent : 'space-between',alignItems:'center',width:'100%'}}>
//                 <div style={{fontSize:'0.75rem',fontFamily:fontFamilyList.montserrat}}>
//                     {label}
//                 </div> 
//                 {showForgetPassword ? 
//                     <Box
//                         component="span"
//                         onClick={()=>onForgetPasswordClick?.(true)}
//                         sx={{...fieldStyles.linkStyle,...style?.linkStyle}}
//                     >
//                         <span className={classes.forgotPassword}>Forgot your Password ?</span>
//                     </Box> : undefined
//                 }
//             </FormLabel>
//             <Input 
//                 size={size} 
//                 startDecorator={startIcon} 
//                 endDecorator={endIcon} 
//                 placeholder={placeHolder} 
//                 type={type} 
//                 sx={inputStyle}
//                 slotProps={{ 
//                     input: {
//                         ref : inputRef,
//                     }
//                 }}
//                 {...inputProps} 
//                 />
            
//             {error ?
//                 <FormHelperText>
//                     <div className={classes.errorIconContainer}>
//                         <span className={classes.errorIconHolder}>{errorTextIcon}</span>
//                         <span className={classes.errorTextHolder}>{errorText}</span>
//                     </div>
//                 </FormHelperText>
//             : undefined}
//             {(!error && helperText) ? 
//                 <FormHelperText>
//                     <span className={classes.errorTextHolder}>{helperText}</span>
//                 </FormHelperText>
//             : undefined}
//         </FormControl>
//     )
// }

import { FormControl,FormLabel,FormHelperText,Input,Textarea,Checkbox,Switch } from "@mui/joy";
import type { FormControlProps,FormLabelProps,FormHelperTextProps,InputProps,TextareaProps,CheckboxProps,SwitchProps } from "@mui/joy";
import type { ReactElement } from "react";
type InputType = 'input' | 'textarea' | 'checkbox' | 'switch';
import { fieldContainer,formLabel,defaultComponentStyle } from "./FieldStyles";
import {deepMerge} from "@utils/CSS/mergeClass";
import type { CSSProperties } from "@mui/styles";
interface FieldProps{
    formControlProps? : FormControlProps,
    formLabelProps? : FormLabelProps,
    formHelperTextProps? : FormHelperTextProps,
    inputProps? : InputProps,
    inputLabel : ReactElement|string,
    errorTextIcon? : ReactElement,
    errorText? : string,
    error?: boolean,
    displayType? : 'sideways' | 'topdown',
    textareaProps? : TextareaProps,
    checkBoxProps? : CheckboxProps,
    switchProp? : SwitchProps,
    inputType : InputType; 
    labelStyle? : CSSProperties,
    componentStyle? : CSSProperties
    fieldContainerStyle? : CSSProperties,
};

function Field({formControlProps,formLabelProps,formHelperTextProps,inputLabel,inputProps,errorTextIcon,errorText,error=false,displayType='sideways',textareaProps,switchProp,checkBoxProps,inputType='input',labelStyle,componentStyle,fieldContainerStyle}:FieldProps){
    const inputComponent = <Input fullWidth autoComplete="false" size="sm" {...inputProps}/>;
    const checkboxComponent = <Checkbox  {...checkBoxProps}/>;
    const switchComponent = <Switch {...switchProp}/>;
    const textareaComponent = <Textarea  {...textareaProps}/>;
    const componentToRender = (inputType:InputType)=>{ 
        switch (inputType) {
            case "input":
                return inputComponent;
            case "checkbox" : 
                return checkboxComponent;
            case "switch" : 
                return switchComponent;
            case "textarea" : 
                return textareaComponent;
        }
    }
    return(
        <FormControl {...formControlProps} sx={{width:'100%',}}>
            {
                displayType==='sideways' ? 
                <div style={deepMerge(fieldContainer,fieldContainerStyle||{})}>
                    <FormLabel sx={{...formLabel,...labelStyle}} {...formLabelProps}>{inputLabel}</FormLabel>
                    <div style={{...defaultComponentStyle,...componentStyle}}>
                        {componentToRender(inputType)}
                        <ErrorTextDisplay 
                            error={error} 
                            errorText={errorText} 
                            inputProps={inputProps} 
                            errorTextIcon={errorTextIcon}
                            formHelperTextProps={formHelperTextProps}
                        />
                    </div>
                </div> 
                : <div>
                    <FormLabel {...formLabelProps}>{inputLabel}</FormLabel>
                    <div style={{width:'100%'}}>
                        {componentToRender(inputType)}
                        <ErrorTextDisplay 
                            error={error} 
                            errorText={errorText} 
                            inputProps={inputProps} 
                            errorTextIcon={errorTextIcon}
                            formHelperTextProps={formHelperTextProps}
                        />
                    </div>
                </div>
            }
        </FormControl>
    )
};
interface ErrorTextDisplayProps{
    error?:boolean,
    errorText? : string,
    errorTextIcon? : ReactElement,
    inputProps? : InputProps,
    formHelperTextProps? : FormHelperTextProps
}
function ErrorTextDisplay({error=false,errorText,errorTextIcon,inputProps,formHelperTextProps,...props}:ErrorTextDisplayProps){
    const fontSizeCalc = inputProps ? (inputProps.size==='sm' ? "0.65rem" : (inputProps.size==='md' ? "": "")) : "0.65rem";
    return(
        <div>
            {error && errorText ? 
                <FormHelperText {...formHelperTextProps} style={{fontSize: fontSizeCalc, display:'flex',alignItems:'center',padding:"0rem 0.25rem",color:'red'}}>
                    {errorTextIcon}{errorText}
                </FormHelperText> 
            : undefined
            }
        </div>
    )    
};

export {Field};
export type {InputType}