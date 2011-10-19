/**
 * customer model
 */
define(['jquery', 'order!underscore', 'order!backbone'], function($){
    var Customer = Backbone.Model.extend({
        url: 'services/s.php',
        defaults: {
            isWanted: true
        },
        /**
         * parses the json from server side and converts it into customer model. 
         * @param data json from server
         * @returns Customer
         */
        parse: function(data) {
            return new Customer(data);
        }
    });
    return Customer;
});
