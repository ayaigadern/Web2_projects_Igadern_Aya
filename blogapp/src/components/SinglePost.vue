<template>
  <div class="post-card">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-excerpt">{{ post.body.substring(0, 50) }}...</p>
    <router-link :to="'/posts/' + post.id" class="read-more">Read More</router-link>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: {
    post: Object,
  },
};
</script>
<style scoped>
.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
}
.read-more {
  display: inline-flex;
  align-items: center;
  color: #4299e1;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 1.5rem;
}

.read-more:hover {
  color: #2b6cb0;
}
</style>