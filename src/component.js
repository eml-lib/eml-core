export default class Component {
	constructor(props) {
		this.props = props;
	}

	render() {
		const componentName = this.constructor.name || 'UnknownComponent';
		throw new Error(`${componentName}: No "render" method found in the returned component`);
	}
}

Component.prototype.isComponent = true;