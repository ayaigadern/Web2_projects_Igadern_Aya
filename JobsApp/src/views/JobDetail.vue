<template>
  <div class="details" v-if="showdetails">
      <h2>Détails du Job</h2>
      <p><strong>Description:</strong> {{ job.description }}</p>
      <p><strong>Salaire:</strong> {{ job.salaire }}</p>
      <p><strong>Date de création:</strong> {{ job.date_de_creation }}</p>
      <p><strong>Année d'expérience:</strong> {{ job.annee_experience }}</p>
      <button v-on:click="moins">Moins</button>


  </div>
  
</template>
<script>
export default{
  props:['id'],
  name:'JobDetail',
  data(){
      return{
          showdetails:true,
          job: {
            id: "100",
            titre: "Starry is beautiful",
            description: "GOAT",
            salaire: 1000000000000,
            date_de_creation: "09/03/2006",
            annee_experience: "19"
          },
      };
  },
  mounted() {
        fetch("http://localhost:3000/jobs/"+this.id)
        .then(resp => resp.json())
        .then(data => this.job = data)
        .catch(err => console.log(err))
    },
  methods:{
      moins(){
          this.$router.replace('/')
          this.$emit('close');
      }
  }
}
</script>
<style scoped>
.details {
  position: fixed; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff; 
  padding: 30px; 
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 60%; 
  z-index: 1000; 
  transition: all 0.3s ease; 
}

.details::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: -1;
}

.details h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  font-size: 27px;
}

.details p {
  margin: 10px 0;
  font-size: 1.1rem;
  font-size: 27px;
}

button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6a11cb; 
}
button:active {
  background-color: #2575fc; 
}
</style>
