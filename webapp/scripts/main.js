require(["jquery", 'modules/customer/models/customer', 'modules/customer/views/customer/list'], function($, Customer, CustomerPickerView) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        var customer = new Customer();
        var customerPickerView;
        $('#choose-customer-button').click(function(){
            customerPickerView = customerPickerView || new CustomerPickerView({onChooseCustomer: function(c){
                customer.set({id: c.get('id')});
            }});
            customerPickerView.openDialog();
            customer.bind('change', function(){console.log(customer);});
        });
    });
});
