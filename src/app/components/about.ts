export class About {
  private section;
  public parentSelector;
  public windowHeight
  constructor(options) {
    this.section = document.querySelector(options.sectionSelector);
    this.parentSelector = options.sectionSelector;
    this.windowHeight = window.innerHeight
  }
  init() {
    this.setAnimation();
  }
  setAnimation() {
    let targets = [];

    function setTargetText() {
      const title = document.querySelector(`${this.parentSelector}__title`);
      const titleUnderline = document.querySelector(
        `${this.parentSelector}__title_underline`
      );
      const descrArr = document.querySelectorAll(
        `${this.parentSelector}__descr`
      );

      targets.push(title, titleUnderline);
      descrArr.forEach((item) => {
        targets.push(item);
      });
    }
    function setTargetTech() {
      const techTitle = document.querySelector(
        `${this.parentSelector}__tech_title`
      );
      const techItems = document
        .querySelector(`${this.parentSelector}__tech_list`)
        .querySelectorAll('li');

      targets.push(techTitle);
      techItems.forEach((item) => {
        targets.push(item);
      });
    }
    function setTargetContacts() {
      const aboutLeft = document.querySelector('.about__left')
      targets.push(aboutLeft)
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
    function animate(height) {
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < (height / 100) * 85) {
          target.classList.add('active');
        } else if (target.getBoundingClientRect().top > height) {
          target.classList.remove('active');
        }
      });
    }
    animate(this.windowHeight);
    document.addEventListener('scroll', () => {
      animate(this.windowHeight);
    });
  }
}
