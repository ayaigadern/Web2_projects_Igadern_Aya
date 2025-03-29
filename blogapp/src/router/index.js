import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import TagFilterView from '../views/TagFilterView.vue';  // Assurez-vous d'importer TagFilterView

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreatePostView },
  { path: '/posts/:id', component: PostDetailView },
  {
    path: '/tags/:tag',
    component: TagFilterView,  // Utilisez TagFilterView ici
    props: true,  // Passez le paramètre 'tag' en tant que prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
