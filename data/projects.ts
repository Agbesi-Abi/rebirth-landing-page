import { ProjectDetails } from '../types';

export const PROJECTS: ProjectDetails[] = [
  // {
  //   id: 'fix-the-country',
  //   title: "Fix The Country",
  //   client: "Grassroots Movement",
  //   year: "2021-2024",
  //   services: ["Creative Strategy", "Digital Activism", "Visual Identity"],
  //   location: "Accra / Global",
  //   team: [
  //     { role: "Director", name: "Rebirth Studio" },
  //     { role: "Strategy", name: "David Olufemi" },
  //     { role: "Digital Lead", name: "Marcus Chen" }
  //   ],
  //   imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130192/_W6A7206_pino4p.jpg',
  //   category: 'Digital Strategy',
  //   description: "A revolutionary digital campaign that mobilized a nation. We developed a visual language that spoke to the aspirations of a new generation, creating a brand that became synonymous with the pursuit of accountability. This project redefined how movements are branded in the digital age.",
  //   fragments: [
  //     {
  //       url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130192/_W6A7206_pino4p.jpg',
  //       label: 'ARCHIVE_01', meta: 'PRIMARY_BANNER', colSpan: 'col-span-12', aspect: 'aspect-[21/9] md:aspect-video', parallax: 0.05
  //     },
  //     {
  //       url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130189/_K2A7045_xptwf1.jpg',
  //       label: 'ARCHIVE_02', meta: 'DETAIL_VIEW_01', colSpan: 'col-span-12 md:col-span-5', aspect: 'aspect-[3/4]', parallax: 0.12
  //     },
  //     {
  //       url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg',
  //       label: 'ARCHIVE_03', meta: 'STREET_ACTIVATION', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3] md:mt-32', parallax: -0.08
  //     }
  //   ]
  // },
  {
    id: 'kalys-house',
    title: "Kaly's House",
    client: "Kalyjay / Digital Series",
    year: "2024",
    services: ["Content Production", "Talent Management", "Creative Direction"],
    location: "Ghana / Accra / Global",
    team: [
      { role: "Producer", name: "Sarah Boateng" },
      { role: "Editor", name: "Marcus Chen" },
      { role: "Creative Director", name: "David Olufemi" }
    ],
    imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg',
    category: 'Content Production',
    description: "An immersive 24-hour documentary series capturing the authentic life of digital influencer Kalyjay. We crafted a narrative that showcased the raw energy of contemporary African youth culture, blending street photography with intimate storytelling.",
    fragments: [
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770130189/_K2A6899_xtowwf.jpg',
        label: 'ARCHIVE_01', meta: 'PRIMARY_BANNER', colSpan: 'col-span-12', aspect: 'aspect-[21/9] md:aspect-video', parallax: 0.05
      },
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130189/_K2A7045_xptwf1.jpg',
        label: 'ARCHIVE_02', meta: 'DETAIL_VIEW_01', colSpan: 'col-span-12 md:col-span-5', aspect: 'aspect-[3/4]', parallax: 0.12
      },
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg',
        label: 'ARCHIVE_03', meta: 'STREET_ACTIVATION', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3] md:mt-32', parallax: -0.08
      },
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206176/1Y3A6944_e6qsrj.jpg',
        label: 'ARCHIVE_04', meta: 'STREET_ACTIVATION', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3] md:mt-32', parallax: -0.08 
      },
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206157/_K2A6888_p8zcd7.jpg',
        label: 'ARCHIVE_05', meta: 'STREET_ACTIVATION', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3] md:mt-32', parallax: -0.08 
      },
      {
        url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg',
        label: 'ARCHIVE_06', meta: 'STREET_ACTIVATION', colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/3] md:mt-32', parallax: -0.08 
      }  
    ]
  }
];

export const getProjectById = (id: string): ProjectDetails | undefined => {
  return PROJECTS.find(project => project.id === id);
};
   


// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130190/_K2A7094_mcqvli.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130189/_K2A7033_fcu6bd.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130176/1Y3A5491_xfiqac.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130192/_W6A7206_pino4p.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206176/1Y3A6944_e6qsrj.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206157/_K2A6888_p8zcd7.jpg
// https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130175/1Y3A5589_w5gly4.jpg
