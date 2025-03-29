<template>
  <div class="create-post">
    <div class="form-wrapper">
      <h1 class="page-title">Create New Post</h1>
      
      <form @submit.prevent="submitPost" class="post-form">
        <!-- Title Field -->
        <div class="form-row">
          <label for="title" class="input-label">Title</label>
          <input
            v-model="title"
            id="title"
            type="text"
            class="text-input"
            placeholder="What's your post about?"
            required
          />
        </div>

        <!-- Content Field -->
        <div class="form-row">
          <label for="body" class="input-label">Content</label>
          <textarea
            v-model="body"
            id="body"
            class="text-input textarea"
            placeholder="Write your thoughts here..."
            rows="6"
            required
          ></textarea>
        </div>

        <!-- Tags Field -->
        <div class="form-row">
          <label for="tags" class="input-label">Tags</label>
          <input
            v-model="tags"
            id="tags"
            type="text"
            class="text-input"
            placeholder="vue, javascript, webdev"
            required
          />
          <p class="help-text">Separate tags with commas</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">
          Publish Post
          <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'CreatePostView',
  setup() {
    const title = ref('');
    const body = ref('');
    const tags = ref('');
    const router = useRouter();

    const submitPost = async () => {
      try {
        await axios.post('http://localhost:3000/posts', {
          title: title.value,
          body: body.value,
          tags: tags.value.split(',').map(tag => tag.trim())
        });
        router.push('/');
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Something went wrong. Please try again.');
      }
    };

    return { title, body, tags, submitPost };
  }
};
</script>

<style scoped>
.create-post {
  padding: 30px 20px;
}

.form-wrapper {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.page-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #4a90e2;
  margin: 15px auto 0;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.text-input {
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.2s ease;
}

.text-input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
}

.textarea {
  min-height: 160px;
  resize: vertical;
}

.help-text {
  font-size: 13px;
  color: #888;
  margin-top: 6px;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover {
  background: #3a7bc8;
  transform: translateY(-1px);
}

.submit-button:active {
  transform: translateY(0);
}

.arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.submit-button:hover .arrow-icon {
  transform: translateX(3px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 25px 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .text-input {
    padding: 10px 12px;
  }
  
  .submit-button {
    padding: 12px;
  }
}
</style>