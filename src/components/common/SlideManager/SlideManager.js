import React from "react";
import styles from "./SlideManager.module.css";



class SlideManager extends React.Component {
    constructor({
                    commonCarousel,
                    containerCarousel,
                    sliderCarousel,
                    dotsCarousel,
                    prevButton,
                    nextButton,
                    options: {isInfinity, isLooped, slidesToShow, canDrag, delay, speed, axis, direction},
                    responsive

                }) {
        super();
        this.commonCarousel = commonCarousel;
        this.containerCarousel = containerCarousel;
        this.sliderCarousel = sliderCarousel;
        this.dotsCarousel = dotsCarousel;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        // ============== Options ====================
        this.isInfinity = isInfinity;
        this.isLooped = isLooped;
        this.slidesToShow = slidesToShow ? slidesToShow : 1;
        this.canDrag = canDrag;
        this.delay = delay ? delay + speed * 1000 : 0;
        this.speed = speed;
        this.axis = (axis === 'Y') ? 'Y' : 'X';
        this.direction = !(direction === 'down' || direction === 'right');
        // ============== innerOptions ====================
        this.timerId = null;
        this.slides = sliderCarousel.children;
        this.dots = dotsCarousel ? dotsCarousel.children : null;
        this.position = 0;
        this.dotPosition = 0;
        this.sizeSlide = (this.axis === 'X')
            ? this.sliderCarousel.offsetWidth / this.slidesToShow
            : this.containerCarousel.offsetHeight / this.slidesToShow;
        this.responsive = responsive;
        this.isDown = false;
        this.startCoordinate = null;
        this.scrollToDirection = 0;
        this.walk = 0;
        // debugger
    }


