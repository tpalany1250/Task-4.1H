<template>
    <div class="blog-page">
      <h2>Blog Comments</h2>
  
      <div v-if="isAdminLoggedIn">
        <button @click="toggleAddForm">Add Blog Post</button>
        <br><br>
        <div v-if="showAddForm || showEditForm">
          <input v-model="newPost.title" placeholder="Title" />
          <input v-model="newPost.date" placeholder="Date" />
          <textarea v-model="newPost.content" placeholder="Content"></textarea>
          <button @click="addOrUpdatePost">{{ showEditForm ? 'Save' : 'Add Post' }}</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
  
      <div class="blog-posts">
        <div v-for="post in blogPosts" :key="post.id" class="blog-post">
          <h3 @click="togglePostDetails(post.id)">{{ post.title }}</h3>
          <div v-if="expandedPostId === post.id">
            <p>{{ post.date }}</p>
            <p>{{ post.content }}</p>
            <div v-if="isAdminLoggedIn">
              <button @click="editPost(post.id)">Edit</button>
              <button @click="deletePost(post.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const blogPosts = ref(JSON.parse(localStorage.getItem('blogPosts')) || []);
  const expandedPostId = ref(null);
  const newPost = ref({
    id: null,
    title: '',
    date: '',
    content: ''
  });
  const showAddForm = ref(false);
  const showEditForm = ref(false);
  const isAdminLoggedIn = ref(localStorage.getItem('isAdminLoggedIn') === 'true');
  
  const togglePostDetails = (postId) => {
    if (expandedPostId.value === postId) {
      expandedPostId.value = null;
    } else {
      expandedPostId.value = postId;
    }
  };
  
  const toggleAddForm = () => {
    showAddForm.value = !showAddForm.value;
    showEditForm.value = false;
  };
  
  const addOrUpdatePost = () => {
    if (isAdminLoggedIn.value) {
      if (newPost.value.id === null) {
        const newPostData = {
          id: blogPosts.value.length + 1,
          ...newPost.value
        };
        blogPosts.value.push(newPostData);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts.value));
      } else {
        const index = blogPosts.value.findIndex((post) => post.id === newPost.value.id);
        if (index !== -1) {
          blogPosts.value[index] = { ...newPost.value };
          localStorage.setItem('blogPosts', JSON.stringify(blogPosts.value));
        }
      }
  
      newPost.value = { id: null, title: '', date: '', content: '' };
      showAddForm.value = false;
      showEditForm.value = false;
    }
  };
  
  const editPost = (id) => {
    if (isAdminLoggedIn.value) {
      const postToEdit = blogPosts.value.find((post) => post.id === id);
      if (postToEdit) {
        newPost.value = { ...postToEdit };
        showEditForm.value = true;
        showAddForm.value = false;
      }
    }
  };
  
  const cancelEdit = () => {
    newPost.value = { id: null, title: '', date: '', content: '' };
    showEditForm.value = false;
  };
  
  const deletePost = (id) => {
    if (isAdminLoggedIn.value) {
      const index = blogPosts.value.findIndex((post) => post.id === id);
      if (index !== -1) {
        blogPosts.value.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts.value));
      }
    }
  };
  
  onMounted(() => {
    blogPosts.value = JSON.parse(localStorage.getItem('blogPosts')) || [];
  });
  </script>
  
  <style scoped>
  .blog-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
    background-color: white;
  }
  
  .blog-post {
    margin-bottom: 20px;
  }
  
  h2 {
    text-align: center;
  }
  
  h3 {
    margin-top: 0;
  }
  
  p {
    line-height: 1.5;
  }
  </style>