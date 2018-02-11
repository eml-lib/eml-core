import renderStyle from './render-style';

export default (cssObjList = []) => (
    cssObjList.map(cssObj => (
        Object.entries(cssObj).map(([selector, declBlock]) => (
            selector + ' { ' + renderStyle(declBlock) + ' }\n'
        )).join('')
    )).join('')
);