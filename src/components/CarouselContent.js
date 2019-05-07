import React, { Component } from 'react';
import './App.scss';

class CarouselContent extends Component {

  render() {
    function slideCount(range){
      return 100/range;
    }

    const items = this.props.items;
    return(
        <ul className={`carousel__slides ${ this.props.class }`} data-test="carousel__slides">
          {items.map((value, index) => {
            return <li style={{width:slideCount(this.props.range)+'%'}} className="carousel__slide" key={index}>
              <div className="carousel__slide--content" data-text="carousel__slide--content">
                <div className="carousel__slide--inner">
                </div>
                <div className="carousel__slide--description">{value.tags}</div>
              </div>
            </li>
          })}
        </ul>
    );
  }
}

export default CarouselContent;
