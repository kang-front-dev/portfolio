import { Header } from './components/header';

import {
  Projects
} from './components/projects';

import { projectsData } from './components/projects-data';

import { About } from './components/about';
import { GearSystem } from './components/gearSystem';

export class App {
  constructor() {}
  init() {

    
    window.onload = () => {
      const projects = new Projects(projectsData);
      projects.init();
    };

    const header = new Header();
    header.init();

    const about = new About({
      sectionSelector: '.about',
    });
    about.init()

    const gearSystem = new GearSystem()
    gearSystem.init()
  }
}
                                                               