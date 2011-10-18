define(['jquery', 'underscore', 'backbone'], function($){
    var customer = Backbone.Model.extend({
        url: 'dummy.json'
    });
    return customer;
})
