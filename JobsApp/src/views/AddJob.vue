<template>
        <RouterLink class="nav" to="/" replace="true">Home</RouterLink>
        <div class="left">
<form class="Form" @submit.prevent="ajout">
  <label for="titre"><div>Titre d'emploi </div>
<input v-model="titre" type="text" required placeholder="Entrez le titre de l'emploi">
</label>
<label for="description"><div>Description</div> 
<input v-model="description" type="text" required placeholder="Entrez une description de l'emploi">
</label>
<label for="salaire"><div>Salaire</div> 
<input v-model="salaire" type="number" required placeholder="Entrez le salaire proposé">
</label>
<label for="date"><div>Date de création </div>
<input v-model="date" type="text" required placeholder="Entrez la date de création">
</label>
<label for="anne_experience"><div>Année d'expérience </div>
<input v-model="anne_experience" type="number" required placeholder="Entrez le nombre d'années d'expérience">
</label>

          <button type="submit" class="ajout" >click pour ajouter</button>
      </form></div>  
</template>
<script>


export default{
  name:"AddJob",
  props:["jobs"],
  data(){
      return{
          
          titre:"",
          description:"",
          salaire:0,
          date:"",
          anne_experience:0,




      };
  },
  methods:{
    async ajout() {
    const newJob = {
      titre: this.titre,
      description: this.description,
      salaire: this.salaire,
      date: this.date,
      anne_experience: this.anne_experience
    };

    try {
      const response = await fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du job');
      }

      alert('Job ajouté avec succès!');
      
      // Optionally reset form fields after successful submission
      this.titre = "";
      this.description = "";
      this.salaire = 0;
      this.date = "";
      this.anne_experience = 0;

    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue.');
    }
    this.$router.replace('/');
  },
}}
</script>
<style scoped>
.nav{
    width: 20%;
  padding: 20px 40px;
  background: linear-gradient(135deg, #6a11cb, #2575fc); 
  color: white;
  font-size: 25px;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); 
  transition: all 0.3s ease-in-out;
  letter-spacing: 1px; 
    
}

.nav:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb); 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-3px);
}
.nav:active {
  transform: scale(0.96);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


.Form{
  border: 2px solid black;
  border-radius: 15px; 
  border: 3px solid #ff758c;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
 margin-right: 10px;
  margin-top:30px;
  width: 50%;
  height: 430px;
  gap:10px;
  transition: all 0.3s ease-in-out;
  margin:0 auto;
  
}
.Form label{
  text-align: center;
  color: black;
  font-size:25px;
}
.Form input{
  width:80%;
  height: 20px;
}
.left{
  top: 0;          
  margin-top:145px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  

}
.ajout {
  position: sticky;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 15px 30px;
  background: linear-gradient(135deg, #ff7eb3, #ff758c); 
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 25px; 
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase; 
  box-shadow: 0 5px 12px rgba(255, 118, 136, 0.4); 
  transition: all 0.3s ease-in-out;
  letter-spacing: 1px; 
  display: flex;
  justify-content: center;
  align-items: center;
}


.ajout:hover {
  background: linear-gradient(135deg, #ff758c, #ff7eb3); /* Inversion des couleurs */
  box-shadow: 0 7px 18px rgba(255, 118, 136, 0.5);
  transform: translateY(-2px);
}


.ajout:active {
  transform: scale(0.95);
  box-shadow: 0 3px 8px rgba(255, 118, 136, 0.3);
}
.Form input::placeholder {
  color: #888; 
  font-style: italic; 
  text-align: center;
}

</style>
