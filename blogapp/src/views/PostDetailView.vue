<template>
  <div class="post-detail-container">
    <div v-if="!post" class="loading-state">
      <div class="spinner"></div>
      <p>Loading post...</p>
    </div>

    <div v-else class="post-content">
      <!-- Back button -->
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="back-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to posts
      </button>

      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-body">{{ post.body }}</p>

      <div class="tags-section">
        <h3 class="tags-heading">Tags:</h3>
        <div class="tags-container">
          <span v-for="tag in post.tags" :key="tag" class="tag-pill">
            {{ tag }}
          </span>
        </div>
      </div>

      <button @click="confirmDelete" class="delete-button">
        Delete Post
        <svg xmlns="http://www.w3.org/2000/svg" class="delete-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePost } from '../composables/getPost';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PostDetailView',
  setup() {
    const post = ref(null);
    const route = useRoute();
    const router = useRouter();
    const { fetchPost } = usePost();

    onMounted(async () => {
      try {
        post.value = await fetchPost(route.params.id);
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/not-found'); 
      }
    });

    const goBack = () => {
      router.go(-1); 
    };

    const confirmDelete = async () => {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          await axios.delete(`http://localhost:3000/posts/${route.params.id}`);
          router.push('/');
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        }
      }
    };

    return { post, goBack, confirmDelete };
  }
};
</script>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #2b6cb0;
}

.back-icon {
  width: 1rem;
  height: 1rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.post-body {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2rem;
  white-space: pre-line;
}

.tags-section {
  margin-bottom: 2rem;
}

.tags-heading {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-pill {
  background-color: #edf2f7;
  color: #2d3748;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
}

.delete-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f56565;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background-color: #e53e3e;
  transform: translateY(-1px);
}

.delete-button:active {
  transform: translateY(0);
}

.delete-icon {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 768px) {
  .post-detail-container {
    padding: 1.5rem;
  }
  
  .post-title {
    font-size: 1.75rem;
  }
  
  .post-body {
    font-size: 1rem;
  }
}
</style>