import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { rooms } from './rooms'
import { booking } from './booking'
import { cottage } from './cottage'
// import { testimonials } from './testimonials'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, rooms, booking, cottage /*, testimonials */],
}
