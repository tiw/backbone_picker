define(['modules/common/picker',
        'jquery', 'order!underscore', 'order!backbone',
        'modules/customer/models/addressCollection',
        'text!templates/customer/single-line-address.html',
        'text!templates/customer/address-picker.html',
        'lib/jquery-ui-1-8-16-custom-min'
        ], function(CommonPicker, $, a, b, Collection, singleLineTemplate, pickerTemplate){
    return CommonPicker($, a, b, Collection, singleLineTemplate, pickerTemplate, "address-picker");
});