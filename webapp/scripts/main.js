require([
         "jquery", 'modules/customer/models/customer', 
         'modules/customer/views/customer/CustomerPicker',
         'modules/customer/models/address',
         'modules/customer/views/address/AddressPicker'
         ], 
function($, Customer, CustomerPickerView, Address, AddressPickerView) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        var customer = new Customer();
        var customerPickerView;
        $('#choose-customer-button').click(function(){
            customerPickerView = customerPickerView || new CustomerPickerView({onChoose: function(c){
                customer.set({id: c.get('id')});
            }});
            customerPickerView.openDialog();
            customer.bind('change', function(){console.log(customer);});
        });

        
        var address = new Address();
        var addressPickerView;
        $('#choose-address-button').click(function(){
            addressPickerView = addressPickerView || new AddressPickerView({onChoose: function(c){
                address.set({id: c.get('id')});
            }});
            addressPickerView.openDialog();
            address.bind('change', function(){console.log(address);});
        });
    });
});
