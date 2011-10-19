define(
    ['jquery', 'order!underscore', 'order!backbone', 'modules/customer/models/customer'],
    function($, a, b, Customer){
        var CustomerCollection = Backbone.Collection.extend({
            model: Customer,
            //url: '/customers',
            url: 'services/s.php',
            initialize: function() {
            },
            parse: function(resp) {
                var customers = [];
                _.each(resp, function(data, index) {
                    customers[index] = new Customer(data);
                    customers[index].set({isWanted: true});
                });
                console.log(customers);
                return customers;
            }
        });
        return CustomerCollection;
});
