<template>
  <div>
      <FilterNav @filtrer="filtrerJobs" />
      <main style="display: flex;">
          <section>
              <div class="JOBS">
                  <div v-for="(i, index) in jobsFiltres" :key="index">
                      <div class="job">{{ i.titre }}
                          <button class="info" @click="url(i.id)">Plus d'info</button>
                          <button class="info" @click="url2(i.id)">Editer</button>
                      </div>
                  </div>
              </div>
          </section>
      </main>
      
      <JobDetail v-if="selectedJob" :job="selectedJob" @close="hideDetails" />
  </div>
</template>

<script>

import JobDetail from '../views/JobDetail.vue';

import FilterNav from '../components/FiltrerNav.vue';
export default {
  name: 'HomePage',
  components: {
      
      JobDetail,
      
      FilterNav,
  },
  data() {
      return {
          jobs: [],
          selectedJob: null,
          recherche:"",
      };
  },
  mounted() {
    console.log("URL utilisée :", "http://localhost:3000/jobs/");
    fetch('http://localhost:3000/jobs/')
        .then((resp) => resp.json())
        .then((data) => (this.jobs = data))
        .catch((err) => console.error("Erreur lors de la récupération :", err));
        
},
  computed: {
      jobsFiltres() {
        console.log(this.job);
          return this.jobs.filter(job => 
              job.titre.toLowerCase().includes(this.recherche.toLowerCase())
          );
      },
    },
    
    
    methods: {
    url(index){
      let url =  `/job/${index}`;
      this.$router.replace(url);
    },
    url2(index){
      let url=  `/editer-job/${index}`;
      this.$router.replace(url);


    },
      Ajouter(nouveauJob) {
          this.jobs.push(nouveauJob);
      },
      showdetails(job) {
          this.selectedJob = job;
      },
      hideDetails() {
          this.selectedJob = null; 
      },
      modifier(jobmodifie){
          let index=this.jobs.findIndex((job)=>job.id===jobmodifie.id);
          if (index !== -1) this.jobs[index] = jobmodifie;
      },
      supprimer_job(id){
          this.jobs = this.jobs.filter((job) => job.id !== id);
      },
      filtrerJobs(recherche) {
          this.recherche = recherche; // Met à jour la recherche
      }
  },
};
</script>

<style scoped>
.job {
  width: 8em;
  height: 8em;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  font-size: 1.5rem;
  gap: 20px;
  padding: 1rem;
}
.JOBS {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  column-gap: 10px;
  row-gap: 10px;
  width: 70%;
  margin-top: 50px;
  
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 100px;
  align-items: flex-start;
  
}
.info {
  padding: 12px 30px;
  background: #007bff; /* Bleu royal */
  color: white;
  border: 2px solid #007bff;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.info:hover {
  background: white;
  color: #007bff;
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
  transform: translateY(-2px);
}

.info:active {
  background: #0056b3;
  color: white;
  transform: scale(0.95);
}

.info:focus {
  outline: none;
  box-shadow: 0 0 5px 2px rgba(0, 123, 255, 0.5);
}

</style>
