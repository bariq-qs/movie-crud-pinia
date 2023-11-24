<template>
  <NuxtLayout name="home">
    <template #header-content>
      <div class="row justify-between" style="gap: 1rem; width: 100%">
        <q-btn round push color="primary" icon="chevron_left" @click="back()" />
        <div class="row" style="gap: 1rem">
          <q-btn
            push
            color="negative"
            label="Delete"
            v-if="Boolean(route.params.id)"
            @click="onDelete"
          />
          <q-btn push color="primary" label="Save" @click="onSubmit" />
        </div>
      </div>
    </template>
    <form>
      <q-input
        name="title"
        outlined
        :model-value="values.title"
        @update:model-value="(v) => onUpdateModelValue('title', v)"
        label="Title"
        stack-label
        :dense="false"
        :error="Boolean(errors.title)"
        class="q-mb-md"
      >
        <template #error>
          {{ errors.title }}
        </template>
      </q-input>
      <q-input
        name="director"
        outlined
        :model-value="values.director"
        @update:model-value="(v) => onUpdateModelValue('director', v)"
        label="Director"
        stack-label
        :dense="false"
        :error="Boolean(errors.director)"
        class="q-mb-md"
      >
        <template #error>
          {{ errors.director }}
        </template>
      </q-input>
      <q-input
        name="summary"
        outlined
        :model-value="values.summary"
        @update:model-value="(v) => onUpdateModelValue('summary', v)"
        label="Summary"
        stack-label
        :dense="false"
        :error="Boolean(errors.summary)"
        type="textarea"
        class="q-mb-md"
      >
        <template #error>
          {{ errors.summary }}
        </template>
      </q-input>
      <div class="row">
        <q-chip
          clickable
          color="primary"
          text-color="white"
          :outline="!category.value.isCheck"
          v-for="(category, idx) in fieldGenres"
          :key="idx"
          @click="category.value.isCheck = !category.value.isCheck"
        >
          {{ category.value.title }}
        </q-chip>
      </div>
      <div class="text-caption q-mt-xs" v-if="Boolean(errors.genres)">
        {{ errors.genres }}
      </div>
    </form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm, useFieldArray } from "vee-validate";
import { schemaMovieForm, type TypeMovieForm } from "../../utils/schemas/movie";
import { useRootStore } from "../../stores/index";
import type { Movie } from "../../stores/model";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const { errors, handleSubmit, values, setFieldValue, setValues } =
  useForm<TypeMovieForm>({
    validationSchema: schemaMovieForm,
  });
type TGenreMap = Movie & { isCheck: boolean };
const { fields: fieldGenres } = useFieldArray<TGenreMap>("genres");

const categories = computed(() =>
  useRootStore().genres.map(({ title }) => ({
    title,
    isCheck: false,
  }))
);
const movies = computed(() => useRootStore().movies);

const back = () => {
  router.push("/");
};
const onSubmit = handleSubmit((v) => {
  const payload = {
    ...v,
    genres: v.genres
      ?.filter(({ isCheck }) => isCheck)
      .map(({ title }) => ({
        title,
      })),
  };
  useRootStore().saveMovie(payload);
  $q.notify({
    message: Boolean(v.id)
      ? "Successfully change the movie."
      : "Successfully add new movie.",
    type: "positive",
  });
  back();
});

const onUpdateModelValue = (
  field: "id" | "title" | "director" | "summary",
  v
) => {
  setFieldValue(field, typeof v === "string" ? v : "");
};

const onDelete = () => {
  useRootStore().deleteMovie(route.params.id);
  $q.notify({
    message: "Successfully delete movie.",
    type: "positive",
  });
  back();
};

const initialize = () => {
  if (route.params.id) {
    const findMovieById = movies.value.find(({ id }) => route.params.id);
    setValues({
      id: findMovieById?.id ?? "",
      title: findMovieById?.title ?? "",
      director: findMovieById?.director ?? "",
      summary: findMovieById?.summary ?? "",
      genres: categories.value.map(({ title }) => ({
        title,
        isCheck: Boolean(findMovieById?.genres.find((v) => v.title === title)),
      })),
    });
  } else {
    setFieldValue(
      "genres",
      categories.value.map(({ title }) => ({
        title,
        isCheck: false,
      }))
    );
  }
};

onMounted(() => {
  initialize();
});
</script>
