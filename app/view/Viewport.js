Ext.define("NotesApp.view.Viewport", {
  extend: "Ext.Panel",
      initialize: function(){},
      config: {
    fullscreen: true,
	layout: "card",// needed for tabbed screen
	items: [ {xtype: "mainpanel"}, {xtype: "noteeditor"} ]
    }
  });
