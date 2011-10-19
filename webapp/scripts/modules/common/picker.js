/**
 * usage
 * new PickerView({{onChoose: function(m){
                customer.set({id: m.get('id')});
            }});
 * e.g.
 *     customerPickerView = customerPickerView || new CustomerPickerView({onChooseCustomer: function(c){
 *              customer.set({id: c.get('id')});
 *          }});
 *     customerPickerView.openDialog();
 *     customerPickerView.customer.bind('change', function(){console.log(customerPickerView.customer);});
 */

define([], function(){
    return function($, a, b, Collection, singleLineTemplate, pickerTemplate, pickerId) {
        
        var LineView = Backbone.View.extend({
            tagName: 'tr',
            className: 'single-line',
            render: function() {
                try {
                    var compiledTemplate = _.template(singleLineTemplate, this.model.toJSON());
                    $(this.el).html(compiledTemplate);
                } catch (e) {
                    console.log(e);
                }
                return this;
            },
            events: {
                'click .choose' : 'choose'
            },
            choose: function() {
                this.model.set({selected: true});
                return false;
            }
        });
    
        var PickerView = Backbone.View.extend({
            tagName: 'div',
            className: 'picker',
            /**
             * initialize 
             */
            initialize: function(params) {
                // add dialog dom to body
                $('body').append(pickerTemplate);
                // set the el in initialize because the dom is not there at the very beginning.
                this.el = $('#'+pickerId);
                // the event hash is defined before we dynamiclly add dom element, so
                // we have to call this again for event binding.
                this.delegateEvents();
                this.el.dialog({
                    autoOpen: false,
                    height: 220,
                    width: 800,
                    modal: true
                });
                this.onChoose = params.onChoose;
                this.collection = new Collection();
                this.collection.bind('add', this.addOne, this);
                this.collection.bind('reset', this.addAll, this);
                this.collection.bind('change:selected', this.setModel, this);
                this.collection.fetch({
                    success: function(){
                        console.log('success');
                    }, 
                    error: function(resp){
                        console.log(resp);
                        console.log('ops!');
                    }
                });
            },
            setModel: function() {
                var el = this.el;
                _.each(this.collection.models, function(model, index) {
                    if (model.get('selected')) {
                        this.onChoose(model); 
                        model.set({'selected': false});
                        el.dialog('close');
                    }
                }, this);
            },
            addOne: function(model) {
                if (model.get('isWanted')) {
                    var view = new LineView({model: model});
                    var html = view.render().el;
                    $('.list', this.el).append(html);
                }
            },
            addAll: function() {
                this.$('.list').empty();
                this.collection.each(this.addOne, this);
            },
            //render: function() {
                //$(this.el).html(this.template(this.model.toJSON()));
                //return this;
            //},
            events: {
                'keyup .name-filter' : 'filterByName'
            },
            filterByName: function(event) {
                if (event.keyCode == 13) {
                    var filterText = $('.name-filter', $(this.el)).val();
                    _.each(this.collection.models, function(model, index) {
                        var re = new RegExp(filterText, 'i');
                        var fullname = model.get('name');
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
    
        return PickerView;
    };
});
