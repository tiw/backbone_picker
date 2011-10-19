/**
 * usage
 * new CustomerPickerView({customer: customer, customers: customers})
 * customer is an object which will save the picked customer.
 * 
 * e.g.
 *     customerPickerView = customerPickerView || new CustomerPickerView({customer: customer});
 *     customerPickerView.openDialog();
 *     customerPickerView.customer.bind('change', function(){console.log(customerPickerView.customer);});
 * @todo: using callback to get the selected customer is better, needs refactoring.
 */
define(['jquery', 'order!underscore', 'order!backbone',
       'modules/customer/models/customerCollection',
       'text!templates/customer/single-line-customer.html',
       'text!templates/customer/customer-picker.html',
       'lib/jquery-ui-1-8-16-custom-min'
], function($, a, b, CustomerCollection, singleLineCustomerTemplate, customerPicker) {
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
        tagName: 'div',
        className: 'customer-picker',
        /**
         * initialize 
         */
        initialize: function(params) {
            // add dialog dom to body
            $('body').append(customerPicker);
            // set the el in initialize because the dom is not there at the very beginning.
            this.el = $('#customer-picker');
            // the event hash is defined before we dynamiclly add dom element, so
            // we have to call this again for event binding.
            this.delegateEvents();
            this.el.dialog({
                autoOpen: false,
                height: 220,
                width: 800,
                modal: true
            });
            this.onChooseCustomer = params.onChooseCustomer;
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
            _.each(this.customers.models, function(model, index) {
                if (model.get('selected')) {
                    this.onChooseCustomer(model); 
                    model.set({'selected': false});
                    el.dialog('close');
                }
            }, this);
        },
        addOne: function(customer) {
            if (customer.get('isWanted')) {
                var view = new CustomerLineView({model: customer});
                var html = view.render().el;
                this.$('.customer-list').append(html);
            }

        },
        addAll: function() {
            this.$('.customer-list').empty();
            this.customers.each(this.addOne);
        },
        //render: function() {
            //$(this.el).html(this.template(this.model.toJSON()));
            //return this;
        //},
        events: {
            'keyup .name-filter' : 'filterCustomerByName'
        },
        filterCustomerByName: function(event) {
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
        },
        openDialog: function() {
            this.el.dialog('open');
        },
        closeDialog: function() {
            this.el.dialog('close');
        }
    });

    return CustomerPickerView;
});
