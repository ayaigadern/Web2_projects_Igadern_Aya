import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import TagFilterView from '../views/TagFilterView.vue';  

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreatePostView },
  { path: '/posts/:id', component: PostDetailView },
  {
    path: '/tags/:tag',
    component: TagFilterView,  
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
