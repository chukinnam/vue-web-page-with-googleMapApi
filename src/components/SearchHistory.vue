<template>
    <section class="searchhistory-container">
        <div class="box">
            <h4>Your Search History </h4>
            <div v-if="searchhistorys" class="delete-btn">
                <button @click="remove()">delete all selected markets</button>
            </div>
            <div class="location-cointer">
                <div class="location " v-for="loction in this.locationArray" v-if="loction !== null" :key="loction.id">
                    <input class="lcheckbox" type="checkbox" 
                        :value="loction.placename" 
                        :id="loction.id" 
                        @change="check(loction.id)"
                        :checked="loction.checked"
                        >
                    <span >{{ loction.placename }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import store from '../store/store'
   
export default{
    name: "SeachHistory",
    data(){
        return{
            selectedPlace:[],
            searchHistroy:'',
            selectedhistory:[]
        }
    },
    props: ['locationArray'],
    computed:{
        searchhistorys(){
            return this.searchHistory = store.getters.getsearchhistory
        }
    },
    methods:{
        //remove all seelcted marks
        remove(){
            this.selectedhistory=[]
            this.selectedPlace=[]
            this.searchHistory.forEach((value) => value.checked=false);
            store.commit('updateSelectedHistory', this.selectedhistory)
        },
        check(e){
            //update selected place array 
            if(this.selectedPlace.includes(e)){
                let filteredArray = this.selectedPlace.filter( arryValue => arryValue !== e)
                this.selectedPlace = filteredArray 
            }else{
                this.selectedPlace=[e,...this.selectedPlace]
            }

            // update selected history by selected place id 
            this.selectedhistory=[]
            this.selectedPlace.forEach(value=>{
                this.selectedhistory = [this.searchHistory.find((obj) => obj.id == value),...this.selectedhistory];
            });

            //update seachhistory locations checked stattus
            this.searchHistory.forEach(value=>{
                if(value.id == e){
                    value.checked = value.checked ? false : true
                }
            })
            store.commit('updateSelectedHistory', this.selectedhistory)
        }

    }
}
</script>



