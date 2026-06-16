import { makeAPICall } from "@utils/makeAPICall/makeAPICall";
export const datatypeDropdown = async()=>{
    try{
        const {status,response} = await makeAPICall({contextPath:'ADMIN',endpoint:'data-type',method:'GET'});
        const arr:Array<any> = [];
        if(status===200){
            response.data.forEach((item:any )=> {
                const obj = {
                    label : item.shortname,
                    value : item._id
                };
                arr.push(obj);
            });
        }
        return arr;
    }catch(err){
        console.log(err);
        return [];
    }
};