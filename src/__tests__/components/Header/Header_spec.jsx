/* global it, describe, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/index';

describe('Header Component Test', () => { 
	it('should render without throwing an error', () => {
		expect(shallow(
			<Header>
				<h1>{'Child'}</h1>
				<h1>{'Child 2'}</h1>
			</Header>
		).find('.header').exists()).toBe(true);
	});

	it('should render with a children', () => {
		expect(shallow(
			<Header>
				<h1 className="children">{'Children'}</h1>
				<h1 className="children-2">{'Children'}</h1>
			</Header>
		).find('.children').exists()).toBe(true);
	});
});