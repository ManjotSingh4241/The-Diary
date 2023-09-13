var content = [];

var fs = require("fs");

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/content.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                content = JSON.parse(data);
                resolve();
            }
        });
    });
}

module.exports.displayAllContent = () => {
    return new Promise((resolve, reject) => {
        if (content.length === 0) {
            reject('No results returned');
        }
        resolve(content);
    });
};

module.exports.permittedContent = () => {
    return new Promise((resolve, reject) => {
        var permittedContent = content.filter((item) => item.Publish === true);
        if (permittedContent.length === 0) {
            reject('No results returned');
        } else {
            resolve(permittedContent);
        }
    });
};

module.exports.upload = (uploadData) => {
    var ID = 0;
    var i = 0;
    return new Promise((resolve, reject) => {
        if (uploadData.Publish === undefined) {
            uploadData.Publish = false;
        }
        else uploadData.Publish = true;
        while (i < content.length) {
            var contentID = +content[i].contentID;
            i++;
            if (contentID > ID) {
                ID = contentID;
            }
        }
        uploadData.contentID = (ID + 1).toString();
        content.push(uploadData);
        resolve();
    })
};
