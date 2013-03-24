Ext.define("NotesApp.controller.Note", {
  extend: "Ext.app.Controller",
      requires: ["Ext.MessageBox"],
      config: {
    refs: {// magic thing
      mainPanel: "mainpanel",
	  noteListContainer: "notelistcontainer",
	  noteEditor: "noteeditor",
	  noteList: "notelist",
	  searchBar: "searchbar",
	  searchField: "searchbar > toolbar > searchfield"
	  },
	control: {
      noteListContainer: {
	addNoteCommand: "onAddNote"
	    },
	  noteList: {
	editNoteCommand: "onEditNote"
	},
	  noteEditor: {
	backCommand: "onBackButton",
	    saveCommand: "onSaveButton"
	    },
	  searchBar: {
	searchNoteCommand: "onSearchNote"
	}
      }
    },
      onAddNote: function(){
      var newNote = Ext.create("NotesApp.model.Note");
      this.getNoteEditor().setRecord(newNote);
      Ext.Viewport.animateActiveItem(this.getNoteEditor(), {type: "slide", direction: "left"});
    },
      onEditNote: function(record){
      this.getNoteEditor().setRecord(record);
      Ext.Viewport.animateActiveItem(this.getNoteEditor(), {type: "slide", direction: "left"});
    },
      onSearchNote: function(){
      var store = Ext.getStore("Note");
      store.getProxy().setExtraParam("keyword", this.getSearchField().getValue());
      store.loadPage(1);
    },
      onBackButton: function(){
      Ext.Viewport.animateActiveItem(this.getMainPanel(), {type: "slide", direction: "right"});
    },
      onSaveButton: function(){
      var currentNote = this.getNoteEditor().getRecord();
      var newValue = this.getNoteEditor().getValues();
      currentNote.set("content", newValue.content);
      currentNote.set("categoryid", newValue.categoryid);
      currentNote.set("category", Ext.getStore("Category").findRecord("id", newValue.categoryid).get("name"));

      var errors = currentNote.validate();

      if(!errors.isValid()){
	currentNote.reject();
	Ext.Msg.alert("Invalid", errors.getByField("content")[0].getMessage(), Ext.emptyFn);
	return;
      }

      var noteStore = Ext.getStore("Note");
      noteStore.getProxy().setExtraParam("action", "testing");

      if(null == noteStore.findRecord("id", currentNote.data.id))
	noteStore.add(currentNote);
      
      noteStore.sync();
    }
  });
