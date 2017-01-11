var sass = require('node-sass');

module.exports = {
    extensions: ['.scss'],
    preprocessCss: function(css, filename) {
        return sass.renderSync({
            data: css
        }).css;
    },
    generateScopedName: '[name]_[local]_[hash:base64:5]'
};
