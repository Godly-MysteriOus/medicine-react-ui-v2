import { makeAPICall,type contextPath} from "../../../utils/makeAPICall/makeAPICall";
import type {SortDirection} from 'ag-grid-community';
async function getFieldsByDataTypeId(dataTypeId:string){
    try{
        const {response} = await makeAPICall({contextPath:'ADMIN',endpoint:`lu-field/${dataTypeId}`,method:"GET"});
        return response;
    }catch(error){
        console.log(error);
    }
}
async function getMapLayoutDataTypeDefaultByDataTypeId(dataTypeId:string){
    try{
        const {response} = await makeAPICall({contextPath:'ADMIN',endpoint:`map-layout-data-type-default/${dataTypeId}`,method:"GET"});
        return response;
    }catch(error){
        console.log(error);
    }
}
async function getMapLayoutUserDataTypeDefaultByDataTypeId(dataTypeId:string){
     try{
        const {response} = await makeAPICall({contextPath:'ADMIN',endpoint:`map-layout-user-data-type-default/${dataTypeId}`,method:"GET"});
        return response;
    }catch(error){
        console.log(error);
    }
}
function filterColumnLayout(template:Array<string>,luField:any,renderer:Record<string,any>){
    const finalGridLayout:Array<object> = [];
    luField.data = luField.data.map((obj:Record<string,any>)=>{
        const newObj = {
            ...obj,
            cellRenderer : (renderer && renderer[obj.field]) ?? undefined,
        };
        return newObj;
        // return obj;
    });
    template.forEach((field:string,idx:number)=>{
        const data:Array<object> = luField.data;
        const obj = data.find((obj:any)=>obj.field==field);
        if(obj!=undefined && Object.keys(obj).length!=0){
            finalGridLayout.push(obj);
        }
    });
    return finalGridLayout;
}
async function createGridLayout(dataTypeId:string,renderer:Record<string,any>){
    try{
        const getUserLayout:any = await getMapLayoutUserDataTypeDefaultByDataTypeId(dataTypeId);
        const getLayout:any = await getMapLayoutDataTypeDefaultByDataTypeId(dataTypeId);
        const getLuFieldsByDataTypeId:any = await getFieldsByDataTypeId(dataTypeId);
        let finalGridLayout:Array<object> = [];
        if(getUserLayout.data.length==0){
            const defaultTemplate = getLayout.data[0].template.split(',');
            finalGridLayout =  filterColumnLayout(defaultTemplate,getLuFieldsByDataTypeId,renderer);
        }else{
            const userTemplate = getUserLayout.data[0].template(',');
            finalGridLayout = filterColumnLayout(userTemplate,getLuFieldsByDataTypeId,renderer);
        }
        return finalGridLayout;
    }catch(err){
        console.log(err);
    }
}
type SortObj = {
    colId : string,
    sort : SortDirection | undefined
}|undefined
async function getGridData(contextVal:contextPath,endpoint:string,filterObj:Object,sortObj:SortObj){
    try{
        console.log(filterObj,sortObj);
        let {response} = await makeAPICall({contextPath:contextVal,endpoint});
        response.data = response.data.map((item:any)=>{
            if(item.filter!=false){
                item.filter = item.filter.replaceAll('\"',"");
            }
            return item;
        })
        return response?.data||[];
    }catch(err){
        console.log(err);
    }
}
export {createGridLayout,getGridData};