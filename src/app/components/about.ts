export class About {
  private section;
  public parentSelector;
  public windowHeight;
  constructor(options) {
    this.section = document.querySelector(options.sectionSelector);
    this.parentSelector = options.sectionSelector;
    this.windowHeight = window.innerHeight;
  }
  init() {
    this.setAnimation();
  }
  setAnimation() {
    let targets = [];

    function setTargetText() {
      const titles = document.querySelectorAll(`${this.parentSelector}__title`);
      const titleUnderlines = document.querySelectorAll(
        `${this.parentSelector}__title_underline`
      );
      const descrArr = document.querySelectorAll(
        `${this.parentSelector}__descr`
      );
      descrArr.forEach((item) => {
        targets.push(item);
      });
      titles.forEach((item) => {
        targets.push(item);
      });
      titleUnderlines.forEach((item) => {
        targets.push(item);
      });
    }
    function setTargetTech() {
      const techTitles = document.querySelectorAll(
        `${this.parentSelector}__tech_title`
      );
      const techLists = document.querySelectorAll(
        `${this.parentSelector}__tech_list`
      );

      techLists.forEach((item) => {
        
        const target = item.querySelectorAll('li');
        target.forEach(techs => {
          targets.push(techs);
        })
      });

      techTitles.forEach((item) => {
        targets.push(item);
      });

    }
    function setTargetContacts() {
      const aboutLeft = document.querySelector('.about__left');
      targets.push(aboutLeft);
      const link = document.querySelectorAll(
        `${this.parentSelector}__contacts_link`
      );
      link.forEach((item) => {
        targets.push(item);
      });
    }

    const img = document.querySelector(`${this.parentSelector}__img_wrapper`);
    targets.push(img);

    setTargetText.call(this);
    setTargetTech.call(this);
    setTargetContacts.call(this);

    ////////////////////////////////
    function animate() {
      let height = window.innerHeight;
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < (height / 100) * 85) {
          target.classList.add('active');
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
}
