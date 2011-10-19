define(
    ['jquery', 'order!underscore', 'order!backbone', 'modules/customer/models/address'],
    function($, a, b, Address){
        var AddressCollection = Backbone.Collection.extend({
            model: Address,
            url: 'services/address.php',
            initialize: function() {
            },
            /**
             * parses the json from server side and converts it into customer models. 
             * @param data json from server
             * @returns [Customer,..]
             */
            parse: function(resp) {
                var addresses = [];
                _.each(resp, function(data, index) {
                    addresses[index] = new Address(data);
                });
                return addresses;
            }
        });
        return AddressCollection;
});