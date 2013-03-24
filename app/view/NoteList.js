Ext.define("NotesApp.view.NoteList", {
  extend: "Ext.dataview.List",
      xtype: "notelist",
      requires: ["Ext.plugin.ListPaging"],
      config: {
    store: "Note",
	plugins: [{
	xclass: "Ext.plugin.ListPaging",
	    autoPaging: false
	}],
	itemTpl: [
		  '<div>',
		  '     <div>{content}</div>',
		  '     <p>{category}</p>',
		  '</div>'
		  ],
	onItemDisclosure: function(record, btn, index){// when the little arrow on the right is tapped
	this.fireEvent("editNoteCommand", record);
      }
    }
  });
