export interface Person {
  name     : string
  pronouns : string
  school   : string
  src      : string
  link     : string
  title   ?: string
  titles   : string[]
}

export const maintainers: Person[] = [
  {
    name: 'Thien Nguyen',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/thienguen.png',
    link: 'https://vankythien.dev',
    title: 'Slave',
    titles: ['Algorithms', 'Fullstack Developer', 'UI/UX', 'Accessibility Design'],
  },

  /* Go add yourself, lazy aazz */
]
