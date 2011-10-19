define(['jquery', 'order!underscore', 'order!backbone'], function($){
    var Customer = Backbone.Model.extend({
        url: 'dummy.json',
        parse: function(data) {
            var c = Customer({lastName: data.name, firstName: data.firstname});
            return c;
        }
    });
    return Customer;
})
