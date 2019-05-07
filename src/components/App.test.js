import React from 'react';
import { shallow, configure } from 'enzyme';
import App from './App';
import Data from './data.test.json';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
}

// Integration Testing
describe('Check button elements are loaded correctly on page load', () => {
  it.skip('next button should be enabled on load', () => {
    const wrapper = setup();
    const nextButton = wrapper.find('.carousel__next');
    expect(nextButton.is('[disabled]')).toBe(false);
  });
    
  it.skip('previous button should be disabled on load', () => {
    const wrapper = setup();
    const previousButton = wrapper.find('.carousel__previous');
    expect(previousButton.is('[disabled]')).toBe(true);
  });
});

describe.skip('Should go to next slide once carouselNext method triggered', () => {
  it('doesn not call the click function when it is inactive', () => {
    const wrapper = setup();
    const nextButton = wrapper.find('.carousel__next');
    nextButton.simulate('click');
    expect(nextButton.props().disabled).toEqual(true);
  });
});

describe.skip('Should go to previous slide once carouselPrevious method triggered', () => {
  it('doesn not call the click function when it is inactive', () => {
  const wrapper = setup();
  const previousButton = wrapper.find('.carousel__previous');
  previousButton.simulate('click');
  expect(previousButton.props().disabled).toEqual(true);
  });
});

describe.skip('Should update correct range once updateDimensions() method called based on window size', () => {

  it.skip('Should display 1 item when in mobile view', () => {
    resizeWindow(500, 300);
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(instance.state.range).toEqual(1);
  });

  it.skip('Should display 6 items when in desktop view', () => {
    resizeWindow(2880, 1800);
    const wrapper = setup(props, {});
    const instance = wrapper.instance();
    const range = appInstance.config.range;
    expect(instance.state.range).toEqual(range);
  });
});

// Unit testing
describe.skip('Should get correct range using getRange method ', () => {
  it('doesn not call the click function when it is inactive', () => {

  });
});

describe.skip('Should reset carousel element using reset method', () => {
  it('doesn not call the click function when it is inactive', () => {

  });
});
