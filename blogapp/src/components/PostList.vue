<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-item">
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import SinglePost from './SinglePost.vue';
import { usePosts } from '../composables/getPosts';

export default {
  name: 'PostList',
  components: { SinglePost },
  setup() {
    const posts = ref([]);
    const { fetchPosts } = usePosts();

    onMounted(async () => {
      posts.value = await fetchPosts();
    });

    return { posts };
  },
};
</script>

<style scoped>
.post-list {
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.post-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .post-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .post-list {
    grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  padding: 3rem;
  }
}
</style>