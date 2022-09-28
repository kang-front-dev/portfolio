import { getRandomNum } from './header';
import { Technology, ITech } from './techs';

export interface IProjectCard {
  id: string;
  title: string;
  descr: string;
  imageSrc: string;
  techs: Array<string>;
  date: string;
  link: string;
}

export class Projects {
  private projectsReview;
  private projectsReviewContainer;
  private projectsCards;
  private projectsCardsInfo: Array<IProjectCard>;
  private projectsReviewBackplate;
  private projectsWrapper
  private windowHeight;

  constructor(options) {
    this.projectsReview = document.querySelector('.projects__review');
    this.projectsReviewContainer =
      this.projectsReview.querySelector('.container');
    this.projectsCardsInfo = options.cards;
    this.windowHeight = window.innerHeight;
    this.projectsWrapper = document.querySelector('.projects__wrapper')

    this.createProjectsReviewBackplate();
  }
  init() {
    this.generateCards()
    this.setCardListeners();
    this.setCardsAnimation();
  }
  generateCards(){
    this.projectsCardsInfo.forEach((item,index) => {
      console.log(item);
      const cardIndex = index < 9 ? `0${index + 1}.` : `${index + 1}.`
      const card = buildElement({
        tag: 'div',
        class: 'projects__card',
        id: item.id
      })
      this.projectsWrapper.append(card)

      const img = buildElement({
        tag: 'img',
        class: 'projects__card_img',
        src: item.imageSrc
      })
      card.append(img)

      const textBlock = buildElement({
        tag: 'div',
        class: 'projects__card_text'
      })
      card.append(textBlock)

      const number = buildElement({
        tag: 'div',
        class: 'projects__card_number',
        textContent: cardIndex
      })
      textBlock.append(number)

      const textBlockRight = buildElement({
        tag: 'div',
        class: 'projects__card_text-right'
      })
      textBlock.append(textBlockRight)

      const title = buildElement({
        tag: 'h3',
        class: 'projects__card_title',
        textContent: item.title
      })
      textBlockRight.append(title)

      const descr = buildElement({
        tag: 'p',
        class: 'projects__card_descr',
        textContent: item.descr
      })
      textBlockRight.append(descr)
    })
    this.projectsCards = document.querySelectorAll('.projects__card')
  }
  setCardsAnimation() {
    const sectionTitle = document.querySelector('.projects__title'),
      cards = this.projectsCards;

    const targets = [sectionTitle];

    cards.forEach((item) => {
      targets.push(item);
    });
    function animate() {
      let height = window.innerHeight
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < (height / 100) * 85) {
          target.classList.add('active');
          if (target.querySelector('.projects__card_underline')) {
            setTimeout(() => {
              target
                .querySelector('.projects__card_underline')
                .classList.add('active');
            }, 500);
          }
        } else if (target.getBoundingClientRect().top > height) {
          target.classList.remove('active');
        }
      });
    }
    animate();
    document.addEventListener('scroll', () => {
      animate();
    });
  }
  setCardListeners() {
    this.projectsCards.forEach((card) => {
      card.addEventListener('click', () => {
        card.style.pointerEvents = 'none';
        this.showProjectReview(card.id);
        document.body.classList.add('active');
        setTimeout(() => {
          card.style.pointerEvents = 'all';
        }, 1000);
      });
    });
  }
  showProjectReview(cardId) {
    let cardInfo;

    for (let i = 0; i < this.projectsCardsInfo.length; i++) {
      console.log(this.projectsCardsInfo[i]);
      
      if (this.projectsCardsInfo[i].id === cardId) {
        cardInfo = this.projectsCardsInfo[i];
        break;
      }
    }

    const container = document.createElement('div');
    container.classList.add('container');
    this.projectsReview.append(container);

    const headwrapper = document.createElement('div')
    headwrapper.className = 'projects__review_wrapper-head'
    container.append(headwrapper)

    const leftWrapper = document.createElement('div');
    leftWrapper.classList.add('projects__review_wrapper-left');
    headwrapper.append(leftWrapper);

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('projects__review_wrapper-text');

    const title = document.createElement('h2');
    title.textContent = cardInfo.title;
    title.classList.add('projects__review_title');
    const titleUnderline = document.createElement('div');
    titleUnderline.classList.add('projects__review_title_underline');

    const descr = document.createElement('p');
    descr.textContent = cardInfo.descr;
    descr.classList.add('projects__review_descr');
    textWrapper.append(title, titleUnderline, descr);

    const btn = document.createElement('a');
    btn.href = '#';
    btn.textContent = 'Link on website';
    btn.href = cardInfo.link
    btn.target = '_blank'
    btn.classList.add('projects__review_btn');

    const snow = createSnowfall({
      minPartSize: 4,
      maxPartSize: 8,
      minAnimationTime: 1500,
      maxAnimationTime: 3000,
      amount: 20,
      target: btn,
      id: 'btn-snowfall',
    });

    leftWrapper.append(textWrapper, btn);

    const backBtn = document.createElement('i');
    backBtn.className = 'projects__review_btn-back fas fa-arrow-alt-left';
    backBtn.addEventListener('click', () => {
      this.projectsReview.classList.remove('active');
      this.resetProjectsReviewBackplatePart();

      document.body.classList.remove('active');

      this.projectsReviewBackplate.classList.remove('active');
      [title, titleUnderline, descr, btn, backBtn, img].forEach((item) => {
        item.classList.remove('active');
      });
      container.remove();
    });
    this.projectsReview.append(backBtn);

    const rightWrapper = document.createElement('div');
    rightWrapper.className = 'projects__review_wrapper-right';
    headwrapper.append(rightWrapper);

    const img = document.createElement('img');
    img.src = cardInfo.imageSrc;
    img.classList.add('projects__review_img');
    rightWrapper.append(img);

    ////////////////////////////TECHS///////////////////
    const techWrapper = document.createElement('div');
    techWrapper.className = 'tech_wrapper';
    rightWrapper.append(techWrapper);

    cardInfo.techs.forEach((techName, index) => {
      let square = true;
      if (index === cardInfo.techs.length - 1) {
        square = false;
      }
      

      const tech = new Technology({
        techName: techName,
        parent: techWrapper,
        square: square,
      });
    });
    ////////////////////////////////////////////////////

    if(window.innerWidth > 780){
      const date = document.createElement('div');
      date.className = 'projects__review_date';
      date.textContent = cardInfo.date;
      rightWrapper.append(date);
    }


    let extraImages,
    scrollIcon
    let animationTargets = [
      title,
      titleUnderline,
      descr,
      backBtn,
      img,

    ]

    if (cardInfo.hasOwnProperty('extraImg') && cardInfo.extraImg.length > 0) {
      scrollIcon = document.createElement('div');
      scrollIcon.className = 'scroll_btn';
      container.append(scrollIcon);
      
      extraImages = generateExtraImages();

      animationTargets.push(scrollIcon,extraImages)
    }
    this.projectsReviewBackplate.classList.add('active');
    this.animateProjectsReviewBackplatePart(
      this.projectsReviewBackplatePartsAmount,
      0
    );
    setTimeout(() => {
      this.projectsReview.classList.add('active');

      animationTargets.forEach((item) => {

        
        if (!Array.isArray(item)) {
          item.classList.add('active');
        } else {
          item.forEach((subItem) => {
            subItem.classList.add('active');
          });
        }
      });
      setTimeout(() => {
        btn.classList.add('active');
      }, 300);
    }, 1000);

    function generateExtraImages() {
      let arr = [];
      cardInfo.extraImg.forEach((src) => {
        const extraImg = document.createElement('img');
        extraImg.className = 'projects__review_img-extra';
        extraImg.src = src;

        container.append(extraImg);
        arr.push(extraImg);
      });
      return arr;
    }
  }

  private projectsReviewBackplatePartsAmount;

  createProjectsReviewBackplate() {
    const projectsBackplate = document.createElement('div');
    this.projectsReviewBackplate = projectsBackplate;
    projectsBackplate.classList.add('projects__review-backplate');
    document.body.append(projectsBackplate);

    const projectsBackplateColumns = 30;
    const gap = 0;
    const projectsBackplateSize =
        (projectsBackplate.offsetWidth - (projectsBackplateColumns - 1) * gap) /
        projectsBackplateColumns,
      projectsBackplateRows = Math.ceil(
        (window.innerHeight - 67) / projectsBackplateSize
      );
    

    this.projectsReviewBackplate.style.gridTemplateColumns = `repeat(${projectsBackplateColumns},${projectsBackplateSize}px)`;
    this.projectsReviewBackplate.style.gridAutoRows = `${projectsBackplateSize}px`;

    const partsAmount = projectsBackplateRows * projectsBackplateColumns;
    this.projectsReviewBackplatePartsAmount = partsAmount;
    for (let i = 0; i < partsAmount; i++) {
      const part = document.createElement('div');
      part.classList.add('projects__review-backplate_part');
      part.id = `projects-backplate-part-${i}`;
      projectsBackplate.append(part);
    }

    projectsBackplate.classList.add('enabled');
  }

  animateProjectsReviewBackplatePart(amount, key) {
    if (key < amount - 1) {
      for (let i = 0; i < 5; i++) {
        const target = document.querySelector(
          `#projects-backplate-part-${key + i}`
        );
        target.classList.add('active');
      }
      setTimeout(() => {
        this.animateProjectsReviewBackplatePart(amount, key + 5);
      }, 2);
    }
  }
  resetProjectsReviewBackplatePart() {
    const parts = document.querySelectorAll('.projects__review-backplate_part');
    parts.forEach((item) => {
      item.classList.remove('active');
    });
  }
}
export interface ISnowInfo {
  minPartSize: number;
  maxPartSize: number;
  minAnimationTime: number;
  maxAnimationTime: number;
  amount: number;
  target: HTMLElement;
  id: string;
}
export function createSnowfall(options: ISnowInfo) {
  const snow = document.createElement('div');
  snow.classList.add('snow');
  snow.id = options.id;

  const snowWrapper = document.createElement('div');
  snowWrapper.classList.add('snow__wrapper');
  snow.append(snowWrapper);

  for (let i = 0; i < options.amount; i++) {
    const snowParticle = document.createElement('div');
    const snowParticleSize = getRandomNum(
      options.minPartSize,
      options.maxPartSize
    );
    const animationTime = getRandomNum(
      options.minAnimationTime,
      options.maxAnimationTime
    );
    const margin = getRandomNum(0, 100);

    snowParticle.classList.add('snow__particle');
    snowParticle.style.width = snowParticleSize + 'px';
    snowParticle.style.height = snowParticleSize + 'px';
    snowParticle.style.animation = `snowfall ${animationTime}ms infinite linear`;
    snowParticle.style.left = `${margin}%`;
    snowWrapper.append(snowParticle);
  }

  options.target.append(snow);
  return snow;
}
export interface IElement{
  tag: string,
  class: string,
  textContent?: string,
  id?: string,
  src?: string,
  href?: string
}
export function buildElement(options:IElement){
  const element = document.createElement(options.tag)
  element.className = options.class
  if (options.textContent) {
    element.textContent = options.textContent
  }
  if (options.src) {
    (element as HTMLImageElement | HTMLVideoElement).src = options.src
  }
  if (options.id) {
    element.id = options.id
  }
  return element

}