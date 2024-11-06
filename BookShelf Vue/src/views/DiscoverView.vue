<template>
  <div class="container">
    <h2 class="title">Discover</h2>
    <input v-model="input" class="search" type="text" placeholder="Search books..." maxlength="20">
    <div class="book-list">
      <BookCard
        v-for="book in filteredBooks"
        :book="book"
        :key="book.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BookCard from '@/components/BookCard.vue';
import { useBookStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';


const bookStore = ref(useBookStore()) 
const user = useUserStore()
const input = ref()

const filteredBooks = computed(() => {
  return input.value ? bookStore.value.books.filter(book => book.title.toLowerCase().includes(input.value.toLowerCase())) : bookStore.value.books
})

</script>

<style scoped src="@/assets/styles/list.css">

</style>