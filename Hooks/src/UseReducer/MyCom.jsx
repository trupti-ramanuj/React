


function reducer(state,action){
    switch(action.type){
        case 'incremented_age':
            return {age : state.age + 1};

        default:
            throw new Error(`Unknown action type: ${action.type}`)    
    }
}
export default reducer