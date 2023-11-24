import * as yup from 'yup'

const schemaMovieForm = yup.object().shape({
  id: yup.string().optional(),
  title: yup.string().required('Title is required.'),
  director: yup.string().required('Director is required.'),
  summary: yup.string().required('Summary is required.').max(100, 'Summary max 100 characters.'),
  genres: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      isCheck: yup.boolean()
    })
  ).test('check-length', 'Genre is required.', (val) => {
    const filter = val?.filter(({ isCheck }) => isCheck === true)
    return filter && filter?.length > 0
  })
})

type TypeMovieForm = yup.InferType<typeof schemaMovieForm>

export {
  schemaMovieForm
}

export type {
  TypeMovieForm
}