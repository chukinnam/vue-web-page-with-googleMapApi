
<template>
  <Timezone/>
  <LocationButtton/>
  <Googlemap/>
  <SearchHistory :locationArray = this.array />
  <Pagination maxshow=10 @location="location"/>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { Loader } from '@googlemaps/js-api-loader';
import LocationButtton from './components/LocationButton.vue'
import Googlemap from './components/Googlemap.vue';
import SearchHistory from './components/SearchHistory.vue';
import Timezone from './components/Timezone.vue';
import Pagination from'./components/Pagination.vue';
export default {
  name: 'App',
  data(){
    return{
      array:""
    }
  },
  components: {
    // HelloWorld
      LocationButtton,
      Googlemap,
      SearchHistory,
      Timezone,
      Pagination
  },
  methods:{
    location(value) {
      this.array=[]
      this.array = value;
   }
  }


}
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid black;
  padding: 20px;
}
.timezone-container .time{
  color: red;
}
.searchhistory-container .box{
  max-width: 60%;
  background-color: #80808080;
  margin: 20px auto;
}
.searchhistory-container h4{
  margin: 0;
  padding: 20px;
  text-align: center;
}
.searchhistory-container .location-cointer .location{
  margin: 0 10px;
  padding: 5px 0 ;
  border: 1px solid black;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  position: relative
}
.searchhistory-container .location-cointer .location span{
  margin-left: 30px;
  display: block;
}
.searchhistory-container .location-cointer .location input{
  position: absolute;
  left: 0px;
  top: 6px;
}
.searchhistory-container .delete-btn{
  padding: 0 0 10px 10px ;
}
.user-search-container .your-location{
  text-align: center;
  margin-bottom: 20px;
  
}
.pagination-container{
  display: flex;
  gap: 10px;
  justify-content: center;
}
.pagination-container div{
    text-align: center;
    height: 40px;
    width: 40px;
    border: 1px solid black;
    line-height: 40px;
    cursor: pointer;
}
</style>
