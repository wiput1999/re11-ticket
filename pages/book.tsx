import type { NextPage } from 'next'
import { useGetBooksQuery } from '@codegen/client'

const Book: NextPage = () => {
  const { loading, data, error } = useGetBooksQuery()

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <>
      {data?.getBooks?.map((book) => (
        <>
          {book?.id} - {book?.name}
        </>
      ))}
    </>
  )
}

export default Book
