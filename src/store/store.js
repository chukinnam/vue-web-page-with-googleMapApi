
import{createStore} from "vuex"
export default createStore({
    state(){
        return{
            locations:"",
            searchhistory:"",
            selectedhistory:"",
        }
    },
    getters:{
        getlocations:function(state){
            return state.locations
        },
        getsearchhistory:function(state){
            return state.searchhistory
        },
        getselectedhistory:function(state){
            return state.selectedhistory
        }

    },
    mutations:{
        setLocations:function(state,newvalue){
            state.locations = newvalue
        },
        setSearchHistory:function(state,newvalue){
            state.searchhistory = newvalue
        },
        updateSearchHistory:function(state,newvalue){
            newvalue.forEach(value => {
                state.searchhistory= state.searchhistory.filter((obj) => obj.id !== value);
            });
        },
        updateSelectedHistory:function(state,newvalue){
            state.selectedhistory=[];
            state.selectedhistory=newvalue;
        }

    },

})