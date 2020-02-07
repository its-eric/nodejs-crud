# nodejs-crud

A Node.JS-based API by Eric Prates, made with Feathers to Fethr.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

> :warning: You need [Docker](https://docs.docker.com/install/) installed. On older versions of Windows, run the scripts using [Git Bash](https://git-scm.com/downloads).

Getting up and running is as easy as:

```
cp .env.example .env
(edit with your favorite editor)
./build_dev.sh
```

## Testing

Simply run `docker-compose exec api npm run test` and all your tests in the `test/` directory will be run, plus the linting.

## Autocritic

*  The framework of choice here is one which does NOT encourage nested routes by default;
   however so far only a few lines of code are necessary to enable that. That's why I still chose
   it for speed, ecosystem and feature set.

*  The REST concept is such that a PUT means a total overwrite of the object, while a PATCH
   is what allows a partial update. I have followed that concept here, at the risk of 
   not fulfilling one of your written down curl tests. We should talk about it -- I can throw
   the RESTful concept in the trash if that's what the client really needs, too.

*  When we first put up the database container, it is useless to define a dependency
   to it from the api. It will take a while to accept connections, so the api will
   fail the first time we build for production.
   This is a known issue with MySQL and MariaDB docker images.

*  There is also a possibility to do the ORM-related code in object-oriented style
   with sequelize, we could benefit from it in a larger project. Boilerplate-code
   generation tools exist which can take care of a transition.

*  In the testing realm the setup code is repeated A LOT (A LOT!), so some 'util' methods should
   still be abstracted out to be reused throughout the tests. This is because of the nested
   routes concept, but probably just abstracting out the repeated parts is preferrable to having chained calls to test the functionality (violating thus the independency of each test).

*  A decision should also be made on how to save the dates in the db; maybe as strings is
   a better option to keep it db-agnostic and testable.

## Changelog

__1.0.0__

- Initial release
