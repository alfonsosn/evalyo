'use strict';
module.exports = function(app) {

    // setValue and getValue are merely alias
    // for app.set and app.get used in the less
    // common way of setting application variables.
    app.setValue = app.set.bind(app);

    app.getValue = function(path) {
        return app.get(path);
    };

    require('./app-variables.js')(app);
    require('./view-engine.js')(app);
    require('./parsing-middleware.js')(app);
    require('./static-middleware.js')(app);

    // Logging middleware, set as application
    // variable inside of server/app/configure/app-variables.js
    app.use(app.getValue('log'));

};
