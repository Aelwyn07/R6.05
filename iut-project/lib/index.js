'use strict';

require('@hapipal/schmervice');
const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');


exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // Custom plugin code can go here

        await HauteCouture.compose(server, options);
    }
};
