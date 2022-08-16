export interface ITech {
  techName: 'html' | 'css' | 'js' | 'scss' | 'ts' | 'webpack' | 'gulp';
  parent: HTMLElement;
  square: boolean
}

export class Technology {
  public techNames;
  public parent;
  public square
  private techText;
  private tech;
  
  constructor(options: ITech) {
    this.techText = [
      ['html', 'HTML'],
      ['css', 'CSS'],
      ['js', 'Java+Script'],
      ['scss', 'SCSS'],
      ['ts', 'Type+Script'],
      ['webpack', 'webpack'],
      ['gulp', 'Gulp'],
    ];
    this.tech = options.techName;
    this.parent = options.parent;
    this.square = options.square

    this.createTech(this.findText(this.techText, this.tech));
  }
  findText(arr: Array<string>, target: string): Array<string> {
    let result;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === target) {
        result = arr[i];
        

        break;
      }
    }
    return result;
  }
  createTech([techName, techText]) {
    const techWrapper = document.createElement('div');
    techWrapper.className = `tech-${techName}`;


    if (techText.includes('+')) {
      const techTextArr = techText.split('+')
      

      const techTextWrapper = document.createElement('div')

      const techTextElSpan = document.createElement('span');
      techTextElSpan.textContent = techTextArr[0];

      const techTextEl = document.createElement('h4');
      techTextEl.className = `tech-${techName}_text`;
      techTextEl.textContent = techTextArr[1];

      techTextWrapper.append(techTextElSpan,techTextEl)
      techWrapper.append(techTextWrapper);
    } else {
      const techTextEl = document.createElement('h4');
      techTextEl.className = `tech-${techName}_text`;
      techTextEl.textContent = techText;
      techWrapper.append(techTextEl);
    }

    if(this.square){
      const square = document.createElement('div')
      square.className = 'tech_square'
      techWrapper.append(square)
    }

    this.parent.append(techWrapper);
  }
}
