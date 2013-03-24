Ext.define("NotesApp.model.Note", {
  extend: "Ext.data.Model",
      config: {
    idProperty: "id",// primary key
	fields: [
		 {name: "id", type:"integer"},// need an id field else model.phantom won't work correctly
		 {name: "content", type:"string"},
		 {name: "categoryid", type:"integer"},
		 {name: "category", type:"string"}
		 ],
	validations: [
		      {type: "presence", field:"id"},
		      {type: "presence", field:"content", message: "You must type a content text"},
		      {type: "presence", field:"categoryid"}
		      ]
	}
  });
