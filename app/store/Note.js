Ext.define("NotesApp.store.Note", {
  extend: "Ext.data.Store",
  requires: ["NotesApp.model.Note"],
  config: {
    model: "NotesApp.model.Note",// need full name
    proxy: {
      type: "ajax",
	  api: {
	create: "http://192.168.0.13/senchatouch/NotesApp/Note.pl?action=create",
	    read: "http://192.168.0.13/senchatouch/NotesApp/Note.pl",
	    update: "http://192.168.0.13/senchatouch/NotesApp/Note.pl?action=update",
	    destroy: "http://192.168.0.13/senchatouch/NotesApp/Note.pl?action=delete"
	    },
	  extraParams: {
	keyword: ""
	    },
	  reader: {
	type: "json",
	    rootProperty: "notes",
	    totalProperty: "total"
	    }
      },
	pageSize: 5,
	autoLoad: true
	}
  });
