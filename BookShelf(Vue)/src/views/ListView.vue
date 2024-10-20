<template>
  <div class="container">
    <h2 class="title">Reading List</h2>
    <input v-model="input" class="search" type="text" placeholder="Search books..." maxlength="20">
    <div v-if="userStore.isAuthorized">
      <div class="wrapper">
        <div>
          <h2>Books in list: {{ booksWithStatus.length }}</h2>
          <p class="books-count">Planned to read: {{ booksWithStatus.filter((book) => book.status == 'Planning').length }}</p>
          <p class="books-count">Reading now: {{ booksWithStatus.filter((book) => book.status == 'Reading now').length }}</p>
          <p class="books-count">Readed: {{ booksWithStatus.filter((book) => book.status == 'Readed').length }}</p>
        </div>
        
        <div class="filter">
          <h2 class="subtitle">Filter chosen books</h2>
          <div class="radio-btns">
            <label for="Planning">
              <input type="radio" id="Planning" value="Planning" v-model="picked"> Planning
            </label>
            <label for="Reading now">
              <input type="radio" id="Reading now" value="Reading now" v-model="picked"> Reading now
            </label>
            <label for="Readed">
              <input type="radio" id="Readed" value="Readed" v-model="picked"> Readed
            </label>
            <button class="btn-clear" @click="picked = null">Clear</button>
          </div>
        </div>
      </div>
      
      <div class="book-list">
        <BookCard
        v-for="book in filteredBooks"
        :book="book"
        :key="book.id"
        />
      </div>
    </div>
    <div v-else>
      <h2>To review your books you need to log in</h2>
    </div>
  
  </div>
 
</template>

<script setup lang="js">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useBookStore } from '@/stores/books';
import BookCard from '@/components/BookCard.vue';

const userStore = useUserStore()
const bookStore = useBookStore()

const input = ref()
const picked = ref()

const booksWithStatus = computed(() => {
  return bookStore.books.filter((book) => book.status)
})

const filteredBooks = computed(() => {
  let list = bookStore.books
  list = list.filter((book) => book.status)
  list = list.filter((book) => input.value ? book.title.toLowerCase().includes(input.value.toLowerCase()) : true)
  list = list.filter((book) => picked.value ? book.status == picked.value : true)
  return list
})



</script>

<style scoped src="@/assets/styles/list.css">

</style>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  gap: 36px;
  width: 100%;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 24px;
}

.books-count {
  margin: 0;
  font-size: 20px;
}

label {
  font-size: 20px;
}

.radio-btns {
  display: flex;
  flex-direction: column;
}

.btn-clear {
  padding: 6px 10px;
  align-self: center;
}
</style>