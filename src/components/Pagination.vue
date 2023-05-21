<template>
    <section>
        <div class="pagination-container">
            <div v-for="index in this.totalpagenumber" :key="index" @click="updateShowResult(index)" v-if="this.totalpagenumber > 1" >
                <span>{{index}}</span>
            </div>
        </div>
    </section>
</template>
<script>
import store from '../store/store'
export default {   
    name:"Pagination",
    props: ['maxshow'],
    data(){
        return{
            totalpagenumber:0,
            searchHistory:"",
            currentPage:0,
        }
    },
    mounted(){
        this.updateShowResult(0)
    },
    computed:{
        searchhistorys(){
            return this.searchHistory = store.getters.getsearchhistory
        }
    },
    watch:{
        searchhistorys(newLocations){
            this.updateShowResult(this.currentPage)
            this. getPagination(newLocations)
        }
        
    },
    methods:{
        //get the total number of pages
        getPagination(e){
            this.totalpagenumber = Math.ceil(e.length/this.maxshow)
        },
        //update the search display when page change
        updateShowResult(page){
            this.currentPage = parseInt(page)
            let maxshow = parseInt(this.maxshow)
            if(this.currentPage > 1){
                this.$emit('location',this.searchHistory.slice(this.currentPage*maxshow-maxshow,this.currentPage*maxshow));
            }else{
                this.$emit('location',this.searchHistory.slice(0,maxshow));
            } 
            console.log("searchHistory",this.searchHistory);

        }
    }
}

</script>