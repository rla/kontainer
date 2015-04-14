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

        // Remove possible bindings.

        ko.cleanNode(container);

        // Empty the container.

        container.innerHTML = '';

        // Dispose old model.

        if (last) {

            call(last, 'dispose', container);
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

        // Call 'inserted' callback.

        call(model, 'inserted', container);

        // Apply bindings.

        ko.applyBindings(model, container);

        // Save the last model.

        last = model;

        // Calls 'bound' callback.

        call(model, 'bound', container);
    };
};

// Calls given method if exists.
// Catches possible exceptions.

function call(base, name, argument) {

    if (typeof base[name] === 'function') {

        try {

            base[name](argument);

        } catch (e) {

            console.log(e);

            if (e.stack) {

                console.error(e.stack);
            }
        }
    }
}
