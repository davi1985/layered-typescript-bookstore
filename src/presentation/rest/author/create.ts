import { NextFunction, Request, Response } from 'express'
import { AuthorService } from '../../../services'
import { z, ZodError } from 'zod'
import { DateTime } from 'luxon'

export const create = (autorService: AuthorService) => async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    birthday: z
      .string()
      .min(1)
      .transform((value) => DateTime.fromISO(value))
      .refine((value) => value.isValid)
      .transform((value) => value.toJSDate()),
    bio: z.string().max(300)
  })

  try {
    const authorObject = await schema.parseAsync(req.body)
    const createdAuthor = await autorService.create({ ...authorObject, id: '' })

    res.status(201).json(createdAuthor.object)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: error.message
      })
    }

    next(error)
  }

  const authors = await autorService.listAll()

  res.status(200).json(authors)
}
