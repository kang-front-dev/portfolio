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
export function showDisplayWidth(){
  const widthValue = document.createElement('div')
  widthValue.style.position = 'fixed'
  widthValue.style.top = '10px'
  widthValue.style.right = '10px'
  widthValue.style.zIndex = '10'
  widthValue.textContent = window.innerWidth.toString()
  document.body.append(widthValue)
}                                                        