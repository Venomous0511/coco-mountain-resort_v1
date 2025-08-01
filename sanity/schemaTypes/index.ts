import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
// import { testimonials } from './testimonials'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user],
}
