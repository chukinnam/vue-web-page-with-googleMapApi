<template>
    <section class="timezone-container">
        <b>Last Search Location Time:</b>
        <span class="time">{{ localtime }}</span>
    </section>
</template>
<script>
import axios from 'axios';
import store from '@/store/store';
export default{
    name: "Timezone",
    data(){
        return{
            localtime:'',
            timelooper:''
        }
    },
    computed:{
        locations(){
            return store.getters.getlocations
        }
    },
    watch:{
        locations(newLocations){
            this.gettimezone(newLocations)
        }
    },
    methods:{
        gettimezone(value){
            clearInterval(this.timelooper)
            let lat
            let lng 
            let timeStamp = (Date.now() || new Date().getTime())/1000;
            value.forEach(element => {
                lat = element.geometry.location.lat();
                lng = element.geometry.location.lng()
            });
            let self = this
            axios.get(" https://api.geoapify.com/v1/geocode/reverse?lat="+ lat +"&lon="+ lng +"&format=json&apiKey=317880e4fa7142919807662e66c8590d")
                .then(response=>{
                    this.timelooper = setInterval(function(){
                        const date = new Date()
                       
                    let mytime = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone:response.data.results[0].timezone.name}));   
                    self.localtime = mytime
                    },1000);
                })
                .catch(error=>{
                    console.log(error.message);
                })
        }
    }
    }
</script>
