<template>
    <section class="google-map-container">
        <div class="googleMapDisplay" id="googleMapDisplay" style="position: relative; overflow: hidden; display: block; height: 400px; width: 100%;"></div>
    </section>
</template> 
<script>
import { forStatement } from '@babel/types'
import { passiveSupport } from 'passive-events-support/src/utils'
import store from '../store/store'
import location_icon from "../assets/location_icon.png"
export default {
    name:"Googlemap",
    data(){
        return{
            locationsValue:[],
            searchValue:[]
        }
            
    },
    mounted(){
        passiveSupport({ events: ['touchstart', 'touchmove'] })
    },
    computed:{
        locations(){
            return this.locationsValue=store.getters.getlocations
        },
        selected(){
            return this.searchValue=store.getters.getselectedhistory
        }
    },
    watch:{
        locations(newLocations){
            this.showAllLocationOnMap(newLocations)
        },
        selected(newLocations){
            this.showSelectedMarket(newLocations)
        }
    },
    methods:{
        showAllLocationOnMap(places){
            let map = new google.maps.Map(document.getElementById("googleMapDisplay"),{
               zoom: 15,
               center: new google.maps.LatLng(1,1),
               mapTypeId:google.maps.MapTypeId.ROADMAP
            });
            this.markers =[];
            this.markers.forEach((marker) => {
                this.markers.setMap(null);
            });
            this.markers=[];
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                const icon = {
                    url: location_icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };
                this.markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        },
        showSelectedMarket(places){
            let map = new google.maps.Map(document.getElementById("googleMapDisplay"),{
               zoom: 15,
               center: new google.maps.LatLng(1,1),
               mapTypeId:google.maps.MapTypeId.ROADMAP
            });
            const bounds = new google.maps.LatLngBounds();
            this.markers=[];
            this.markers.forEach((marker) => {
                this.markers.setMap(null);
            });
            this.markers=[];
                places.forEach(place => {
                    place.geometry.forEach(geom =>{
                        const icon = {
                            url: location_icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25),
                        };
                        this.markers.push(
                            new google.maps.Marker({
                                map,
                                icon,
                                position: geom.location,
                            })
                        );
                        if (geom.viewport) {
                        bounds.union(geom.viewport);
                        } else {
                        bounds.extend(geom.location);
                        }
                    })
                });
                map.fitBounds(bounds);
            
        }
    }
}
</script>