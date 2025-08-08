import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { rooms } from './rooms'
import { booking } from './booking'
import { cottage } from './cottage'
import { testimonials } from './testimonials'
import { statistics } from './statistics'
import { faqs } from './faqs'
import { menu } from './menu'
import { deals } from './deals'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, rooms, booking, cottage , testimonials, statistics, faqs, menu, deals],
}
