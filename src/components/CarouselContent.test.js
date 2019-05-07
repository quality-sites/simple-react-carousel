import React from 'react';
import { shallow, configure } from 'enzyme';
import CarouselContent from './CarouselContent';
import Data from './data.test.json';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

const setup = (props={}, state=null) => {
  const wrapper = shallow(<CarouselContent {...props} />);
  //if (state) wrapper.state(state);
  return wrapper;
}

it('renders correct data ensuring populateCarousel method has been called successfully', () => {
  const data = Data.data[0].hits;
  const items = [];
  const numberOfSlides = 6;
  data.forEach(function (item, index) {
    if (index<6){
      items.push(item);
    }
  });
  const props = { items: items, range: numberOfSlides }
  const wrapper = setup(props, {});
  const expectedString = JSON.stringify(wrapper.props().children[0]);
  expect(wrapper.instance().props.items[0].tags).toBe(data[0].tags);
  expect(expectedString).toContain(data[0].tags);
  expect(wrapper.props().children).toHaveLength(numberOfSlides);
});
