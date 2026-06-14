import { useState } from "react";
import type {ReactElement, CSSProperties} from 'react';
import { FormControl,FormLabel,FormHelperText,Input,Textarea,Checkbox,Switch,Radio,RadioGroup,Slider,Stack,Select,Option, selectClasses } from "@mui/joy";
import {Tooltip, type TooltipProps} from "@mui/joy";
import type { FormControlProps,FormLabelProps,FormHelperTextProps,InputProps,TextareaProps,CheckboxProps,SwitchProps,SliderProps,RadioProps,RadioGroupProps,SelectProps } from "@mui/joy";
import { IoIosInformationCircleOutline as InfoIcon } from "react-icons/io";
// import InfoIcon from "@mui/icons-material/Info";
import { IoIosWarning as ErrorIcon } from "react-icons/io";
import { fieldContainer,formLabel,defaultComponentStyle } from "./FieldStyles";
import fontFamilyList from "@utils/CSS/fontMap";
type InputType = | "input" | "textarea" | "checkbox" | "switch" |  "slider" | "radio" | "radioGroup" |"select";
type DisplayType = "vertical" | "horizontal";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
type ObjectSx = Record<string, unknown>;
const mergeSx = (defaultSx?: ObjectSx, customSx?: ObjectSx): ObjectSx|undefined => {
    if(!defaultSx) return customSx;
    if(!customSx) return defaultSx;
  return { ...defaultSx, ...customSx };
}

const defaultInputSx = (size:string) => {
    return{
        "--Input-placeholderOpacity": "0.5",
        "--Input-focusedHighlight": "0.15",
        '--Input-focusedThickness': '0.75px',
        width: "100%",
        "--Input-minHeight" : size==='sm' ? "1.75rem" : (size==='md'? "1.75rem" : "2.25rem"),
        "--Input-maxHeight" : size==='sm' ? "1.75rem" : (size==='md'? "1.75rem" : "2.25rem"),
        fontSize: size==='sm' ? "0.65rem" : (size==='md' ? "0.85rem" : "1rem"),
        // fontFamily: fontFamilyList.noto,
        // fontWeight : 500
    }
};
const defaultTextareaSx: ObjectSx = {
    "--Input-placeholderOpacity": "0.5",
    "--Input-focusedHighlight": "0.5",
    width: "100%"
};
const defaultCheckboxSx: ObjectSx = {};
const defaultSwitchSx: ObjectSx = {};
const defaultSliderSx: ObjectSx = {width: "100%"};
const defaultRadioSx: ObjectSx = {};
const defaultRadioGroupSx: ObjectSx = {};
const defaultSelectSx: ObjectSx = {
    width: "100%",
    [`& .${selectClasses.indicator}`]: {
        transition: '0.2s',
        [`&.${selectClasses.expanded}`]: {
        transform: 'rotate(-180deg)',
        },
    }
};

interface FieldV2Props {
    //Layout and Display
    displayType?: DisplayType;
    labelStyle?: CSSProperties;
    componentStyle?: CSSProperties;
    fieldContainerStyle?: CSSProperties;

    // Label and required
    label: string|ReactElement;
    required?: boolean;
    labelProps?: FormLabelProps;

    // Info Icon
    showInfoIcon?: boolean;
    infoDescription?: string;
    infoIcon?: ReactElement;
    tooltipProps?:TooltipProps; 
    //  Input Type and Props
    inputType?: InputType;
    inputProps?: InputProps;
    textareaProps?: TextareaProps;
    checkboxProps?: CheckboxProps;
    switchProps?: SwitchProps;
    sliderProps?: SliderProps;
    radioProps?: RadioProps;
    radioGroupProps?: RadioGroupProps;
    radioOptions?: { label: string; value: string|number }[];

    //Select /Dropdown
    selectProps?: SelectProps<any,any>;
    selectOptions?: { label: string; value: string|number; disabled?: boolean }[];
    selectMode?: "single" | "multiple";

    //Form Control and Helper
    formControlProps?: FormControlProps;
    formLabelProps?: FormLabelProps;
    formHelperTextProps?: FormHelperTextProps;

    // Error and Helper Text
    error?: boolean;
    errorText?:string;
    helperText?: string;
    errorTextIcon?: ReactElement;
    errorIconStyle?: CSSProperties;

    //Callbacks (optional)
    onChange?: (value: any) => void;
}

/**
 * FieldV2 Component
 * 
 *  A comprehensive, flexible field component supporting multiple input types with layout customization, validation state and helper utilities.
 * 
 *  Features : 
 *  - Multiple input types : input, textarea, checkbox, switch, slider, radio, select
 *  - Flexible layout : topdown(grid) or sideways (flex)
 *  - Required field indicator with red asterisk
 *  - Info icon with description and custom styling
 *  - Error handling with error icon and error text
 *  - Helper text display
 *  - Full props exposure for all MUI Joy FormControl components
 * 
 *  @component
 */

