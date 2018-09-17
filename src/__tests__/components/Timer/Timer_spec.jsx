/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Timer } from '../../../components/index';

describe('Timer Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(<Timer time={90}/>).find('.timer').exists()).toBe(true);
	});
});