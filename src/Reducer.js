export const initialState={
    basket:[],
    user:null
}
const reducer=(state,action)=>{
switch (action.type) {
    case 'EMPTY_BASKET':
        return{
            ...state,
            basket:[]
        };
    case 'SET_USER':
        return{
          ...state,
          user:action.user
        };
    case 'ADD_TO_BASKET':
        return{
            ...state,
            basket:[...state.basket,action.item],
        };
    case 'REMOVE_PRODUCT':
        const index=state.basket.findIndex((basketitem)=>
            basketitem.id===action.id
        );
          let newbasket=[...state.basket];  
        if(index>=0)
        {
            newbasket.splice(index,1);
        }
        else
        {
            console.warn("doesn't able to remove")
        }
        return{
            ...state,
            basket:newbasket
        }
    default:
        return state;
}
}
export default reducer;