<template>
    <section class="user-search-container">
        <button @click="onSearch()" id="getlocation-btn">
            <span>Get Your Location </span>
        </button>
        <span v-if="yourLocation"> Your Location : {{yourLocation }}</span>
       
        <div class="your-location">
                <input type="text" id="inputAddress" v-model="location">
            <button @click="search()">
                <span>search</span>
            </button>
        </div>
        
    </section>
</template>
<script>
import axios from "axios";
import store from "../store/store"
    export default {
        name: 'LocationButton',
        data(){
            return{
                location:"",
                yourLocation:"",
                searchBox:"",
                searchHistory:[],
                id:0
            }
        },
        mounted(){
            this.searchBox = new google.maps.places.SearchBox(document.getElementById("inputAddress"));
            this.searchBox.addListener("places_changed", () => {
            let places = this.searchBox.getPlaces();
            
            if(places){
                if(places.length == 1){
                    places.forEach((place) => {
                        let obj = {id: this.id+1,placename:place.formatted_address,geometry:[place.geometry]}
                        this.searchHistory = [obj,...this.searchHistory]
                        this.id+=1
                    })
                }else if(places.length > 1){
                    let array =[]
                    
                    places.forEach((place) => {
                         array = [place.geometry,...array]
                    });
                    let obj = {id: this.id+1,placename:this.location,geometry:array}
                    this.searchHistory = [obj,...this.searchHistory]
                    this.id+=1
                }
                    store.commit('setSearchHistory',this.searchHistory)   
                    store.commit('setLocations', places)
                
                }
            })
           
        },
        methods:{
            onSearch(){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(
                        position=>{
                                this.getAddress(position.coords.latitude,position.coords.longitude)
                        },
                        error=>{
                            console.log(error.message);
                        } 
                    );       
                }else{
                    console.log("browser not support geo API");
                }
            },
            getAddress(lat ,long){
                axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBXEvdPycvGui6QCvpVuVqaRWeaXaPjPto")
                .then(response=>{
                    if(response.data.error_message){
                        console.log(response.data.error_message);
                    }else{
                        this.yourLocation = response.data.results[0].formatted_address 
                    }
                })
                .catch(error=>{
                    console.log(error.message);
                })
            },
            search(){
                var input = document.getElementById('inputAddress');
                google.maps.event.trigger(input, 'focus', {});
                google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
                google.maps.event.trigger(this, 'focus', {});
            }
        }
       
        
    }

</script>