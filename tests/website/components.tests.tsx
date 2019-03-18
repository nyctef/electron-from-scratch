import { configure, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Button } from '../../src/website/components';

configure({ adapter: new EnzymeAdapter() });

describe('Button', () => {
  const onClickCallback = jest.fn();

  beforeEach(() => {
    onClickCallback.mockClear();
  });

  describe('with default settings', () => {
    const wrapper = shallow(<Button onClick={onClickCallback} />);

    it('should not be disabled', () => {
      const aTag = wrapper.find('a');
      expect(aTag.hasClass('button--disabled')).toBe(false);
    });

    describe('when link is clicked', () => {
      it('should trigger onClick callback', () => {
        const aTag = wrapper.find('a');
        (aTag.props() as any).onClick();

        expect(onClickCallback.mock.calls).toHaveLength(1);
      });
    });
  });

  describe('when `disabled` is set', () => {
    const wrapper = shallow(<Button onClick={onClickCallback} disabled />);

    it('should be disabled', () => {
      const aTag = wrapper.find('a');
      expect(aTag.hasClass('button--disabled')).toBe(true);
    });

    describe('when link is clicked', () => {
      it('should prevent triggering the onClick callback', () => {
        const aTag = wrapper.find('a');
        (aTag.props() as any).onClick();

        expect(onClickCallback.mock.calls).toHaveLength(0);
      });
    });
  });
});
