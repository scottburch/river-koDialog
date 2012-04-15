defineModule(function(that) {
    var dialogViews = {};

    that.on_moduleManager_modulesLoaded = function() {
        that.doAction('loadCss', {href:'koDialog.css'});
    };

    that.do_showKoDialog = function(data) {
        if(!dialogViews[data.name]) {
            var node = document.createElement('div');
            node.id = 'koDialog-'+data.name;
            document.getElementsByTagName('body')[0].appendChild(node);
        }
        var dialogView = dialogViews[data.name] = DialogView(data);
        that.doAction('renderKoTemplate', {name: 'koDialog', template:'koDialog.html', to:'koDialog-'+data.name, viewModel: dialogView, origData:data});
    };

    that.on_knockout_koDialogTemplateRendered = function(data) {
        that.fireEvent(data.origData.name + 'Rendered', data.origData);
    };

    that.do_hideKoDialog = function(data) {
        dialogViews[data.name].visible(false);
        dialogViews[data.name].modal(false);
    };

    function DialogView(data) {
        var that = {
            name: data.name,
            visible: ko.observable(true),
            modal: ko.observable(true),
            height: ko.observable(data.height || 200),
            width: ko.observable(data.width || 400)
        };
        that.marginTop = ko.computed(function() {
            return 0-(that.height() / 2);
        });
        that.marginLeft = ko.computed(function() {
            return 0-(that.width() /2);
        });

        that.close = function() {
            that.visible(false);
        };
        return that;
    }
});