import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import CarouselContent from './CarouselContent';
const { getData } = require('../util');

class App extends Component {

  constructor(props){
    super(props);
    this.config = { 
      title : 'React Carousel',
      range : 6,
      currentPoint : 0,
      api : 'http://localhost:3004',
      defaultQuery : '/data',
      deviceViewSize: 720
    }
    this.nextCounter = 0;
    this.previousCounter = 0;
    this.carouselPrevious = this.carouselPrevious.bind(this);
    this.carouselNext = this.carouselNext.bind(this);
    this.state = { 
        title: this.config.title,
        range: this.config.range,
        hits: [{}, 1, this.config.range],
        items: [{}]
    };
    this.loadData(this.config.api, this.config.defaultQuery);
  }

  updateDimensions() {
      const slideWidth = window.innerWidth;
      if (slideWidth < this.config.deviceViewSize){
        this.setState({range:1});
      } else {
        this.setState({range:this.config.range});
      }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  loadData = (api, defaultQuery) => { 
      getData(api, defaultQuery).then(data => {
        if (data){
          const numberOfSlides = (Math.floor(data.data[0].hits.length / this.state.range))-1;
          const currentSlide = 1;
          this.setState({ hits: data.data[0].hits, numberOfSlides, currentSlide });
          this.populateCarousel();
          this.updateDimensions();
        }
      });
  };

  populateCarousel(direction){
      let items = [{}];
      let fromRange = this.getRange(direction);
      if (!fromRange){
        fromRange = 0;
      }
      let toRange = this.config.currentPoint+this.state.range;
      if (!toRange){
        toRange = 0;
      }
      const array = this.state.hits;
      if (array.length>0){
        items = array.slice(fromRange, toRange);
      }
      const currentSlide = (Math.floor(this.config.currentPoint / this.state.range));
      this.setState({ items, currentPoint: this.config.currentPoint, currentSlide });
  }

  getRange(direction){
      if (direction==='previous'){
          this.config.currentPoint = this.config.currentPoint-this.state.range; 
      } else if (direction==='next') {
          this.config.currentPoint = this.config.currentPoint+this.state.range; 
      } else {
          this.config.currentPoint = 0;
      }
      return this.config.currentPoint;
  }

  reset(value){
    const hiddenCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.hidden'));
    const activeCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.active'));
    hiddenCarousel.style.transition = '0s';
    hiddenCarousel.style.left = value;
    activeCarousel.style.left = '0';
  }

  carouselPrevious(){
    const hiddenCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.hidden'));
    const activeCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.active'));
    this.reset('-100%');
    setTimeout(() => {
      hiddenCarousel.style.opacity = '0.25';
      hiddenCarousel.style.transition = '0.5s';
      hiddenCarousel.style.left = '100%';
      activeCarousel.style.left = '0';
      this.populateCarousel('previous');
    }, 50); 
  }

  carouselNext(){
    const hiddenCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.hidden'));
    const activeCarousel = ReactDOM.findDOMNode(document.querySelector('.carousel__slides.active'));
    this.reset('100%');
    setTimeout(() => {
      hiddenCarousel.style.opacity = '0.25';
      hiddenCarousel.style.transition = '0.5s';
      hiddenCarousel.style.left = '-100%';
      activeCarousel.style.left = '0';
      this.populateCarousel('next');
    }, 50); 
  }

  render() {
    return(
      <div className="app">
        <header className="header">
          {this.state.title}
        </header>
        <div className="carousel">
              <CarouselContent items={this.state.items} range={this.state.range} class="active"></CarouselContent>
              <CarouselContent items={this.state.items} range={this.state.range} class="hidden"></CarouselContent>
              <button className="carousel__previous" disabled={(this.state.currentSlide === 0 ? true:false)} onClick={this.carouselPrevious}>Prev</button>
              <button className="carousel__next" disabled={(this.state.currentSlide === this.state.numberOfSlides ? true:false)} onClick={this.carouselNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
