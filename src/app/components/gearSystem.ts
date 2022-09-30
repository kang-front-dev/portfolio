export class GearSystem {
  private gear1;
  private gear2;
  private gear3;
  private gear4;
  private gear5;
  private gear6;
  private gear7;
  private gear8;

  private gearBase;
  private gearBaseLeft;
  private gearBaseRight;
  private gearBaseBottom;
  constructor() {
    this.gear1 = document.querySelector('.gearSystem_gear-1');
    this.gear2 = document.querySelector('.gearSystem_gear-2');
    this.gear3 = document.querySelector('.gearSystem_gear-3');
    this.gear4 = document.querySelector('.gearSystem_gear-4');
    this.gear5 = document.querySelector('.gearSystem_gear-5');
    this.gear6 = document.querySelector('.gearSystem_gear-6');
    this.gear7 = document.querySelector('.gearSystem_gear-7');
    this.gear8 = document.querySelector('.gearSystem_gear-8');

    this.gearBase = document.querySelector('.gearSystem_base');
    this.gearBaseLeft = document.querySelector('.gearSystem_base-left');
    this.gearBaseRight = document.querySelector('.gearSystem_base-right');
    this.gearBaseBottom = document.querySelector('.gearSystem_base-bottom');

    const gearSystem = document.querySelector('.gearSystem') as HTMLElement;
    gearSystem.style.height = gearSystem.offsetWidth + 'px';
    window.addEventListener('resize', () => {
      gearSystem.style.height = gearSystem.offsetWidth + 'px';
    });

    const width = 740;

    console.log(calculate(width, 70));
    console.log(calculate(width, 137));

    function calculate(width, pxValue) {
      return pxValue / (width / 100);
    }
  }
  init() {

    this.runAnimation();

    let gears = [];
    setInterval(() => {
      moveGear(this.gear1, 10);
    }, 3000);

    function moveGear(gear, degrees) {
      let forRotate;

      gear.style.transform = `rotate(${forRotate}deg)`;
    }
  }
  runAnimation() {
    addClass(this.gearBase, 'active');
    const defaultTimeSpace = 70;

    const targets = [
      this.gear1,
      this.gear6,
      this.gear7,
      this.gearBaseBottom,
      this.gear8,
      this.gearBaseLeft,
      this.gearBaseRight,
      this.gear3,
      this.gear2,
      this.gear4,
      this.gear5,
    ];

    this.animate(0, targets, defaultTimeSpace);
  }

  animate(key, targetsArr, timeSpace) {
    if (key < targetsArr.length) {
      addClass(targetsArr[key], 'active');

      targetsArr[key].style.zIndex = key + 1;
      setTimeout(() => {
        this.animate(key + 1, targetsArr, timeSpace);
      }, timeSpace);
    } else {
      setTimeout(() => {
        this.initSpin();
        if (window.innerWidth <= 800) {
          const gearWrapper = document.querySelector('.gearSystem_wrapper')
          gearWrapper.classList.add('active')
        }
      }, 300);
    }
  }

  initSpin() {
    let spinDegree = 0;
    let spinDegreeStep = 0.1;
    document.addEventListener('scroll', (e) => {
      spinDegree += 1;
    });
    let twisted = false;
    setInterval(() => {
      if (!twisted) {
        if (spinDegreeStep < 1) {
          spinDegreeStep += 0.01;
          spinDegree += spinDegreeStep;
        } else {
          twisted = true;
        }
      } else {
        spinDegreeStep = 1;
        spinDegree += spinDegreeStep;
      }

      this.makeSpin(spinDegree);
    }, 40);
  }
  makeSpin(degree) {
    this.gear1.style.transform = `rotate(${degree}deg)`;
    this.gear2.style.transform = `rotate(${degree * 0.8}deg)`;
    const gear3StartDeg = 8;
    this.gear3.style.transform = `rotate(-${degree * 1.6 + gear3StartDeg}deg)`;

    this.gear4.style.transform = `rotate(-${degree * 3.2}deg)`;

    this.gear5.style.transform = `rotate(${degree * 3.2}deg)`;

    this.gear6.style.transform = `rotate(-${degree * 1.6}deg)`;
    this.gear7.style.transform = `rotate(${degree * 1.2}deg)`;
    this.gear8.style.transform = `rotate(-${degree * 1.2}deg)`;
  }
}

function addClass(target: HTMLElement, className: string) {
  target.classList.add(className);
}
