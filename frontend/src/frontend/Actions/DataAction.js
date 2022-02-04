import {data} from '../../Data'
const getData=(search='')=>async(dispatch)=>{
    
        dispatch({type:'GET_DATA_REQUEST'});
        console.log("badiyaa")
        console.log(data)
        dispatch({type:'GET_DATA_SUCCESS',payload:data.filter(item=>{
            var address=item.Address.toUpperCase().trim();
            var pincode=item.Pincode;
            var city=item.City.toUpperCase().trim();
            if(address.startsWith(search) || city.startsWith(search) || pincode.startsWith(search)) return item;
        })
    });
    
    
}
export {getData}