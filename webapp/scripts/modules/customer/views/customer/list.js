/**
 * usage
 * new CustomerPickerView({customer: customer, customers: customers})
 * customer is an object which will save the picked customer.
 * @todo: using callback to get the selected customer is better, needs refactoring.
 */
define(['jquery', 'order!underscore', 'order!backbone',
       'modules/customer/models/customerCollection',
       'text!templates/customer/single-line-customer.html',
       'lib/jquery-ui-1-8-16-custom-min'
], function($, a, b, CustomerCollection, singleLineCustomerTemplate) {
    var CustomerLineView = Backbone.View.extend({
        tagName: 'tr',
        className: 'single-customer-line',
        render: function() {
            try {
                var compiledTemplate = _.template(singleLineCustomerTemplate, this.model.toJSON());
                $(this.el).html(compiledTemplate);
            } catch (e) {
                console.log(e);
            }
            return this;
        },
        events: {
            'click .choose' : 'chooseCustomer'
        },
        chooseCustomer: function() {
            this.model.set({selected: true});
            return false;
        }
    });

    var CustomerPickerView = Backbone.View.extend({
        el: $('#customer-picker'),
        tagName: '',
        className: 'customer-picker',

        /**
         * initialize 
         */
        initialize: function(params) {
            this.el.dialog({
                autoOpen: false,
                height: 220,
                width: 800,
                modal: true
            });
            this.customer = params.customer;
            this.customers = new CustomerCollection();
            this.customers.bind('add', this.addOne, this);
            this.customers.bind('reset', this.addAll, this);
            this.customers.bind('change:selected', this.setCustomer, this);
            this.customers.fetch({
                success: function(){
                    console.log('success');
                }, 
                error: function(resp){
                    console.log(resp);
                    console.log('ops!');
                }
            });
        },
        setCustomer: function() {
            var el = this.el;
            var customer = this.customer;
            _.each(this.customers.models, function(model, index) {
                if (model.get('selected')) {
                    customer.set({id: model.get('id')});
                    model.set({'selected': false});
                    el.dialog('close');
                }
            });
        },
        addOne: function(customer) {
            if (customer.get('isWanted')) {
                var view = new CustomerLineView({model: customer});
                var html = view.render().el;
                this.$('.customer-list').append(html);
            }

        },
        addAll: function() {
            this.$('#customer-list').empty();
            this.customers.each(this.addOne);
        },
        //render: function() {
            //$(this.el).html(this.template(this.model.toJSON()));
            //return this;
        //},
        events: {
            'keyup .name-filter' : 'filterProductByName'
        },
        filterProductByName: function(event) {
            if (event.keyCode == 13) {
                var filterText = $('.name-filter', $(this.el)).val();
                _.each(this.customers.models, function(model, index) {
                    var re = new RegExp(filterText, 'i');
                    var fullname = model.get('firstName') + ' ' + model.get('lastName');
                    if ((filterText.length > 0) && !fullname.match(re)) {
                        model.set({isWanted: false});
                    } else {
                        model.set({isWanted: true});
                    }
                });
            }
            this.addAll();
        }
    });

    return CustomerPickerView;
});
