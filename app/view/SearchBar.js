Ext.define("NotesApp.view.SearchBar", {
  extend: "Ext.Toolbar",
      xtype: "searchbar",
      requires: ["Ext.field.Search"],
      initialize: function(){
      var searchbar = {
      xtype: "toolbar",
      ui: "searchbar",
      items: [{
	  xtype: "searchfield",
	  placeHolder: "Search...",
	  flex: 1
	  }, {
	  xtype: "button",
	  text: "Seach",
	  handler: this.onSearch,
	  scope: this
	  }
	]
      };
      this.add([searchbar]);
    },
      config: {
    docked: "top",
	ui: "searchbar",
	layout: "vbox",
	},
      onSearch: function(){
      this.fireEvent("searchNoteCommand", this);
    }
  });
