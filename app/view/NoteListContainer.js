Ext.define("NotesApp.view.NoteListContainer", {
  extend: "Ext.Panel",
      xtype: "notelistcontainer",
      requires: ["NotesApp.view.NoteList", "NotesApp.view.SearchBar"],
      initialize: function() {
      var toolbar = {
      xtype: "toolbar",
	  docked: "top",
	  title: "Note List",
	  items: [
	{xtype: "spacer"},// built in xtype, simply use for space
		  {
		  xtype: "button",
		      text: "Add",
		      handler: this.onAddNoteTap,
		      scope: this
		  }
		  ]
      };
      this.add([toolbar, {xtype: "searchbar"}, {xtype: "notelist"}]);
    },
      config: {
    layout: "fit",
	title: "Note List",
	iconCls: "home"
	},
      onAddNoteTap: function(){
      this.fireEvent("addNoteCommand", this);
    }
  });
