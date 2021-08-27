var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawner = require('function.autospawn')
var _ = require('lodash')

module.exports.loop = function () {

    _.forEach(Memory.creeps, function (value, value) {
        if (!Game.creeps[value]) {
            delete Memory.creeps[value];
        }
    })

    autoSpawner.spawn('harvester', 'TestSpawn', 4,[WORK,CARRY,MOVE])
    autoSpawner.spawn('upgrader', 'TestSpawn', 4,[WORK,CARRY,CARRY,MOVE])
    autoSpawner.spawn('builder', 'TestSpawn', 3,[WORK,WORK,CARRY,CARRY,MOVE])
    var tower = Game.getObjectById < String > ('TOWER_ID');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    _.forEach(Game.creeps, async function (value, key) {
        var creep = Game.creeps[key];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep)
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep)
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep)
           
        }
    })

}