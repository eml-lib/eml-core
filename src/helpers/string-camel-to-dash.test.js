import camelToDash from './string-camel-to-dash';

it('All in lowercase', () => {
	expect(
		camelToDash('ABCD')
	).toEqual(
		'-a-b-c-d'
	);
});

it('All in uppercase', () => {
	expect(
		camelToDash('abcd')
	).toEqual(
		'abcd'
	);
});