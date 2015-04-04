# kontainer

ViewModel lifecycle manager for (parts of) KnockoutJS applications. Offers more flexibility
than built-in KO components and prevent unnecessary reflows.

## API

    var show = kontainer.create(Element|String target)

Returns function to replace the contents of the given target element.
The target element can be given as a DOM element or a selector expression.

    show(DOM|String template, Object viewModel)

Binds and renders the template to the previously set target. Template
can be either a DOM element/document fragment or a string. Unbinds
previously set viewModel. If the old viewModel had `dispose()` method
then it is executed.

## Example

    var show = kontainer.create('#content');
    document.getElementById('link-page-1').addEventListener('click', function() {
        show('<span data-bind="text: message"></span>', { message: ko.observable('Hello World!') });
    }, false);

Creates target on element with id `content` and sets up a link handler to replace its
contents with the given template and view model.

## AMD/CommonJS

The source `kontainer.js` uses CommonJS module format. `dist/kontainer-standalone.js`
contains minified build in UMD format that supports both AMD and CommonJS environments and also
sets global `kontainer`.

If installed through NPM then the module can be directly used in browserify by simply require()'ing
it:

    var kontainer = require('kontainer');

## Building/testing

Install build dependencies:

    npm install

Run static server:

    make serve-test

Run tests:

    make test

## License

The MIT License.