import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './converter';
import ReactTestUtils from 'react-dom/test-utils';
import jsonToGoMap from '../lib/jsonToGoMap.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Converter />, div);
});

it('updates the state on the onChange event', () => {
  const converter = ReactTestUtils.renderIntoDocument(<Converter />);
  const textarea = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'textarea');

  const initialValue = '{ "a" : true }';
  textarea.value = initialValue;
  const expectedValue = jsonToGoMap(initialValue);

  ReactTestUtils.Simulate.change(textarea);

  expect(converter.state.result).toBe(expectedValue);
});

it('should show "copied" text copy action', () => {
  const converter = ReactTestUtils.renderIntoDocument(<Converter />);
  const textarea = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'textarea');

  jest.spyOn(converter, 'setCopiedToTrue');

  const initialValue = '{ "a" : true }';
  textarea.value = initialValue;
  const expectedValue = jsonToGoMap(initialValue);

  ReactTestUtils.Simulate.change(textarea);

  expect(converter.setCopiedToTrue).not.toHaveBeenCalled();
  const button = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'button');

  ReactTestUtils.Simulate.click(button);

  expect(converter.setCopiedToTrue).toHaveBeenCalledWith(expectedValue);
});
