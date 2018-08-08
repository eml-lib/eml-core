import renderHtml from './render-html';

it('Self-closing elements', () => {
	expect(
		renderHtml(
			{ tagName: 'div', children: [
				{ tagName: 'br' },
				{ tagName: 'input' },
				{ tagName: 'img', attrs: { src: '' } }
			] }
		)
	).toMatchSnapshot();
});

it('Deep', () => {
	expect(
		renderHtml(
			{ tagName: 'div', children: [
				{ tagName: 'div', children: [
					{ tagName: 'div', children: [ 123 ] },
					{ tagName: 'div', children: [
						'Многострочный\nтекст,\nкоторый\nдолжен\nтабулироваться'
					] }
				] }
			] }
		)
	).toMatchSnapshot()
});