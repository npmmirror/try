const Sequelize = require('sequelize');
const config = require('./config');

console.log('config',config);
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

var now = Date.now();

// promise insert
function f1() {
    Pet.create({
        id: 'g-' + now,
        name: 'Gaffey',
        gender: false,
        birth: '2007-07-07',
        createdAt: now,
        updatedAt: now,
        version: 0
    }).then(function (p) {
        console.log('created.' + JSON.stringify(p));
    }).catch(function (err) {
        console.log('failed: ' + err);
    });
}

// async insert
function f2() {
    (async () => {
        var dog = await Pet.create({
            id: 'd-' + now,
            name: 'Odie',
            gender: false,
            birth: '2008-08-08',
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        console.log('created: ' + JSON.stringify(dog));
    })();
}

function f3() {
    (async () => {
        var pets = await Pet.findAll({
            where: {
                name: 'Odie'
            }
        });
        console.log(`find ${pets.length} pets:`);
        console.log(JSON.stringify(pets));
        for (let p of pets) {
            console.log(JSON.stringify(p));
        }
    })();
}

function f4() {
    (async () => {
        var pets = await Pet.findAll({
            where: {
                name: 'Gaffey'
            }
        });
        console.log(JSON.stringify(pets));
        var p = pets[0];

        // var p = pets;
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        await p.save();
    })();
}

function f5(){
    (async () => {
        var pets = await Pet.findAll({
            where: {
                name: 'Gaffey'
            }
        });
        console.log(JSON.stringify(pets));
        var p = pets[0];
        await p.destroy();
    })();
}

function f6() {
    const model = require('./model');
    let
        Pet2 = model.Pet,
        User = model.User;

    (async () => {
        var dog = await Pet2.create({
            name: 'Odie',
            gender: false,
            birth: '2008-18-08',
        });
        console.log('created: ' + JSON.stringify(dog));
    })();
}

// const model = require('./model.js');
// model.sync();
//
// console.log('init db ok.');

// sequelize.sync();

f6();
// process.exit(0);
