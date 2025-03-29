<template>
  <div class="tag-posts-container">
    <h1 class="tag-name">{{ tag }}</h1>
    
    <div v-if="filteredPosts.length > 0" class="posts-grid">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
        <div class="post-content">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.body.substring(0, 50) }}...</p>
          <router-link :to="'/posts/' + post.id" class="read-more-link">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="no-posts">
      <p>No posts found with this tag.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePosts } from '@/composables/getPosts';

export default {
  name: 'TagFilterView',
  props: ['tag'],
  setup(props) {
    const filteredPosts = ref([]);
    const { fetchPosts } = usePosts();

    onMounted(async () => {
      const posts = await fetchPosts();
      filteredPosts.value = posts.filter(post => post.tags.includes(props.tag));
    });

    return { filteredPosts };
  },
};
</script>

<style scoped>
.tag-posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}



.tag-name {
  font-size: 2rem;
  color: #4299e1;
  font-weight: 700;
  text-align: center;
}

.posts-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

.post-content {
  padding: 1.5rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.post-excerpt {
  color: #4a5568;
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  color: #4299e1;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size:1.5rem;
}

.read-more-link:hover {
  color: #2b6cb0;
}

.icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.read-more-link:hover .icon {
  transform: translateX(2px);
}

.no-posts {
  text-align: center;
  padding: 2rem;
  color: #718096;
  font-size: 1.1rem;
}

@media (prefers-color-scheme: dark) {
  .tag-title {
    color: #e2e8f0;
  }
  
  .post-card {
    background: #2d3748;
  }
  
  .post-title {
    color: #e2e8f0;
  }
  
  .post-excerpt {
    color: #cbd5e0;
  }
  
  .no-posts {
    color: #a0aec0;
  }
}

@media (max-width: 768px) {
  .tag-posts-container {
    padding: 1.5rem;
  }
  
  .tag-title {
    font-size: 1.5rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>