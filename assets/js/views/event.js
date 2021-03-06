shifty.views.Event = Backbone.View.extend({
    events: {
        'click #next_event': 'next',
        'click #last_event': 'last',
    },

    initialize: function(el) {
        this.nextEvent = this.model.attributes.next;
        this.lastEvent = this.model.attributes.previous;
    },

    render: function() {

        this.sub = new shifty.views.EventColumned({model: this.model});
        this.sub.parentView = new shifty.views.Events();

        mainView = shifty.template("event_page")({next: this.nextEvent, last: this.lastEvent});

        this.$el.html($(mainView));
        this.$el.append(this.sub.render());

        return this.el;
    },

    next: function() {
        if(this.nextEvent){
            this.sub.remove();
            var model = new shifty.models.Event({id: this.nextEvent.id});

            var self = this;
            model.fetch().done(function() {
                model.shifts = new shifty.collections.Shifts(model.attributes.shifts);
                self.sub = new shifty.views.EventColumned({model: model});
                self.sub.parentView = new shifty.views.Events();
                self.$el.append(self.sub.render());

                self.nextEvent = model.attributes.next;
                self.lastEvent = model.attributes.previous;
                self.model = model;

                if(self.nextEvent){
                    $('#next_event span.title').text(self.nextEvent.title);
                    $('#next_event').removeClass('disabled');
                }else{
                    $('#next_event span.title').text("");
                    $('#next_event').addClass('disabled');
                }
                if(self.lastEvent){
                    $('#last_event span.title').text(self.lastEvent.title);
                    $('#last_event').removeClass('disabled');
                }else{
                    $('#last_event span.title').text("");
                    $('#last_event').addClass('disabled');
                }

            });
        }
    },
    last: function() {
        if(this.lastEvent){
            this.sub.remove();
            var model = new shifty.models.Event({id: this.lastEvent.id});

            var self = this;
            model.fetch().done(function() {
                model.shifts = new shifty.collections.Shifts(model.attributes.shifts);
                self.sub = new shifty.views.EventColumned({model: model});
                self.sub.parentView = new shifty.views.Events();
                self.$el.append(self.sub.render());

                self.nextEvent = model.attributes.next;
                self.lastEvent = model.attributes.previous;
                self.model = model;

                if(self.nextEvent){
                    $('#next_event span.title').text(self.nextEvent.title);
                    $('#next_event').removeClass('disabled');
                }else{
                    $('#next_event span.title').text("");
                    $('#next_event').addClass('disabled');
                }
                if(self.lastEvent){
                    $('#last_event span.title').text(self.lastEvent.title);
                    $('#last_event').removeClass('disabled');
                }else{
                    $('#last_event span.title').text("");
                    $('#last_event').addClass('disabled');
                }

            });
        }
    }
});
