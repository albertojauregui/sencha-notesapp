Ext.define("NotesApp.view.NoteEditor", {
  extend: "Ext.form.Panel",
      xtype: "noteeditor",
      requires: ["Ext.form.FieldSet", "Ext.field.Select"],
      initialize: function(){
        var toolbar = {
	xtype: "toolbar",
	docked: "top",
	title: "Add Note",
	items: [
	  {
	  xtype: "button",
	  ui: "back",
	  text: "Back",
	  handler: this.onBackTap,
	  scope: this
	  }, {
	    xtype: "spacer"
	  }, {
	  xtype: "button",
	  ui: "confirm",
	  text: "Save",
	  handler: this.onSaveTap,
	  scope: this
	  }
		]
	};
	this.add([
		  toolbar, 
		  {
		  xtype: "fieldset",
		      defaults: {// this set default value to every items added
		    xtype: "textfield"
			},
		      items: [
			      {name: "content", label:"Content"},
			      //{ name: "price", label: "Price", xtype: "numberfield" },
			      {name: "categoryid", label: "Category", xtype: "selectfield", store: "Category", displayField: "name", valueField: "id"}
			      ]
		      }
		  ]);
    },
      config: {
    listeners: {
      show: function(){this.onShow();}
      }
    },
      onShow: function(){
      if(this.getRecord().phantom)
	this.items.get(0).setTitle("Add Note");
      else
	this.items.get(0).setTitle("Edit Note");
    },
      onSaveTap: function(){
      this.fireEvent("saveCommand", this);
    },
      onBackTap: function(){
      this.fireEvent("backCommand", this);
    }
  });