function FieldV2({
    displayType = "horizontal",
    labelStyle,
    componentStyle,
    fieldContainerStyle,
    label,
    required=false,
    labelProps : formLabelProps,
    showInfoIcon=false,
    infoDescription,
    infoIcon,
    tooltipProps,
    inputType="input",
    inputProps,
    textareaProps,
    checkboxProps,
    switchProps,
    sliderProps,
    radioProps,
    radioGroupProps,
    radioOptions,
    selectProps,
    selectOptions,
    selectMode="single",
    formControlProps,
    formHelperTextProps,
    error=false,
    errorText,
    helperText,
    errorTextIcon,
    errorIconStyle,
    onChange
}:FieldV2Props):ReactElement{
    //Determine the component to render based on inputType
    const renderInputComponent = ():ReactElement=>{
        switch(inputType){
            case "input":
                return (
                    <Input 
                        fullWidth
                        autoComplete="off"
                        size="sm"
                        variant="outlined"
                        error={error}
                        required={required}
                        slotProps={{
                            input: {
                            sx: {
                                // Hides arrows in Chrome, Safari, Edge, and Opera
                                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                                // Hides arrows in Firefox
                                '&[type=number]': {
                                MozAppearance: 'textfield',
                                },
                            },
                            },
                        }}
                        onChange={(e) => {
                            onChange?.(e.target.value);
                            inputProps?.onChange?.(e);
                        }} 
                        {...inputProps}
                        sx={mergeSx(defaultInputSx(inputProps?.size || 'sm'), inputProps?.sx as ObjectSx|undefined)}
                    />
                )
            case "textarea":
                return (
                <Textarea 
                    required={required}
                    onChange={(e) => {
                        onChange?.(e.target.value)
                        textareaProps?.onChange?.(e);
                    }} 
                    {...textareaProps}
                    sx={mergeSx(defaultTextareaSx, textareaProps?.sx as ObjectSx|undefined)}
                />
                );
            case "checkbox":
                return (
                    <Checkbox 
                        required={required}
                        onChange={(e) => {
                            onChange?.(e.target.checked)
                            checkboxProps?.onChange?.(e);
                        }} 
                        {...checkboxProps} 
                        sx={mergeSx(defaultCheckboxSx, checkboxProps?.sx as ObjectSx|undefined)}
                        />
                    );
            case "switch":
                return (
                    <Switch 
                        required={required}
                        onChange={(e) => {
                            onChange?.(e.target.checked)    
                            switchProps?.onChange?.(e);
                        }}
                        {...switchProps} 
                        sx={mergeSx(defaultSwitchSx, switchProps?.sx as ObjectSx|undefined)}
                    />
                );
            case "slider":
                return (
                    <Slider 
                        {...sliderProps} 
                        onChange={(e, value,activeThumb) => {
                            onChange?.(value)
                            sliderProps?.onChange?.(e, value,activeThumb);
                        }} 
                        sx={mergeSx(defaultSliderSx, sliderProps?.sx as ObjectSx|undefined)} 
                    />
                );
            case "radio":
                return (
                    <Radio 
                        required={required}
                        onChange={(e) => {
                            onChange?.(e.target.value)
                            radioProps?.onChange?.(e);
                        }} 
                        {...radioProps} 
                        sx={mergeSx(defaultRadioSx, radioProps?.sx as ObjectSx|undefined)} 
                    />
                );
            case "radioGroup":
                return (
                    <RadioGroup
                        onChange={(e) => {
                            onChange?.(e.target.value)
                            radioGroupProps?.onChange?.(e);
                        }}
                        {...radioGroupProps}
                        sx={mergeSx(defaultRadioGroupSx, radioGroupProps?.sx as ObjectSx|undefined)}
                    >
                        <Stack spacing={2}>
                            {radioOptions?.map((option) => (
                                <Radio 
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Stack>
                    </RadioGroup>
                );
            case "select":
                return (
                    <Select

                        indicator={<KeyboardArrowDown />}
                        size="sm"
                        onChange={(_event,value) => {
                            onChange?.(value)
                            selectProps?.onChange?.(_event,value);
                        }}
                        {...selectProps}
                        sx={mergeSx(defaultSelectSx, selectProps?.sx as ObjectSx|undefined)}
                    >
                        {selectOptions?.map((option) => (
                            <Option 
                                slotProps={{
                                    root:{
                                        sx:{minBlockSize:'0.2rem',fontSize:'0.7rem',fontFamily:fontFamilyList.poppins}
                                    }
                                }}
                                key={option.value} 
                                value={option.value} 
                                disabled={option.disabled}
                            >
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                );
            default:
                return(
                    <Input 
                        fullWidth
                        autoComplete="off"
                        size="sm"
                        variant="outlined"
                        error={error}
                        required={required}
                        slotProps={{
                            input: {
                            sx: {
                                // Hides arrows in Chrome, Safari, Edge, and Opera
                                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                                // Hides arrows in Firefox
                                '&[type=number]': {
                                MozAppearance: 'textfield',
                                },
                            },
                            },
                        }}
                        onChange={(e) => {
                            onChange?.(e.target.value);
                            inputProps?.onChange?.(e);
                        }} 
                        {...inputProps}
                        sx={mergeSx(defaultInputSx(inputProps?.size || 'sm'), inputProps?.sx as ObjectSx|undefined)}
                    />
                )
        }
    };

    const containerStyle:CSSProperties= 
        displayType==='horizontal'
            ? {...fieldContainer,...fieldContainerStyle}
            : {
                width : "100%",
                display : 'flex',
                flexDirection : "column",
                gap : "0.5rem",
                ...fieldContainerStyle
            }
            console.log(componentStyle);
            const inputContainerStyle : CSSProperties = displayType ==='horizontal' ? {...defaultComponentStyle,...componentStyle}
            :{
                width:"90%",
                // display: 'grid',
                // placeContent : 'center',
                ...componentStyle
            }

    return(
        <FormControl {...formControlProps} sx={{width:"100%",...formControlProps?.sx}} >
            <div style={containerStyle}>
                <FormLabel sx={{...formLabel,...labelStyle}} {...formLabelProps}>
                    <div style={{fontSize:"0.675rem"}}>
                        <span>{label}
                        {required  && <span style={{color:"red",fontWeight:"bold", marginLeft:'0.25rem'}}>* </span> }
                        </span>
                    </div>
                    
                </FormLabel>
                <Stack spacing={0} sx={inputContainerStyle}>
                    <div 
                        style={{display:'flex',gap:'0.25rem',width:'100%'}}
                    >
                            {renderInputComponent()}
                        {/* </span> */}
                        <span style={{display:'grid',placeContent:'center'}}>
                            {showInfoIcon && (
                                <Tooltip 
                                title={infoDescription} 
                                arrow 
                                color="neutral" 
                                variant="outlined" 
                                placement="right-end" 
                                size="md" 
                                {...tooltipProps}
                                sx={{color:'black',fontSize:'0.57rem',fontWeight:500,...tooltipProps?.sx}}
                                >
                                    {infoIcon || <InfoIcon size="18px" />}
                                </Tooltip>
                            )}
                        </span>
                    </div>
                    <HelperTextDisplay
                        error={error}
                        errorText={errorText}
                        helperText={helperText}
                        errorTextIcon={errorTextIcon}
                        errorIconStyle={errorIconStyle}
                        formHelperTextProps={formHelperTextProps}
                    />
                </Stack>
            </div>
        </FormControl>
    );
}

/**
 * Component to display helper text and error messages
 */

interface HelperTextDisplayProps{
    error?:boolean;
    errorText?:string;
    helperText?:string;
    errorTextIcon?:ReactElement;
    errorIconStyle?:CSSProperties;
    formHelperTextProps?:FormHelperTextProps;
}

function HelperTextDisplay({error=false,errorText, helperText,errorTextIcon,errorIconStyle,formHelperTextProps}:HelperTextDisplayProps):ReactElement{
    const defaultErrorIconStyle:CSSProperties = {
        margin : 0,
        padding : 0,
        marginRight: "0.1rem",
        display: "flex",
        alignItems : "center",
        ...errorIconStyle
    };

    const errorContext = error && errorText ? (
        <FormHelperText
            {...formHelperTextProps}
            sx={{
                fontSize:"0.63rem",
                display : "flex",
                alignItems : "center",
                margin : 0,
                marginTop: "0.1rem",
                color : "red",
                ...formHelperTextProps?.style
            }}
        >
            <span style={defaultErrorIconStyle}>
                {errorTextIcon || <ErrorIcon style={{fontSize:"0.9rem"}} />}
            </span>
            {errorText}
        </FormHelperText>
    ):null;

    const helperTextContent = !error && helperText ? (
        <FormHelperText
            {...formHelperTextProps}
            sx={{
                fontSize:"0.65rem",
                padding : "0.25rem",
                color : "#666",
                marginTop : "0.25rem",
                ...formHelperTextProps?.sx
            }}
        >
            {helperText}
        </FormHelperText>
    ) : null;

    return(
        <>
            {errorContext}
            {helperTextContent}
        </>
    )
};

export {FieldV2,type FieldV2Props,type InputType, type DisplayType}