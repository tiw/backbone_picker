define(['modules/common/picker',
        'jquery', 'order!underscore', 'order!backbone',
        'modules/customer/models/customerCollection',
        'text!templates/customer/single-line-customer.html',
        'text!templates/customer/customer-picker.html',
        'lib/jquery-ui-1-8-16-custom-min'
        ], function(CommonPicker, $, a, b, Collection, singleLineTemplate, pickerTemplate){
    return CommonPicker($, a, b, Collection, singleLineTemplate, pickerTemplate, "customer-picker");
});