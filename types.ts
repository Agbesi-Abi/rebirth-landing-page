
export type Page = 'home' | 'expertise' | 'work' | 'project' | 'contact' | 'gallery';

export interface Service {
  id: string;
  title: string;
  description: string;
  alignment: 'left' | 'right' | 'center';
  marginTop: string;
}

export interface Client {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ProjectDetails extends Project {
  client: string;
  year: string;
  services: string[];
  location: string;
  description: string;
  team: { role: string; name: string }[];
  fragments: {
    url: string;
    label: string;
    meta: string;
    colSpan: string;
    aspect: string;
    parallax: number;
  }[];
}
