<template>
  <div class="card">
    <img class="card__img" :src="book.cover_image" alt="">
    <div class="card__info">
      <h2 class="card__title">{{ book.title }}</h2>
      <div class="card__side">
        <span v-if="book.status && user.isAuthorized" class="card__status">
          Status: <span class="card__status-green">{{ book.status }}</span>
        </span>
        <span class="card__author">Author: {{ book.author + ' ' }}</span>
        <span class="card__genre">Genres: {{ book.genre.toString() }}</span>
      </div>
      <p class="card__text">{{ book.description }}</p>
      <div class="card__btns">
        <!-- <button disabled
        class="card__btn" v-show="book.status && user.isAuthorized">✓</button> -->
        <button 
          :disabled="!user.isAuthorized || book.status == 'Planning'" 
          @click="bookStore.addToMyBooks(book.id, 'Planning')" class="card__btn">
          {{ book.status == 'Planning' && user.isAuthorized ? '✓' : 'Add to planning' }}
        </button>
        <button 
          :disabled="!user.isAuthorized || book.status == 'Reading now'" 
          @click="bookStore.addToMyBooks(book.id, 'Reading now')" class="card__btn">
          {{ book.status == 'Reading now' && user.isAuthorized ? '✓' : 'Add to reading now' }}
        </button>
        <button 
          :disabled="!user.isAuthorized || book.status == 'Readed'" 
          @click="bookStore.addToMyBooks(book.id, 'Readed')" class="card__btn">
          {{ book.status == 'Readed' && user.isAuthorized ? '✓' : 'Add to readed' }}
        </button>
        <button 
        v-if="book.status && user.isAuthorized" 
        @click="bookStore.removeFromMyBooks(book.id)" 
        class="card__btn card__btn-remove">Remove from read List</button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBookStore } from '@/stores/books';
import { useUserStore } from '@/stores/user';
import type { Book } from '@/types/book';

const user = useUserStore()
const bookStore = useBookStore()

const props = defineProps<{
  book: Book
}>()

</script>

<style scoped>

.card {
  display: flex;
  flex-direction: column;
  max-width: 250px;
}

.card__info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card__img {
  width: 100%;
  height: 250px;
}

.card__side {
  display: flex;
  flex-direction: column;

  font-size: 20px;
  margin-bottom: 6px;
}

.card__status-green {
  color: rgb(14, 165, 94);
}

.card__text {
  margin: 0;
  margin-bottom: 10px;
  font-size: 20px;
}

.card__btns {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  
  
}

.card__btn {
  margin-bottom: 8px;
  
}

.card__btn-remove {
  background-color: rgb(179, 63, 63);
}

.card__btn-remove:hover {
  background-color: rgb(124, 45, 45);
}


</style>