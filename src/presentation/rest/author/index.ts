import { Router } from 'express'
import type { Config } from '../../..'
import { list } from './list'
import { remove } from './delete'
import { find } from './find'
import { create } from './create'
import { update } from './update'

export const authorRoutesFactory = (services: Config['services']) => {
  const router = Router()

  router.get('/', list(services.AuthorService))
  router.get('/:id', find(services.AuthorService))
  router.delete('/:id', remove(services.AuthorService))
  router.put('/:id', update(services.AuthorService))
  router.post('/', create(services.AuthorService))

  return router
}
