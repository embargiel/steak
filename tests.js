QUnit.test("Steak.String passes string to entity", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });
  testObject = Test.createNew({field: "value"})
  assert.equal(testObject.get("field"), "value");
});

QUnit.test("Steak.String converts input to string", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });
  testObject = Test.createNew({field: 1})
  assert.equal(testObject.get("field"), "1");
});

// toJson() actually returns js object. What was I thinking?...
QUnit.test("Steak.String serializes to json as string", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });
  testObject = Test.createNew({field: 1})
  assert.equal(testObject.toJson().field, '1');
});

QUnit.test("Steak.Object passes pure js object to entity", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Object
    }
  });
  testObject = Test.createNew({field: {key: "value"}})
  assert.equal(testObject.get("field").key, "value");
});

QUnit.test("Steak.Object returns pure js object as json", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Object
    }
  });
  testObject = Test.createNew({field: {key: "value"}})
  assert.equal(testObject.toJson().field.key, "value");
});

QUnit.test("Steak.Boolean saves boolean value as itself", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Boolean
    }
  });
  testObject = Test.createNew({field: true})
  assert.equal(testObject.get("field"), true);
});

QUnit.test("Steak.Boolean converts string to boolean", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Boolean
    }
  });
  testObject = Test.createNew({field: "something"})
  assert.equal(testObject.get("field"), true);
});

QUnit.test("Steak.Boolean converts undefined to false", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Boolean
    }
  });
  testObject = Test.createNew({field: undefined})
  assert.equal(testObject.get("field"), false);
});

QUnit.test("Steak.Boolean returns boolean for #toJson()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Boolean
    }
  });
  testObject = Test.createNew({field: undefined})
  assert.equal(testObject.toJson().field, false);
});

QUnit.test("Steak.Integer accepts numeric as itself", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Integer
    }
  });
  testObject = Test.createNew({field: 1})
  assert.equal(testObject.get("field"), 1);
});

QUnit.test("Steak.Integer converts float to integer", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Integer
    }
  });
  testObject = Test.createNew({field: 1.0})
  assert.equal(testObject.get("field"), 1);
});

QUnit.test("Steak.Integer converts string to integer", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Integer
    }
  });
  testObject = Test.createNew({field: '1.0'})
  assert.equal(testObject.get("field"), 1);
});

QUnit.test("Steak.Integer returns integer for #toJson()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Integer
    }
  });
  testObject = Test.createNew({field: '1.0'})
  assert.equal(testObject.toJson().field, 1);
});

QUnit.test("Steak.Float accepts float as itself", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Float
    }
  });
  testObject = Test.createNew({field: 1.0})
  assert.equal(testObject.get("field"), 1.0);
});

QUnit.test("Steak.Integer converts integer to float", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Integer
    }
  });
  testObject = Test.createNew({field: 1})
  assert.equal(testObject.get("field"), 1.0);
});

QUnit.test("Steak.Float converts string to float", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Float
    }
  });
  testObject = Test.createNew({field: '1.0'})
  assert.equal(testObject.get("field"), 1.0);
});

QUnit.test("Steak.Float returns float for #toJson()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Float
    }
  });
  testObject = Test.createNew({field: '1.0'})
  assert.equal(testObject.toJson().field, 1.0);
});

QUnit.test("Steak.Float returns float for #toJson()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Float
    }
  });
  testObject = Test.createNew({field: '1.0'})
  assert.equal(testObject.toJson().field, 1.0);
});

QUnit.test("Steak.Date parses date string into Date object", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Date
    }
  });
  testObject = Test.createNew({field: "2015-03-17T16:05:47.034Z"})
  date = testObject.get("field")
  assert.equal(date.getFullYear(), 2015);
  assert.equal(date.getMonth(), 2);
  assert.equal(date.getDay(), 2);
  assert.equal(date.getTime(), 1426608347034);
});

QUnit.test("Steak.Date serializes date as string", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.Date
    }
  });
  testObject = Test.createNew()
  date = new Date(1426608347034)
  testObject.set("field", date)
  assert.equal(testObject.toJson().field, 'Tue Mar 17 2015 17:05:47 GMT+0100 (CET)');
});

QUnit.test("Steak.ArrayOf deserializes array of objects of passed class", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.ArrayOf(Steak.Integer)
    }
  });

  testObject = Test.createNew({field: [1, 1.0, "1", "1.0"]})
  value = testObject.get("field")
  assert.equal(value[0], 1);
  assert.equal(value[1], 1);
  assert.equal(value[2], 1);
  assert.equal(value[3], 1);
});

