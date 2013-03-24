Ext.define("NotesApp.store.Category", {
  extend: "Ext.data.Store",
      requires: ["NotesApp.model.Category"],
      config: {
    model: "NotesApp.model.Category",
        proxy: {
      type: "ajax",
	  url: "http://192.168.0.13/senchatouch/NotesApp/categorylist.pl",
	  reader: {
	type: "json",
	    rootProperty: "categories"
            }
      },
	autoLoad: true
	}
  });
