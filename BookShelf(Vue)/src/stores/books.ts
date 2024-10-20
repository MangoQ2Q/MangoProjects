import { defineStore } from "pinia";
import type { Book } from "@/types/book";
import type { myBook } from "@/types/myBook";
import { ref } from "vue";
import { useUserStore } from "./user";

export const useBookStore = defineStore('books', () => {

  const user = useUserStore()

  const booksFromServer = ref<Book[]>([])
  const books = ref<Book[]>([])
  
  // const myBooks = ref<Book[]>([]) 

  async function loadBooks() {
    const res = await fetch('https://freetestapi.com/api/v1/books')
    const data = await res.json()

    books.value = data
    console.log(books.value);

    booksFromServer.value = data;
  }

  function addToMyBooks(id: number, status: string) {
    if(user.isAuthorized) {
      // myBooks.value.push(books.value[id - 1])
      books.value[id - 1].status = status
      console.log(books.value);
    }
  }

  function removeFromMyBooks(id: number) {
    books.value[id - 1].status = ''
    console.log(books.value);
  }

  return {
    books, booksFromServer, loadBooks, addToMyBooks, removeFromMyBooks, 
  }
})