QUnit.test("Steak.ArrayOf #toJson() returns array of objects as serialized by parsed class", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.ArrayOf(Steak.Integer)
    }
  });

  testObject = Test.createNew({field: [1, 1.0, "1", "1.0"]})
  value = testObject.toJson().field
  assert.equal(value[0], 1);
  assert.equal(value[1], 1);
  assert.equal(value[2], 1);
  assert.equal(value[3], 1);
});

QUnit.test("Steak translates input keys in snake_case to camelCase", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      snakeCase: Steak.String
    }
  });

  testObject = Test.createNew({snake_case: "value"})
  assert.equal(testObject.get("snakeCase"), "value");
});

QUnit.test("Steak allows you to compose steak models", function( assert ) {
  Inner = Steak.Model.extend({
    attributes: {
      innerField: Steak.String
    }
  })

  Test = Steak.Model.extend({
    attributes: {
      field: Inner
    }
  });

  testObject = Test.createNew({field: {inner_field: "Something"}})
  assert.equal(testObject.get("field.innerField"), "Something");
});

QUnit.test("Steak.Model#rollback() brings back the entity to its original state", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });
  testObject = Test.createNew({field: "value"})
  testObject.set("field", "other_value")
  assert.equal(testObject.get("field"), "other_value");
  testObject.rollback()
  assert.equal(testObject.get("field"), "value");
});

// For model to support find feature, repository must implement findQuery method, which
// accepts argument and opts. It returns object, which responds to then.

QUnit.test("Repository find", function( assert ) {
  server = sinon.fakeServer.create();

  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    typeKeySingle: "test",

    findQuery: function(id) {
      return $.ajax({
        url: "/endpoint/" + id
      })
    }
  }

  Test.registerRepository(Repository)

  Test.find(1).then(function(model){
    assert.equal(model.get("field"), "something");
  })

  server.requests[0].respond(
    200,
    { "Content-Type": "application/json" },
    JSON.stringify({test: { id: 1, field: "something" }})
  );

  server.restore();
});

QUnit.test("Repository find, raises exception if repository doesn't implement findQuery()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {}

  Test.registerRepository(Repository)

  assert.throws(function(){Test.find(1)}, "Repository does not implement .findQuery()", "works fine!")
});

QUnit.test("Repository find, raises exception if repository doesn't implement typeKeySingle()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    findQuery: function(){}
  }

  Test.registerRepository(Repository)

  assert.throws(function(){Test.find(1)}, "Repository does not implement .typeKeySingle()", "works fine!")
});

QUnit.test("Repository find all", function( assert ) {
  server = sinon.fakeServer.create();

  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    typeKeyCollection: "tests",

    findAllQuery: function() {
      return $.ajax({
        url: "/endpoint"
      })
    }
  }

  Test.registerRepository(Repository)

  Test.findAll().then(function(array){
    assert.equal(array.length, 1)
    assert.equal(array[0].get("field"), "something");
  })

  server.requests[0].respond(
    200,
    { "Content-Type": "application/json" },
    JSON.stringify({tests: [{ id: 1, field: "something" }]})
  );

  server.restore();
});

QUnit.test("Repository find, raises exception if repository doesn't implement findAllQuery()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {}

  Test.registerRepository(Repository)

  assert.throws(function(){Test.findAll()}, "Repository does not implement .findAllQuery()", "works fine!")
});

QUnit.test("Repository find, raises exception if repository doesn't implement typeKeyCollection()", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    findAllQuery: function(){}
  }

  Test.registerRepository(Repository)

  assert.throws(function(){Test.findAll()}, "Repository does not implement .typeKeyCollection()", "works fine!")
});

QUnit.test("Ember.Model#save() delegates the call to repository", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    save: function(model){
      assert.equal(model.get("field"), "value")
    }
  }

  Test.registerRepository(Repository)
  testObject = Test.createNew({field: "value"})
  testObject.save()
});

QUnit.test("Ember.Model#save() accepts attrs param and passes to repository", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    save: function(model, attrs){
      assert.equal(attrs.attr, "correctly_passed")
    }
  }

  Test.registerRepository(Repository)
  testObject = Test.createNew({field: "value"})
  testObject.save({attr: "correctly_passed"})
});

QUnit.test("Ember.Model#update() delegates the call to repository", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    update: function(model){
      assert.equal(model.get("field"), "value")
    }
  }

  Test.registerRepository(Repository)
  testObject = Test.createNew({field: "value"})
  testObject.update()
});

QUnit.test("Ember.Model#update() accepts attrs param and passes to repository", function( assert ) {
  Test = Steak.Model.extend({
    attributes: {
      field: Steak.String
    }
  });

  Repository = {
    update: function(model, attrs){
      assert.equal(attrs.attr, "correctly_passed")
    }
  }

  Test.registerRepository(Repository)
  testObject = Test.createNew({field: "value"})
  testObject.update({attr: "correctly_passed"})
});

