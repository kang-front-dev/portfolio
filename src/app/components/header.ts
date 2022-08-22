export class Header {
  private headerContentRight;
  private artPartsArr;
  public header;
  constructor() {
    this.artPartsArr = [];
    this.headerContentRight = document.querySelector('.header__content_right');
    this.header = document.querySelector('.header');
  }
  init() {
    // this.buildArt();

    this.prepareTitleAnimation();
    this.setNavAnimation();
    // this.setHeaderBgAnimation();
    this.initButton();

    this.setNavColorChange();

    window.addEventListener('resize', () => {
      this.header.style.height = `${window.innerHeight}px`;
    });
  }

  buildArt() {
    const totalAmount = 144;
    const excArr = [
      0, 1, 2, 8, 9, 10, 11, 12, 13, 14, 21, 22, 23, 24, 25, 26, 33, 34, 35, 36,
      37, 38, 45, 46, 47, 48, 49, 57, 58, 59, 60, 61, 70, 71, 72, 83, 132, 138,
    ];

    const parent = document.querySelector('.art');
    let allParts = 0,
      parts = 0;
    this.generatePart(allParts, parts, totalAmount, parent, excArr);
    parent.classList.add('active');
  }
  generatePart(allParts, parts, totalAmount, parent, excArr) {
    if (allParts < totalAmount) {
      const artPart = document.createElement('img');
      const artPartWrapper = document.createElement('div');
      artPartWrapper.id = `artpart-${allParts.toString()}`;
      artPartWrapper.className = 'art_part_wrapper';
      artPartWrapper.append(artPart);
      parent.append(artPartWrapper);

      if (!this.isExc(allParts, excArr)) {
        artPart.className = 'art_part';
        artPart.src = `assets/images/art/Слой ${parts}.png`;

        allParts += 1;
        parts += 1;

        this.artPartsArr.push(allParts);
        this.generatePart(allParts, parts, totalAmount, parent, excArr);
      } else {
        artPart.className = 'art_part art_part-empty';
        allParts += 1;
        this.generatePart(allParts, parts, totalAmount, parent, excArr);
      }
    } else {
      setTimeout(() => {
        this.runPartAnimation();
        this.prepareTitleAnimation();
        this.setNavAnimation();
        // this.setHeaderBgAnimation();
        this.initButton();
      }, 100);
      return;
    }
  }
  isExc(testNum, arr) {
    let isExc = false;
    arr.forEach((exc) => {
      if (testNum === exc) {
        isExc = true;
      }
    });
    return isExc;
  }
  runPartAnimation() {
    let alreadyAnimated = [];
    const allAmount = this.artPartsArr.length;

    this.setPartAnimation(0, allAmount);
  }
  setPartAnimation(key, all) {
    if (key < all - 1) {
      const x = 200;
      const y = 200;
      const target = document.querySelector(
        `#artpart-${this.artPartsArr[key] - 1}`
      ).children[0] as HTMLElement;

      target.classList.add('active');

      setTimeout(() => {
        this.setPartAnimation(key + 1, all);
      }, 10);
    }
  }
  prepareTitleAnimation() {
    const forAnimate = [];
    const headerLeft = document.querySelector('.header__content_left');
    forAnimate.push(headerLeft);
    const name = document.querySelector('.header__content_name');
    forAnimate.push(name);

    const title = document
      .querySelector('.header__content_title')
      .querySelectorAll('span');
    title.forEach((item) => {
      forAnimate.push(item);
    });
    const btn = document.querySelector('.header__content_btn');
    forAnimate.push(btn);
    this.setTitleAnimation(forAnimate, forAnimate.length, 0);
  }
  setTitleAnimation(targets, amount, count) {
    if (count < amount) {
      targets[count].classList.add('active');

      setTimeout(() => {
        this.setTitleAnimation(targets, amount, count + 1);
      }, 70);
    }
  }
  setNavAnimation() {
    const headerNav = document.querySelector('.header__nav');
    headerNav.classList.add('active');
    const mouseIcon = document.querySelector('.scroll_btn');
    mouseIcon.classList.add('active');

    const projects = document.querySelector('.projects'),
    about = document.querySelector('.about')

    const navBtnProjects = document.querySelector('#navBtn-projects'),
    navBtnAbout = document.querySelector('#navBtn-about');

    navBtnProjects.addEventListener('click',(e)=>{
      projects.scrollIntoView()
    })
    navBtnAbout.addEventListener('click',(e)=>{
      about.scrollIntoView()
    })

  }
  setHeaderBgAnimation() {
    const headerBg = document.querySelector('.header-bg');
    headerBg.classList.add('active');
    const headerBgLeft = document.querySelector('.header-bg-left');
    headerBgLeft.classList.add('active');
    setTimeout(() => {
      headerBgLeft.classList.add('slowed');
    }, 2000);

    const headerBgWidth = (headerBg as HTMLElement).offsetWidth;
    const windowHeight = window.innerHeight;
    const headerBgLeftStartWidthPercent = 62;

    const headerBgLeftEndWidthPercent = 30;
    const headerBgLeftWidthRemaining =
      headerBgLeftStartWidthPercent - headerBgLeftEndWidthPercent;
    const headerBgLeftStepWidth = headerBgLeftWidthRemaining / windowHeight;

    let headerBgLeftCurrentWidth = headerBgLeftStartWidthPercent;
    const scrollYStart = 0;
    let scrollY = scrollYStart;


    document.addEventListener('scroll', () => {
      scrollY = headerBg.getBoundingClientRect().top;
      if (
        scrollY + windowHeight > 0 &&
        headerBgLeft.classList.contains('slowed')
      ) {
        headerBgLeftCurrentWidth =
          (scrollYStart - scrollY) * headerBgLeftStepWidth -
          headerBgLeftStartWidthPercent;


        (
          headerBgLeft as HTMLElement
        ).style.transform = `translate(${headerBgLeftCurrentWidth}%,-50%) rotate(15deg)`;
      }
    });
  }
  initButton() {
    const btn = document.querySelector('.header__content_btn');
    const about = document.querySelector('.about');
    const header = document.querySelector('.header')

    btn.addEventListener('click',()=>{
      about.scrollIntoView()
    })
    btn.addEventListener('mousedown',()=>{


      btn.classList.add('pressed')
      btn.classList.remove('active')
      btn.classList.add('animated')
    })
    header.addEventListener('mouseup',()=>{


      btn.classList.remove('pressed')
    })

  }
  setNavColorChange() {
    const headerNav = document.querySelector('.header__nav');
    const main = document.querySelector('.main');
    const about = document.querySelector('.about')
    
    document.addEventListener('scroll', () => {
      if (main.getBoundingClientRect().top < 0) {
        headerNav.classList.add('light');
      } else if (main.getBoundingClientRect().top > 0) {
        headerNav.classList.remove('light');
      }
      
      if (about.getBoundingClientRect().top < 0) {
        headerNav.classList.remove('light');
      }
    });
  }
}

export function getRandomNum(min, max) {
  let result = Math.floor(Math.random() * (max - min) + min);
  return result;
}
