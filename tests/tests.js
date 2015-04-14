casper.test.begin('Page switching', function suite(test) {

    casper.start('http://localhost:9090/example/', function() {

        test.assertTitle('kontainer tests');
    });

    casper.thenClick('#link-page-1');

    casper.then(function() {

        test.assertSelectorHasText('#page span', 'Hello World!');
    });

    casper.thenClick('#link-page-2');

    casper.then(function() {

        test.assertSelectorHasText('#page span', 'Hello from Page 2');
    });

    casper.thenClick('#link-page-3');

    casper.then(function() {

        test.assertSelectorHasText('#page span', 'Hello from Page 3');

        var boundCalled = casper.evaluate(function() {

            return boundCalled;
        });

        test.assertEquals(boundCalled, 1);

        var insertedCalled = casper.evaluate(function() {

            return insertedCalled;
        });

        test.assertEquals(insertedCalled, 1);

        var disposeCalled = casper.evaluate(function() {

            return disposeCalled;
        });

        test.assertEquals(disposeCalled, 0);
    });

    casper.thenClick('#link-page-2');

    casper.then(function() {

        test.assertSelectorHasText('#page span', 'Hello from Page 2');
    });

    casper.then(function() {

        var disposeCalled = casper.evaluate(function() {

            return disposeCalled;
        });

        test.assertEquals(disposeCalled, 1);
    });

    casper.run(function() {

        test.done();
    });
});
