<template>
  <RouterLink class="nav" to="/" replace="true">Home</RouterLink>

  <div>
    <form class="Form" @submit.prevent="envoyer">
      <label>Entrer l'emploi que vous souhaitez supprimer :
        <input type="text" v-model="supprimer" required>
      </label>
      <button type="submit" class="ajout" :disabled="!supprimer">Cliquez pour supprimer</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SupJob',
  props: ["jobs"],
  data() {
    return {
      supprimer: ""
    };
  },
  methods: {
    async envoyer() {
  if (!this.supprimer.trim()) {
    alert("Veuillez entrer un titre valide !");
    return;
  }

  try {
    // 1. Récupérer tous les jobs pour trouver l'ID correspondant au titre
    const response = await fetch("http://localhost:3000/jobs");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des jobs !");
    }
    
    const jobs = await response.json();
    const job = jobs.find(j => j.titre.toLowerCase() === this.supprimer.toLowerCase());

    if (!job) {
      alert("Job non trouvé !");
      return;
    }

    // 2. Supprimer le job en utilisant son ID
    const deleteResponse = await fetch(`http://localhost:3000/jobs/${job.id}`, {
      method: "DELETE"
    });

    if (!deleteResponse.ok) {
      throw new Error("Échec de la suppression !");
    }

    alert("Job supprimé avec succès !");
    this.supprimer = "";

  } catch (error) {
    console.error(error);
    alert("Erreur lors de la suppression.");
  }
}

  }
};
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
.ajouter{
  width: 80%;
  padding: 20px 40px;
  background: linear-gradient(135deg, #6a11cb, #2575fc); 
  color: white;
  font-size: 25px;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); 
  transition: all 0.3s ease-in-out;
  letter-spacing: 1px; 
  margin-top: 150px;
}
.ajouter:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb); 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-3px);
}
.ajouter:active {
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

</style>
