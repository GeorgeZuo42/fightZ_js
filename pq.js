var Sequelize = require("sequelize")
var config = require("./config")
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        // define the table's name
        //tableName: 'username'
    }

});

var UserModel = sequelize.define('username', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    mail: Sequelize.STRING
});
(async ()=>{
    var result = UserModel.create({
        name: 'XiaoMing',
        password: '1234567890',
        mail: 'xiaoming@qq.com'
    });
    console.log(JSON.stringify(result));
})();

(async () => {
    var pets = await UserModel.findAll({
        where :{
            name : 'XiaoMing'
        }
    });
    console.log(`find ${pets.length} pets: `);
    for (let pet of pets) {
        console.log(JSON.stringify(pet));
    }
})();
(async () => {
    var pets= await UserModel.findOne({
        where :{
            name : 'XiaoMing'
        }
    });
    pets.name = 'Xiao';
    await pets.save();
})();
(async () => {
    var p = await UserModel.findOne({
        where :{
            name : 'XiaoMing'
        }
    });
    await p.destroy();
})();