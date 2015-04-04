casper.test.begin('Page switching', function suite(test) {

    casper.start('http://localhost:9090/example/', function() {

        test.assertTitle('kontainer tests');
    });

    casper.thenClick('#link-page-1');

    casper.then(function() {

        casper.test.assertSelectorHasText('#page span', 'Hello World!');
    });

    casper.thenClick('#link-page-2');

    casper.then(function() {

        casper.test.assertSelectorHasText('#page span', 'Hello from Page 2');
    });

    casper.run(function() {

        test.done();
    });
});
