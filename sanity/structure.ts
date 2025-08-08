import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('user').title('Users'),
      S.documentTypeListItem('rooms').title('Rooms'),
      S.documentTypeListItem('booking').title('Booking'),
      S.documentTypeListItem('cottage').title('Cottage'),
      S.documentTypeListItem('testimonials').title('Testimonials'),
      S.documentTypeListItem('statistics').title('Statistics'),
      S.documentTypeListItem('faqs').title('Faqs'),
      S.documentTypeListItem('menu').title('Menu'),
      S.documentTypeListItem('deals').title('Deals'),
    ])
