import { Request, Response } from 'express'
import { AuthorService } from '../../../services'

export const list = (autorService: AuthorService) => async (_: Request, res: Response) => {
  const authors = await autorService.listAll()

  res.status(200).json(authors)
}
