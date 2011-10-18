define(
    ['jquery', 'underscore', 'backbone', 'modules/customer/models/customer'],
    function($, a, b, Customer){
        var CustomerCollection = Backbone.Collection.extend({
            model: Customer,
            url: 'dummy.json',
            initialize: function() {
            }
        });
        return CustomerCollection;
});
