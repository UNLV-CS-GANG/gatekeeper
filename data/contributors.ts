export interface Contributor {
  name: string
  pronouns: string
  school: string
  src: string
  link: string
  title: string
  roles: string[]
}

export const contributors: Contributor[] = [
  {
    name: 'Emanuel Pecson',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/emanpecson.png',
    link: 'https://emanpecson.com/',
    title: 'Director',
    roles: ['Full-stack Developer', 'UI/UX', 'Database Design'],
  },
  {
    name: 'Thien Nguyen',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/thienguen.png',
    link: 'https://vankythien.dev',
    title: 'Director',
    roles: ['Front-end Developer', 'UI/UX', 'Accessibility Design'],
  },
  {
    name: 'Fabian Carrasco',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/fabiancarrasco.png',
    link: 'https://fabiancarrasco.com',
    title: 'Developer',
    roles: ['Front-end Developer', 'UI/UX'],
  },
  {
    name: 'Stefano Rubini',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/StefanoRubini.png',
    link: 'something',
    title: 'Developer',
    roles: ['Code Reviewer'],
  },
  {
    name: 'Marcos Villanueva Abreu',
    pronouns: 'he/him',
    school: 'University of Nevada, Las Vegas',
    src: 'https://github.com/mva919.png',
    link: 'something',
    title: 'Developer',
    roles: ['Code Reviewer'],
  },
]
