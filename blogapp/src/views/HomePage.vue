<template>
  <div>
    <NavBar />
    <div class="flex">
      <PostList />
      <TagCloud />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import PostList from '../components/PostList.vue';
import TagCloud from '../components/TagCloud.vue';

export default {
  name: 'HomePage',
  components: { NavBar, PostList, TagCloud }
};
</script>
