/**
 * address model
 */
define(['jquery', 'order!underscore', 'order!backbone'], function($){
    var Address = Backbone.Model.extend({
        url: 'services/address.php',
        defaults: {
            isWanted: true
        },
        /**
         * parses the json from server side and converts it into customer model. 
         * @param data json from server
         * @returns Customer
         */
        parse: function(data) {
            return new Address(data);
        }
    });
    return Address;
});
