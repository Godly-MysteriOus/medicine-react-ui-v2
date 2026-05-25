// import { authAction } from "@/store/slice/common/authenticationSlice";
// import store from "@/store/store";
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type contextPath = 'COMMON' | 'CUSTOMER' | 'SELLER' | 'DEFAULT'|'ADMIN';
export type {contextPath};
type contentType = 'application/json' | 'application/xml' | 'application/pdf' | 'application/octet-stream' | 'application/zip' | 'application/javascript' | 'application/ld+json' | 'application/x-www-form-urlencoded' | 'image/jpeg' | 'image/png' | 'multipart/form-data' | 'multipart/mixed' | 'application/vnd.ms-excel' | 'text/html' | 'text/plain' | 'text/csv';
type ContextPathMap = {
    [key in contextPath]: string;
}
export const ContextMap: ContextPathMap = {
    COMMON: '/common',
    CUSTOMER: '/customer',
    SELLER: '/seller',
    DEFAULT: '',
    ADMIN: '/admin'
}
console.log(import.meta.env.VITE_SERVER_URL);
const propertyConfig = {
    SERVER_URL : import.meta.env.VITE_SERVER_URL,
}
let csrfTokenCache:string = '';
console.log(csrfTokenCache);
const redirectWindowCall = (endpoint:string)=>{
    endpoint = endpoint.replaceAll("//",'/');
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // window.location.origin will not end with /
    window.location.href = window.location.origin+endpoint; 
}
interface MakeAPICallInterface{
    contextPath : contextPath,
    endpoint : string,
    method? : HTTPMethod,
    contentType? : contentType,
    timeout? : number,
    bodyContent? : object 
}
export const makeAPICall = async ({
    contextPath = 'COMMON', 
    endpoint, 
    method= 'GET', 
    contentType= 'application/json', 
    timeout= 5000, 
    bodyContent
}:MakeAPICallInterface) => {
    let origin:string = propertyConfig.SERVER_URL;
    origin = origin.endsWith('/') ? origin.slice(0,-1) : origin;
    const baseURL = origin + ContextMap[contextPath];
    endpoint = endpoint.replaceAll("//",'/');
    const finalURL = endpoint.startsWith('/') ? baseURL+endpoint : `${baseURL}/${endpoint}`;

    let headers: Record<string, string> = {
        'Content-Type': contentType
    }
    let response, request;
    // method type
    if(method!== 'GET'){
        if (!bodyContent || typeof bodyContent !== 'object') {
            throw new Error('body parameter must be an object');
        } else {
            if(Array.isArray(bodyContent)){
                // body content is an array
                throw new Error("Invalid body payload");
            }else{
                const keys = Object.keys(bodyContent);
                if(keys.length==0){
                    throw new Error("Body payload cannot be empty");
                }
            }
            if(!csrfTokenCache){
                csrfTokenCache = await getCsrfToken();
            }

            headers['x-csrf-token'] = csrfTokenCache;
            // const JWTToken = store.getState().authReducer.token;
            // if(JWTToken){
            //     headers['Authorization'] = JWTToken;
            // }
        }
    }
    let timedoutId;
    try{
        // API Timout
        const controller = new AbortController();
        timedoutId = setTimeout(()=>{
            console.log('Timing out API call : '+finalURL);
            return controller.abort();
        },timeout);

        // Making Request
        request = await fetch(finalURL,{
            headers : headers,
            signal: controller.signal,
            method: method,
            credentials : 'include',
            body : method!=='GET' ? JSON.stringify(bodyContent) : undefined,
        });
        

        // resolving Response
        switch (request.status) {
            case 401:
                // store.dispatch(authAction.logout());
                redirectWindowCall(`login`);
                break;
            case 429 :
            case 404 : 
            case 500 : 
                redirectWindowCall(`/error?${request.status}`);
                break;
            default:
                const responseType = request.headers.get("content-type");
                if(responseType?.includes("application/json")){
                    response = await request.json();
                }
                else if(responseType?.includes("text")){
                    response = await request.text();
                }
                else{
                    response = await request.blob();
                }
                break;
        }
        return { status: request.status, response: response };

    }catch(error:Error|any){
        if(error instanceof Error && error.name=='AbortError'){
            throw new Error('Request Timedout');
        }
        console.log(error);
       throw error;
    }finally{
        clearTimeout(timedoutId);
    }
}



async function getCsrfToken() {
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>{
        console.log('Timingout API '+`${propertyConfig.SERVER_URL}common/csrf-token`);
        return controller.abort();
    },5000);
    try{
        const req = await fetch(`${propertyConfig.SERVER_URL}common/csrf-token`,{
            headers:{
                'Content-Type' : 'application/json',
            },
            method : 'GET',
            signal : controller.signal,
            credentials : 'include',
            cache : 'no-cache',
        });
        const response = await req.json();
        console.log(response.csrfToken);
        return response.csrfToken;
    }catch(err){
        console.log('Error while getting CSRF Token');
        throw err;
    }finally{
        clearTimeout(timeoutId);
    }
}