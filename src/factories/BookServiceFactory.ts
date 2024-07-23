import { DB } from '../data/db'
import { BookRepository } from '../data/repositories'
import { BookService } from '../services'
import { createAuthorService } from './AuthorServiceFactory'

export const createBookService = (db: DB) => {
  const repository = new BookRepository(db)
  const authorService = createAuthorService(db)

  return new BookService(repository, authorService)
}
