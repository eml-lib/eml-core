export default class Component {
	constructor(props, context) {
		this.props = props;
		this.context = context;
	}

	render() {
		const componentName = this.constructor.name || 'UnknownComponent';
		throw new Error(`${componentName}: No \`render\` method found in the returned component`);
	}
};

Component.prototype.isComponent = true;
