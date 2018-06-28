import renderHtml from './render-html';

describe('Common', () => {
	it('Self-closing elements', () => {
		expect(
			renderHtml(
				{ tagName: 'div', children: [
					{ tagName: 'br' },
					{ tagName: 'input' },
					{ tagName: 'img', attrs: { src: '' } }
				] }
			)
		).toBe(
`<div>
	<br />
	<input />
	<img src="" />
</div>
`
		);
	});

	it('Deep', () => {
		expect(
			renderHtml(
				{ tagName: 'div', children: [
					{ tagName: 'div', children: [
						{ tagName: 'div', children: [ 123 ] },
						{ tagName: 'div', children: [ 456 ] }
					] }
				] }
			)
		).toBe(
`<div>
	<div>
		<div>
			123
		</div>
		<div>
			456
		</div>
	</div>
</div>
`
		)
	})
});