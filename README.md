# steak

This is a library I use to manage model and server communication in my Ember app. It's a replacement for Ember Data.
I was tired of working with Ember Data because:
  - I want my entity to be plain old ember objects, instead of magic boxes.
  - I want to be able to create my entity objects by hand (for testing)
  - I want to be able to have different backend for my objects. Some might come from server, some from js memory. I want my objects to be independent from storage.
  - I want to have complete control over communication with server communication and respond to statuses.

  Also, Ember Data is rather big, and I believe too big. Steak is tiny (5.5kb) non minified, non gzipped. Ember Data is 1.4 megabytes.

I wanted to create similiar architecture as Lotus::Model (https://github.com/lotus/model), that is, separate Entity objects and Repository objects.

This is how you define basic User entity class:

    User = Steak.Model.extend({
      attributes: {
        name: Steak.String
      }
    })

Steak.Model is a thin wrapper over Ember.Object. You can create new Steak.Model object like this:

    User.createNew({name: "Łukasz Strzebińczyk"})

Steak provides a couple of primitive attribute types:

    Steak.String
    Steak.Object
    Steak.Boolean
    Steak.Integer
    Steak.Float
    Steak.Date

You can also have an array of values like this:

    User = Steak.Model.extend({
      attributes: {
        numbers: Steak.ArrayOf(Steak.Integer)
      }
    })

    user = User.createNew({numbers: [1, 1.0, "1", "1.0"]})
    user.get("numbers") => [1, 1, 1, 1]

You can also compose Steak objects and use them instead of attributes:

    City = Steak.Model.extend({
      attributes: {
        name: Steak.String
      }
    })

    User = Steak.Model.extend({
      attributes: {
        city: City
      }
    })

    User.createNew({city: {name: "Gliwice"}})

Steak translates keys in snake_case passed to .createNew() to camelCase

    User = Steak.Model.extend({
      attributes: {
        longName: Steak.String
      }
    })

    User.createNew({long_name: "Łukasz Strzebińczyk"})

Steak.Model#rollback() returns objects attributes to values it was initialised with:

    User = Steak.Model.extend({
      attributes: {
        name: Steak.String
      }
    })

    user = User.createNew({name: "Łukasz Strzebińczyk"})
    user.get("name") => "Łukasz Strzebińczyk"
    user.set("name", "Darth Vader")
    user.get("name") => "Darth Vader"
    user.rollback()
    user.get("name") => "Łukasz Strzebińczyk"

To fetch data from server you need to create a repository. There is no dedicated class for repository object. Instead, repository is just a simple javascript object that follows certain rules.

To be able to fetch single object, you would do:

    User = Steak.Model.extend({
      attributes: {
        name: Steak.String
      }
    })

    UserRepository = {
      typeKeySingle: "user",
      findQuery: function(some_information, opts) {
        // Logic that talks to server. For example this:
        // $.ajax({
        //    url: "api/users/" + some_information
        //  })
      }

    }

    User.registerRepository(UserRepository)
    User.find(some_information)

Current implementation assumes, that response will be an object with a root key.

    typeKeySingle

value is used to fetch the data inside, and then it's passed to proper .createNew() call.
With this api you have complete controll over the communication layer. For example, your ember route might look like this:

    App.UserRoute = Ember.Route.extend({
      model: function(params){
        route = this;
        User.find(params.id, {
          statusCode: {
            404: function(){
              route.transitionTo("other_route")
            }
          }
        })
      }
    })

You can do everything you need to, just remember to pass this params to repository.

    UserRepository = {
      typeKeySingle: "user",
      findQuery: function(id, opts) {
        $.ajax({
          url: "api/users/" + id,
          statusCode: opts.statusCode
        })
      }
    }

To fetch a collection of objects, you would do:

    User.findAll(opts)

And, similarily to example above, your repository must implement methods

    .typeKeyCollection
    .findAllQuery

for example

    UserRepository = {
      typeKeyCollection: "users",
      findAllQuery: function(opts) {
        $.ajax({
          url: "api/users"
        })
      }
    }

Steak.Model also implements

    #save(opts)
    #update(opts)

methods. Everything they do is delegate this to the corresponding methods in repository, passing itself and params. So using the examples above, calling

    user = User.createNew(some_attributes)
    user.save(opts)

is equivalent to

    UserRepository.save(user, opts)

as well as

    user = User.createNew(some_attributes)
    user.update(opts)

is equivalent to

    UserRepository.update(user, opts)

In repository, you can handle this in any way you want.


A couple more notes from me:
  - I am a ruby programmer and Steak code is compiled coffeescript. Please don't hit me.
  - There are no relations in steak, because:
    - I found them hard to implement
    - I found out that object composition and just calling more than 1 repository works for me.
  - I suck at markdown and documentations.
  - I am aware that this is all probably a little chaotic. I would love to make it simple and understandable.

All of this code is barely extracted from my project and assumes a lot, because only I was using this solution. It can be much more flexible with few changes, if anyone agrees with the general idea, the codebase should be pretty easy to update. And I would love to work on the codebase and improve it if it would make anyones life easier.

To run the tests simply open the test.html file.