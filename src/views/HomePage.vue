<template>
  <div
    id="app"
    class="flex flex-col items-center justify-center min-h-screen bg-[#8b795e] text-[#5a4736] font-mono"
  >
    <h1 class="text-2xl font-bold mb-4">Welcome back {{ username }}</h1>

    <h2>Just for you</h2>

    <ul class="space-y-6 max-w-3xl mx-auto px-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="bg-[#f9f2e7] p-4 rounded-lg shadow-sm flex gap-6"
      >
        <div class="flex-1">
          <p class="font-semibold text-[#5a4736]">{{ post.title }}</p>
          <p class="text-sm text-[#5a4736]">{{ post.username }}</p>
          <p class="text-sm text-[#6b5638]">{{ post.content }}</p>

          <div class="text-sm text-[#8b795e] mt-2">
            <small>Likes: {{ post.likes }} &nbsp;</small>
            <small>{{ formatTimestamp(post.createdAt) }}</small>
          </div>
        </div>

        <div class="w-1/2">
          <div v-if="post.comments && post.comments.length > 0" class="mt-4">
            <h3 class="text-[#5a4736] font-medium mb-2">Comments:</h3>
            <ul class="space-y-2 pl-6">
              <li v-for="comment in post.comments" :key="comment.id" class="text-sm text-[#6b5638]">
                <p>
                  <strong>{{ comment.username }}:</strong> {{ comment.content }}
                </p>
              </li>
            </ul>
          </div>
          <div v-else class="mt-4">
            <p class="text-sm text-[#8b795e]">No comments yet.</p>
          </div>

          <div class="mt-4">
            <textarea
              v-model="newComment.content"
              placeholder="Add a comment"
              @keydown="(event) => handleKeydown(post.id, event)"
              rows="1"
              class="w-full px-4 py-2 bg-transparent border border-[#8b795e] rounded-md focus:ring-2 focus:ring-[#5a4736] focus:outline-none"
            ></textarea>
          </div>
        </div>
      </li>
    </ul>

    <br />
    <h2 class="text-3xl font-semibold text-[#5a4736] mb-6">Create a New Post</h2>
    <form
      @submit.prevent="createPost"
      class="w-full max-w-md bg-[#f9f2e7] p-6 rounded-lg shadow-md"
    >
      <div class="form-group mb-4">
        <label for="title" class="block text-sm text-[#5a4736] mb-2">Title</label>
        <input
          type="text"
          id="title"
          v-model="newPost.title"
          required
          class="w-full px-4 py-2 border border-[#8b795e] rounded-md focus:ring-2 focus:ring-[#5a4736] focus:outline-none"
        />
      </div>

      <div class="form-group mb-6">
        <label for="content" class="block text-sm text-[#5a4736] mb-2">Content</label>
        <textarea
          id="content"
          v-model="newPost.content"
          rows="5"
          required
          class="w-full px-4 py-2 border border-[#8b795e] rounded-md focus:ring-2 focus:ring-[#5a4736] focus:outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-[#8b795e] text-white font-semibold rounded-md hover:bg-[#6b5638] focus:ring-2 focus:ring-[#5a4736]"
      >
        Submit Post
      </button>
    </form>

    <div>
      <button
        class="w-full py-2 px-4 bg-[#8b795e] text-white font-semibold rounded-md hover:bg-[#6b5638] focus:ring-2 focus:ring-[#5a4736]"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getIdFromToken } from '../auth'
import { get, post } from '../axios'
import { formatTimestamp } from '../helper/date'
import type { Post } from '../types/post'
import type { Comment } from '../types/comment'

const router = useRouter()
const id = getIdFromToken()
const username = ref()
const posts = ref(<Post[]>[])
const newPost = ref({
  title: '',
  content: '',
  userId: id,
})
const newComment = ref({
  content: '',
  postId: '',
  userId: id,
})

if (!id) {
  router.push('/login')
}

const getAllPosts = async () => {
  try {
    const response = await get('posts')
    posts.value = await Promise.all(
      response.data.map(async (post: Post) => {
        post.username = (await getUsernameByUserId(post.userId)) || 'Unknown'

        post.comments = (await getCommentsByPostId(post.id)) || []
        return post
      }),
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const getCommentsByPostId = async (postId: number) => {
  try {
    const response = await get(`comments/post/${postId}`)

    const updatedComments = await Promise.all(
      response.data.map(async (comment: Comment) => {
        const commentUsername = await getUsernameByUserId(comment.userId)
        return {
          ...comment,
          username: commentUsername,
        }
      }),
    )
    return updatedComments
  } catch (error) {
    console.error('Error fetching comments for post', error)
    return []
  }
}

const createPost = async () => {
  if (newPost.value.title && newPost.value.content) {
    try {
      const response = await post('posts', newPost.value)
      posts.value.push(response.data)
      newPost.value.title = ''
      newPost.value.content = ''
    } catch (error) {
      console.error('Error creating post', error)
    }
  }
}

const addComment = async (id: number) => {
  if (newComment.value.content && newComment.value.userId) {
    try {
      const commentToAdd = {
        ...newComment.value,
        postId: id,
      }

      await post('comments', commentToAdd)
      newComment.value.content = ''
    } catch (error) {
      console.error('Error creating comment', error)
    }
  } else {
    console.warn('Content and userId are required for a comment.')
  }
}

const getUsername = async () => {
  try {
    const response = await get(`users/${id}`)
    username.value = response.data.username
  } catch (error) {
    console.error('Error fetching user', error)
  }
}

const getUsernameByUserId = async (id: number): Promise<string | null> => {
  try {
    const response = await get(`users/${id}`)
    return response.data.username
  } catch (error) {
    console.error('Error fetching username', error)
    return null
  }
}

const handleKeydown = (id: number, event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    addComment(id)
  }
}

const logout = () => {
  router.push('/').then(() => {
    sessionStorage.clear()
    window.location.reload()
  })
}

onMounted(getAllPosts)
onMounted(getUsername)
</script>
