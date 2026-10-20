const reset = {
    '*, *::before, *::after': {
        boxSizing: 'border-box',
    },
    'html, body, #root': {
        margin: 0,
        padding: 0,
        height: '100%',
    },
    'h1, h2, h3, h4, p, ul, ol, figure': {
        margin: 0,
        padding: 0,
    },
    'ul, ol': {
        listStyle: 'none',
    },
    img: {
        display: 'block',
        maxWidth: '100%',
    },
    button: {
        font: 'inherit',
    },
};

export default reset;
