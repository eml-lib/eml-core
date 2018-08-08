import renderStyle from './render-style';

it('Smthng', () => {
	expect(
		renderStyle({
			width: 100,
			height: '100px',
			backgroundColor: 'red'
		})
	).toMatchSnapshot();
});