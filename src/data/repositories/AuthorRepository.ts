import { Author, AuthorObject } from '../../domain'
import { DB } from '../db'

export class AuthorRepository {
  #DB: DB

  constructor(database: DB) {
    this.#DB = database
  }

  async listAll() {
    const authors = await this.#DB.listAuthors()

    return authors.map((author) => new Author(author))
  }

  async findById(id: string) {
    const author = await this.#DB.getAuthor(id)

    return author ? new Author(author) : null
  }

  async findBy(property: keyof Omit<AuthorObject, 'id'>, value: any) {
    const authors = await this.#DB.listAuthors()
    const author = authors.find((author) => author[property] === value)

    return author ? new Author(author) : null
  }

  async remove(id: string) {
    return this.#DB.deleteAuthor(id)
  }

  async save(author: Author) {
    const authorObject = author.object

    if (await this.findById(author.id)) {
      return this.#DB.updateAuthor(author.id, authorObject)
    }

    const newAuthor = await this.#DB.addAuthor(authorObject)

    return new Author(newAuthor)
  }
}
