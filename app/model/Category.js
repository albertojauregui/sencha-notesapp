Ext.define("NotesApp.model.Category", {
  extend: "Ext.data.Model",
      config: {
    idProperty: "id",
	fields: [
		 {name: "id", type: "integer"},
		 {name: "name", type: "string"}
		 ],
	validations: [
		      {type: "presence", field: "id"},
		      {type: "presence", field: "name"}
		      ]
	}
  });
