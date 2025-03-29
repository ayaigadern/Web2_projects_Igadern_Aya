<template>
  <div class="tag-cloud-container">
    <h3 class="tag-cloud-title">Tags</h3>
    <div class="tag-grid">
      <router-link 
        v-for="tag in tags" 
        :key="tag" 
        :to="'/tags/' + tag" 
        class="tag-item"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePosts } from '../composables/getPosts';

export default {
  name: 'TagCloud',
  setup() {
    const tags = ref([]);
    const { fetchPosts } = usePosts();

    onMounted(async () => {
      const posts = await fetchPosts();
      tags.value = [...new Set(posts.flatMap(post => post.tags))];
    });

    return { tags };
  },
};
</script>

<style scoped>
.tag-cloud-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  width: 50%;
  margin: 0 auto;
}

.tag-cloud-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.tag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}

.tag-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #f8fafc;
  color: #4299e1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  text-align: center;
  word-break: break-word;
}

.tag-item:hover {
  background-color: #ebf8ff;
  color: #3182ce;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .tag-cloud-container {
    background: #2d3748;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .tag-cloud-title {
    color: #e2e8f0;
    border-bottom-color: #4a5568;
  }
  
  .tag-item {
    background-color: #4a5568;
    color: #90cdf4;
    border-color: #718096;
  }
  
  .tag-item:hover {
    background-color: #2c5282;
    color: #63b3ed;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tag-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
  
  .tag-item {
    padding: 0.4rem 0.8rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .tag-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>