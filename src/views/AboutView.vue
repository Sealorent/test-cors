<template>
  <div class="about">
    <h1>{{ string }}</h1>
    <p>{{ learningVideo }}</p>

    <button @click="load" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-slate-900">
      Button
    </button>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '@/stores/api'; // Update with the correct path

export default {
  name: 'About',
  setup() {
    const apiStore = useApi();
    const apiResponse = ref(null);

    const string = ref<string>('loading');
    const learningVideo = ref<string>('Loading');

    const fetchApiResponse = async () => {
      try {
        const response = await apiStore.getResponse();
        apiResponse.value = response;
        string.value = 'success';
      } catch (error) {
        string.value = 'error';
        throw new Error('Error fetching API response');
      }
    };

    const getLearningVideo = async () => {
      try {
        const response = await apiStore.getLearningVideo();
        apiResponse.value = response;
        learningVideo.value = 'Learning Video Success';
      } catch (error) {
        learningVideo.value = 'Learning Video Error';
        throw new Error('Error fetching API response');
      }
    }

    const load = () => {
      getLearningVideo();
    }

    // You might want to fetch the response on component mount
    onMounted(() => {
      fetchApiResponse();

    });

    return {
      fetchApiResponse,
      getLearningVideo,
      apiResponse,
      string,
      learningVideo,
      load
    };
  },
};
</script>
