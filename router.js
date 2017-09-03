var login_handler = require("./handler_login")
var aoi_handler = require("./handler_aoi")
var move_handler = require("./handler_move")
var skill_handler = require("./handler_skill")
var effect_handler = require("./handler_effect")
var handle = {}

handle["login"] = login_handler.login;
handle["logout"] = login_handler.logout;
handle["aoi_enter"] = aoi_handler.aoi_enter;
handle["skill"] = skill_handler.castSkill;
handle["effect"] = effect_handler.castEffect;
handle["move"] = move_handler.move;


function route(conn, params) {
    if (typeof handle[params.type] === 'function') {
      handle[params.type](conn, params.message);
    } else {
      //console.error("No handler found for " + params.type);
    }
  }
  
  exports.route = route;