    init() {
        this.addClass();
        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener('click', () => {this.direction ? this.prevSlide() : this.nextSlide()});
            this.nextButton.addEventListener('click', () => {this.direction ? this.nextSlide() : this.prevSlide()});
        }
        if (this.canDrag) {
            this.sliderCarousel.addEventListener('mousedown', (e) => {this.handleMouseDown(e)});
            this.sliderCarousel.addEventListener('mouseleave', () => {this.handleMouseLeave()});
            this.sliderCarousel.addEventListener('mouseup', () => {this.handleMouseUp()});
            this.sliderCarousel.addEventListener('mousemove', (e) => {this.handleMouseMove(e)});
        }
        if (this.responsive) {
            this.responseInit();
        }
        if (this.delay) {
            this.commonCarousel.addEventListener('mouseenter', (e) => {this.toggleTimer(e)});
            this.commonCarousel.addEventListener('mouseleave', (e) => {this.toggleTimer(e)});
            this.startTimer();
        }
        if (this.dots) {
            this.dots[0].classList.add(`${styles.activeDot}`);
            for (let i = 0; i < this.dots.length; i++) {
                //очень важно, чтобы у точек и всей карусели было одинаковое время трансформации, иначе
                //карусель двигается рывками
                this.dots[i].style.transition = `all ${this.speed}s`;
                this.dots[i].addEventListener('click', () => {this.currentSlide(i)})
            }
        }
        if (this.isInfinity) {
            this.cloneElements();
            this.commonCarousel.addEventListener('transitionend', this.jump);
        }

    }

    //===============================


    scrollToPosition = () => {
        this.scrollToDirection = - this.position * this.sizeSlide;
        this.sliderCarousel.style.transform = `translate${this.axis}(${this.scrollToDirection}px)`;
    };


    //===============================
    cloneElements = () => {
        this.sliderCarousel.style.transition = `none`;

        for (let i = 0; i < this.slidesToShow; i++) {
            let firstClone = this.slides[i * 2].cloneNode(true);
            let lastClone = this.slides[this.slides.length - 1 - i * 2].cloneNode(true);
            this.sliderCarousel.append(firstClone);
            this.sliderCarousel.prepend(lastClone);
        }

        this.position = this.slidesToShow;
        this.scrollToPosition();
    };

    jump = () => {
        if (this.position >= this.slides.length - this.slidesToShow) {
            this.sliderCarousel.style.transition = `none`;
            this.position = this.slidesToShow;
            this.scrollToPosition();
        }
        if (this.position === 0) {
            this.sliderCarousel.style.transition = `none`;
            this.position = this.slides.length - this.slidesToShow * 2;
            this.scrollToPosition();
        }
    };

    //===============================
    startTimer = () => {
       this.timerId = setInterval(this.run, this.delay);
    };

    run = () => {
        this.direction ? this.nextSlide() : this.prevSlide();

        if (this.dots) {
            this.changeDot();
        }
    };

    toggleTimer = (e) => {
        if (e.type === 'mouseenter') {
            this.timerId = clearTimeout(this.timerId);
        }
        if (e.type === 'mouseleave') {
            this.startTimer();
        }
    };

    //=================================
    currentSlide = (n) => {

        this.changeDot(n);
        this.sliderCarousel.style.transition = `all ${this.speed}s`;

        this.position = n;
        if (this.isInfinity) {
            this.position = n + this.slidesToShow;
        }

        this.scrollToPosition();
    };

    changeDot = (n) => {
        this.dotPosition = (typeof n === 'number') ? n : ++this.dotPosition;

        if (this.dotPosition >= this.dots.length) {
            this.dotPosition = 0;
        }
        if (this.dotPosition < 0) {
            this.dotPosition = this.dots.length - 1;
        }

        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove(`${styles.activeDot}`);
        }
        this.dots[this.dotPosition].classList.add(`${styles.activeDot}`);
    };

    //==================================
    prevSlide = () => {
        this.sliderCarousel.style.transition = `all ${this.speed}s`;

        if (this.isLooped || this.position > 0) {
            --this.position;

            if (this.position < 0) {
                this.position = this.slides.length - this.slidesToShow;
            }

            this.scrollToPosition();
        }
    };

    nextSlide = () => {
        this.sliderCarousel.style.transition = `all ${this.speed}s`;

        if (this.isLooped || this.position < this.slides.length - this.slidesToShow) {
            ++this.position;

            if (this.position > this.slides.length - this.slidesToShow) {
                this.position = 0;
            }

            this.scrollToPosition();
        }
    };

    //==============================================
    addClass() {
        this.sliderCarousel.style.transition = `all ${this.speed}s`;
        this.sliderCarousel.classList.add(`${styles.slider}`);

        //необходимо для responseInit
        this.sizeSlide = (this.axis === 'X')
            ? this.sliderCarousel.offsetWidth / this.slidesToShow
            : this.containerCarousel.offsetHeight / this.slidesToShow;

        for (let item of this.slides) {
            (this.axis === 'X')
                ? item.style.flex = `0 0 ${Math.floor(100 / this.slidesToShow)}%`
                : item.style.height = `${(this.sizeSlide)}px`;
        }

        if (this.dots) {
            for (let dot of this.dots) {
                dot.classList.add(`${styles.dot}`);
            }
        }
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allRespone = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allRespone);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;

            if (widthWindow < maxResponse) {
                for (let i = 0; i < allRespone.length; i++) {
                    if (widthWindow < allRespone[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
            }

            this.addClass();
        };

        checkResponse();
        window.addEventListener('resize', checkResponse);
    }

    //==================================================
    handleMouseDown = (e) => {
        this.sliderCarousel.style.transition = `all 0s`;

        this.isDown = true;
        this.sliderCarousel.classList.add(`${styles.active}`);

        this.startCoordinate = (this.axis === 'X') ? e.pageX : e.pageY + this.scrollToDirection;
    };

    handleMouseLeave = () => {
        this.isDown = false;
        this.sliderCarousel.classList.remove(`${styles.active}`);
    };

    handleMouseUp = () => {
        this.sliderCarousel.style.transition = `all ${this.speed}s`;

        this.isDown = false;
        this.sliderCarousel.classList.remove(`${styles.active}`);
        this.scrollToDirection = this.scrollToDirection + this.walk;

        if (this.scrollToDirection > 0) {
            this.position = 0;
            this.scrollToDirection = 0;
            this.sliderCarousel.style.transform = `translate${this.axis}(${this.scrollToDirection}px)`;
        }

        for (let i = 0; i < (this.slides.length - this.slidesToShow); i++) {
            if (- i * this.sizeSlide > this.scrollToDirection) {
                if (this.walk < 0) {
                    this.position = i + 1;
                }
                if (this.walk > 0) {
                    this.position = i;
                }
            }
        }

        this.scrollToPosition();

        if (this.dots && this.isInfinity) {
            // this.changeDot(this.position - 1);
            this.changeDot(this.position - this.slidesToShow);
        }
        if (this.dots && this.isLooped) {
            this.changeDot(this.position);
        }
    };

    handleMouseMove = (e) => {
        if (!this.isDown) return;
        // e.preventDefault();
        let currentCoordinate = (this.axis === 'X') ? e.pageX : e.pageY + this.scrollToDirection;
        this.walk = currentCoordinate - this.startCoordinate;

        this.sliderCarousel.style.transform = `translate${this.axis}(${this.scrollToDirection + this.walk}px)`;
    };
}



export default SlideManager;
