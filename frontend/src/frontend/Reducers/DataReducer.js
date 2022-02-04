export const getDataReducer=(state={Data:[]},action)=>{
    switch(action.type){
        case 'GET_DATA_REQUEST':
            console.log("yo1")
            return {Data:[],
                loading:true
            }
            
            case 'GET_DATA_SUCCESS':
                console.log("yo2")
                return {Data:action.payload,
                    loading:false
                }
        default: return state
    }
}