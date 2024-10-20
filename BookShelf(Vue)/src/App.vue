<template>
  <div class="container">
    <header class="header">
      <div class="header__auth">
        <span class="header__span" 
          :class="user.isAuthorized ? '' : 'header__span-red'">
          {{ user.isAuthorized ? 'You are in' : 'Autentification'}}
        </span>
        <button @click="userAuth">{{ user.isAuthorized ? 'Log out' : 'Log in' }}  </button>
      </div>
      <nav class="header__nav">
        <RouterLink to="/list">Reading List</RouterLink>
        <RouterLink to="/discover">Discover</RouterLink>
      </nav>
    </header>
    <div  v-if="booksLoading" class="loading">Loading...</div>
    <RouterView v-else/>
  </div>
  
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import { useBookStore } from './stores/books';
import { onMounted, watch, ref } from 'vue';

const user = useUserStore()
const bookStore = useBookStore()
const router = useRouter()
const booksLoading = ref(true)

function userAuth() {
  user.isAuthorized = !user.isAuthorized
}

async function loadBooks() {
  await bookStore.loadBooks();
  booksLoading.value = false
}

onMounted(() => {
  loadBooks()
})

watch(user, (newVal, oldVal) => {
  if (user.isAuthorized == false) {
    router.push('/discover')
  }
})


</script>

<style >
 body {
  background-color: #2e2e2e;
  color: rgb(190, 190, 190);
 }

 button {
  padding: 10px 20px;
  border-radius: 12px;

  color: #ffffff;
  font-size: 18px;
  border: none;
  background-color: rgb(25, 184, 184);

  transition: background-color .2s;
 }

 button:hover {
  background-color: rgb(17, 126, 126);
 }

 button:active {
  background-color: rgb(11, 87, 87);
 }

 button:disabled {
  background-color: rgb(11, 87, 87);
 }

 .container {
  width: 1100px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
 }

 .header {
  margin-bottom: 10px;
 }

 a {
    color: rgb(188, 188, 188);
    font-size: 24px;
    text-decoration: none;
    margin-bottom: 4px;
 }

 .header__nav {
  display: flex;
  flex-direction: column;
 }

 .header__span {
  margin-right: 24px;

  color: rgb(14, 165, 94);
  font-size: 22px;
  font-weight: 500;
 }

 .header__span-red {
  color: rgb(180, 57, 23);
 }

 .loading {
  margin-top: 40px;
  font-size: 42px;
  align-self: center;
 }

</style>
