export interface ITech {
  techName:
    | 'html'
    | 'css'
    | 'js'
    | 'ts'
    | 'react'
    | 'mui'
    | 'scss'
    | 'mui'
    | 'node'
    | 'express'
    | 'mongo'
    | 'webpack'
    | 'gulp';
  parent: HTMLElement;
  square: boolean;
}

interface ITechInfo {
  abbr: string;
  fullName: string;
}

const techsInfo = [
  {
    abbr: 'html',
    fullName: 'HTML',
  },
  {
    abbr: 'css',
    fullName: 'CSS',
  },
  {
    abbr: 'js',
    fullName: 'Java+Script',
  },
  {
    abbr: 'ts',
    fullName: 'Type+Script',
  },
  {
    abbr: 'scss',
    fullName: 'SCSS',
  },
  {
    abbr: 'mui',
    fullName: 'Material UI',
  },
  {
    abbr: 'react',
    fullName: 'React',
  },
  {
    abbr: 'node',
    fullName: 'Node.js',
  },
  {
    abbr: 'express',
    fullName: 'Express.js',
  },
  {
    abbr: 'mongo',
    fullName: 'MongoDB',
  },
  {
    abbr: 'webpack',
    fullName: 'webpack',
  },
  {
    abbr: 'gulp',
    fullName: 'Gulp',
  },
];

export class Technology {
  public techNames;
  public parent;
  public square;
  private techText;
  private tech;

  constructor(options: ITech) {
    this.tech = options.techName;
    this.parent = options.parent;
    this.square = options.square;

    this.createTech(this.findText(techsInfo, this.tech));
  }
  findText(arr: Array<ITechInfo>, target: string): ITechInfo {
    let result;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].abbr === target) {
        result = arr[i];

        break;
      }
    }
    console.log(result);
    return result;
  }
  createTech(tech: ITechInfo) {
    const { abbr, fullName } = tech;
    const techWrapper = document.createElement('div');
    techWrapper.className = `projects__review_tech`;
    techWrapper.id = `tech-${abbr}`;

    if (fullName.includes('+')) {
      const techTextArr = fullName.split('+');

      const techTextWrapper = document.createElement('div');

      const techTextElSpan = document.createElement('span');
      techTextElSpan.textContent = techTextArr[0];

      const techTextEl = document.createElement('h4');
      techTextEl.className = `tech-${abbr}_text`;
      techTextEl.textContent = techTextArr[1];

      techTextWrapper.append(techTextElSpan, techTextEl);
      techWrapper.append(techTextWrapper);
    } else {
      const techTextEl = document.createElement('h4');
      techTextEl.className = `tech-${abbr}_text`;
      techTextEl.textContent = fullName;
      techWrapper.append(techTextEl);
    }

    if (this.square) {
      const square = document.createElement('div');
      square.className = 'tech_square';
      techWrapper.append(square);
    }

    this.parent.append(techWrapper);
  }
}
