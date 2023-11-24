<template>
  <div class="movie-list">
    <q-input v-model="search" filled type="search" class="q-mb-xl">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="" v-for="(data, idx) in sourceMovies" :key="idx">
      <q-card class="q-mb-lg cursor-pointer" @click="toDetail(data)">
        <q-card-section>
          <p class="text-weight-bolder">{{ data.title }}</p>
          <p class="">{{ data.director }}</p>
          <p class="text-right">{{ data.genres.replaceAll(",", " / ") }}</p>
        </q-card-section>
      </q-card>
    </div>
    <q-btn
      round
      color="primary"
      icon="add"
      size="lg"
      class="button-add"
      @click="toAddPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useRootStore } from "~/stores";
import type { Movie } from "~/stores/model";

definePageMeta({
  layout: "home",
});

type TMoviesMap = Omit<Movie, "genres"> & { genres: string };

const router = useRouter();
const search = ref("");
const movies = computed(() =>
  useRootStore().listMovie.map((v) => ({
    ...v,
    genres: v.genres.map(({ title }) => title).toString(),
  }))
);
const sourceMovies = ref(movies.value)

const toAddPage = () => {
  router.push("/detail");
};

const toDetail = (val: TMoviesMap) => {
  router.push(`/detail/${val.id}`);
};

watch(search, (newVal) => {
  let filterData = movies.value
  if (newVal) {
    filterData = filterData.filter(({ title }) => title.toLowerCase().includes(newVal.toLowerCase()));
  }
  sourceMovies.value = filterData
});
</script>

<style lang="scss">
.button-add {
  position: fixed;
  bottom: 40px;
  right: 10%;
}

// .row-genre {
//   > p:nth-child(-n + 2) {
//     color: red;
//   }
// }
</style>
