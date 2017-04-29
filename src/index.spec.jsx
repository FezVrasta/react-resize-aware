import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import ResizeAware from './index.js';

function DummyComponent({width, height}) {
  return <div>{width}x{height}</div>;
}

function DummyComponent2({getRef, ...props}) {
  return <div ref={getRef} {...props} />;
}

it('allows to use its children as target', () => {
  const wrapper = mount(
    <ResizeAware style={{position: 'relative'}}>
      <DummyComponent />
    </ResizeAware>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('allows to define an `onResize` property', () => {
  const handleResize = jest.fn();
  const wrapper = mount(
    <ResizeAware style={{position: 'relative'}} onResize={handleResize} />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('allows to define a custom component', () => {
  const wrapper = shallow(
    <ResizeAware style={{position: 'relative'}} component={DummyComponent} />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
