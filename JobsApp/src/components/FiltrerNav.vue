<template>
    <div id="app">
        <input type="text" v-model="recherche" placeholder="Filtrer par nom du Job" @input="filtrerJobs">
        <NavBarre />
        
    </div>
    
</template>
<script>
import NavBarre from '../components/NavBarre.vue';

export default{
    name:'FilterNav',
    components:{
        NavBarre,
    },
    data(){
        return{
            recherche:"",

        };
    },
    methods:{
        filtrerJobs(){
            this.$emit("filtrer", this.recherche.toLowerCase());
        }
    }
}
</script>
<style scoped>
input[type="text"] {
    width: 50%;
    padding: 12px 15px;
    font-size: 20px;
    border: 2px solid #007bff; 
    border-radius: 25px;
    outline: none;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
    display: flex;
    justify-content: center;
    margin:0 auto;
    margin-top:50px;

}

input[type="text"]:focus {
    border-color: #0056b3; /* Bleu foncé au focus */
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

input[type="text"]::placeholder {
    color: #999;
    font-style: italic;
}

input[type="text"]:hover {
    border-color: #0056b3;
}


</style>
