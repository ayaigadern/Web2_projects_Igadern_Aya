<template>
  <RouterLink class="nav" to="/" replace="true">Home</RouterLink>

  <div class="left">
    <form class="Form" @submit.prevent="editer">
      <label for="titre">Titre d'emploi 
        <input v-model="updatedJob.titre" type="text" required placeholder="Entrez le titre de l'emploi">
      </label>
      <label for="description">Description 
        <input v-model="updatedJob.description" type="text" required placeholder="Entrez une description de l'emploi">
      </label>
      <label for="salaire"><div>Salaire</div> 
        <input v-model="updatedJob.salaire" type="text" required placeholder="Entrez le salaire proposé">
      </label>
      <label for="date">Date de création 
        <input v-model="updatedJob.date_de_creation" type="text" required placeholder="Entrez la date de création">
      </label>
      <label for="anne_experience">Année d'expérience 
        <input v-model="updatedJob.annee_experience" type="text" required placeholder="Entrez le nombre d'années d'expérience">
      </label>
      <button type="submit" class="ajout">click pour editer</button>
    </form>
  </div>
</template>

<script>


export default {
  name: "EditerJob",
  props: ['id'],
  data() {
    return {
      updatedJob: {
        id: "3",
          titre: "Starry is beautiful",
            description: "GOAT",
            salaire: 1000000000000,
            date_de_creation: "09/03/2006",
            annee_experience: "19"
      }
    
    };
  },

  methods: {
    
      editer() {
      console.log("aya");

      fetch("http://localhost:3000/jobs/" + this.updatedJob.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.updatedJob),
      })
        .then(resp => resp.json())
        .catch(error => {
          console.error("Erreur :", error);
          alert("Une erreur s'est produite !");
        });
         this.$router.replace('/');
    },
  },

  mounted(){
    console.log("1");
    fetch("http://localhost:3000/jobs/" + this.id).then((response) => response.json()).then(data => this.updatedJob = data)
  }
};
</script>

<style scoped>
.nav {
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

.Form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 900px; /* Limite de largeur si nécessaire */
  gap: 10px;
  margin: 0 auto;
  padding: 20px;
  border: 3px solid #ff758c;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.Form label {
  text-align: left;
  color: black;
  font-size: 20px;
}

.Form input {
  width: 100%; /* Remplir toute la largeur du formulaire */
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.ajout {
  width: 100%; /* Le bouton occupe toute la largeur */
  padding: 15px;
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
}

.ajout:hover {
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
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
