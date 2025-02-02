/**
 * email.js
 *
 * Copyright (C) 2020 Stephen Dowsland
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 **/
var utils = require('./utils');

var email = function(client, xml) {
    this.client = client;
    if (xml) {
        utils.parse_xml(this, xml.email || xml);
    }
};
email.prototype.comments = function(callback) {
    this.client.get_items('/emails/' + this.id + '/comments.xml', callback,
        require('./comment'), 'comments', 'comment');
};
email.prototype.delete = function(callback) {
    var url = '/emails/' + this.id + '.xml';

    this.client.send('DELETE', url, function(err, res) {
        callback(err);
    });
};
email.prototype.get = function(id, callback) {
    this.client.get_item('/emails/' + id + '.xml', callback, note);
};

module.exports = email;