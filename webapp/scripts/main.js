require(["jquery", 'modules/customer/models/customer', 'modules/customer/views/customer/list'], function($, Customer, CustomerPickerView) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        var customer = new Customer();
        var customerPickerView = new CustomerPickerView({customer: customer});
        $('#choose-customer-button').click(function(){
            customerPickerView.el.dialog('open');
            customerPickerView.customer.bind('change', function(){console.log(customerPickerView.customer);});
        });
    });
});
