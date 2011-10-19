define(
    ['jquery', 'order!underscore', 'order!backbone', 'modules/customer/models/customer'],
    function($, a, b, Customer){
        var CustomerCollection = Backbone.Collection.extend({
            model: Customer,
            url: 'services/s.php',
            initialize: function() {
            },
            /**
             * parses the json from server side and converts it into customer models. 
             * @param data json from server
             * @returns [Customer,..]
             */
            parse: function(resp) {
                var customers = [];
                _.each(resp, function(data, index) {
                    customers[index] = new Customer(data);
                });
                return customers;
            }
        });
        return CustomerCollection;
});
