shifty.views.Events = Backbone.View.extend({
    tagName: "div",
    id: "events",

    events: {
        'click .view_shifts_columns': 'columnsView',
        'click .view_shifts_table': 'tableView',
    },

    mode:'columns',

    initialize: function(el) {
        // TODO: pagination links and handling
        /*var limit = 5;
        var offset = 1;

        this.eventViews = [];
        this.limit = 5;
        this.offset = 1;*/
        var self = this;
        if(this.collection)
        {
            this.listenTo(this.collection, 'reset', this.render);
        }
        else if(this.model)
        {
            this.listenTo(this.model, 'reset', this.render);
        }

        shifty.events.on('refresh', function(){ self.refresh();});
    },

    refresh: function()
    {
        this.collection.fetch({'reset':true, data: {min_date: 'today'}});
    },

    render: function()
    {
        this.$el.html(shifty.template("events")());
        this.sub = this.$(".events_wrap");
        if(this.mode == 'columns')
            this.columnsView();
        else
            this.tableView();
        return this.el;
    },

    columnsView: function(e)
    {
        if (e) e.preventDefault();
        this.mode = 'columns';
        this.genView(shifty.views.EventColumned);
    },

    tableView: function(e)
    {
        if (e) e.preventDefault();
        this.mode = 'table';
        this.genView(shifty.views.EventTable);
    },

    genView: function(viewModel)
    {
        this.sub.empty();
        this.collection.each(function(ev) {
            var v = new viewModel({model: ev});
            v.parentView = this;
            this.sub.append(v.render());
        }.bind(this));
    },

    loginBox: function(after_success)
    {
        var login = new shifty.views.Login({'after_success':after_success});
        login.parentView = this;
        login.render();
    },

    takeShiftBox: function(shiftElm, twinsData)
    {
        var self = this;
        if(shifty.user == null)
        {
            var after_success = function(){
                self.takeShiftBox(shiftElm, twinsData);
            }
            this.loginBox(after_success);
        }
        else
        {
            var takeshift = new shifty.views.EventsTakeShift();
            takeshift.shiftElm = shiftElm;
            takeshift.twinsData = twinsData;
            takeshift.refView = this;
            takeshift.on_update = function()
            {
                self.refresh();
            }
            takeshift.render();
        }
    }
});

shifty.views.MyEvents = shifty.views.Events.extend({
    genView: function(viewModel)
    {
        console.log("Doing new genview");
        this.sub.empty();
        this.collection.each(function(ev) {
            var my_shifts = ev.get('shifts').filter(function(s){return s.volunteer != null && s.volunteer.id == shifty.user.id;});

            var collection = new shifty.collections.Shifts(my_shifts);
            ev.set('shifts', my_shifts);
            var v = new viewModel({model: ev});
            v.parentView = this;
            this.sub.append(v.render());
        }.bind(this));
    },
});