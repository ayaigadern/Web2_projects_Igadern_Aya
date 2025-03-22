import { createRouter, createWebHistory } from 'vue-router';

// Importation des pages (views)
import HomePage from '../views/HomePage.vue';
import AddJob from '../views/AddJob.vue';
import EditerJob from '../views/EditerJob.vue';
import JobDetail from '../views/JobDetail.vue';
import SupJob from '../views/SupJob.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage }, // Page d'accueil
  { path: '/add-job', name: 'AddJob', component: AddJob }, // Page d'ajout d'emploi
  { path: '/job/:id', name: 'JobDetail', component: JobDetail, props: true }, // Détails d'un emploi (dynamique)
  { path: '/delete-job', name: 'SupJob', component: SupJob },
  { path: '/editer-job/:id', name: 'EditerJob', component: EditerJob, props:true } // Page pour supprimer un emploi
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
