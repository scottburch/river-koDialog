Modal dialogs with close button.  Requires the [knockout module](https://github.com/scottburch/river-knockout)

###To Use

The dialog works in two parts.  First it will render a dialog template with a given id and then you can place whatever you want in the body.

To render the dialog box:

    that.doAction('showKoDialog', {name:'myDialog', height:500, width:500}); // will render a dialog box with an id of 'koDialogBody-myDialog


koDialog then emits a xxxxRendered event so that you know when to render the body:

    that.on_koDialog_myDialogRendered = function (data) {   // data is the original data passed when you called showKoDialog
        that.doAction('renderKoTemplate', {name:'myThing', to:'koDialogBody-myDialog', template:'myThing.html', viewModel:{}});
    };


To close a dialog use action 'hideKoDialog' with the name of your dialog

    that.doAction('hideKoDialog', {name:myDialog'});

