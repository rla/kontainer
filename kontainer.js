// Creates view object bound to
// the DOM element given by the selector.

exports.create = function(target) {

    var last, selector, dom;

    if (typeof target === 'string') {

        // Treat target as CSS selector.

        selector = target;

    } else if (selector) {

        // Assume that target is a DOM element.

        dom = target;

    } else {

        // No target is given.

        throw new Error('Target must be set');
    }

    // Shows given template. Binds model.
    // Disposes model when something else is shown.

    return function(template, model) {

        var container;

        if (selector) {

            // Use selector to find target element.

            container = document.querySelector(selector);

            if (!container) {

                throw new Error('No container at ' + selector);
            }

        } else {

            // Use the previously given DOM element.

            container = dom;
        }

        if (container.children.length > 0) {

            // Something was previously shown,
            // remove possible bindings.

            ko.cleanNode(container);

            container.innerHTML = '';
        }

        // Dispose old model.

        if (last && typeof last.dispose === 'function') {

            try {

                last.dispose();

            } catch (e) {

                console.log(e);
                console.error(e.stack);
            }
        }

        // Set new content.

        if (typeof template === 'string') {

            container.innerHTML = template;

        } else if (template) {

            // Assume that template is a DOM element.

            container.appendChild(template);

        } else {

            throw new Error('Template is not set');
        }

        // Apply bindings.

        ko.applyBindings(model, container);

        // Save the last model.

        last = model;
    };
};
