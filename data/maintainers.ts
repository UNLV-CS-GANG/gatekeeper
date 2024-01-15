export interface Person {
  name: string
  pronouns: string
  school: string
  src: string
  link: string
  title?: string
  titles: string[]
}

export const maintainers: Person[] = [
  {
    name: 'Thien Nguyen',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/thienguen.png',
    link: 'https://vankythien.dev',
    title: 'Director',
    titles: ['Algorithms', 'Fullstack Developer', 'UI/UX', 'Accessibility Design'],
  },
  {
    name: 'Eman Pecson',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/emanpecson.png',
    link: 'mailto:emanpecson@gmail.com',
    title: 'Director',
    titles: [''],
  },
  {
    name: 'Stefano Rubini',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/StefanoRubini.png',
    link: 'something',
    title: 'Developer',
    titles: [''],
  },
  {
    name: 'Marcos Villanueva Abreu',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/mva919.png',
    link: 'something',
    title: 'Developer',
    titles: [''],
  },

  /* Go add yourself, lazy aazz */
]
