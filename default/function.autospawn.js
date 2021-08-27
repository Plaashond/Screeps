var autoSpawner ={
    spawn: function(role,spawn,number,weight){
    var roleobject = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        if(roleobject.length < number) {
            var newName = role + Game.time;
            if(Game.spawns[spawn].spawnCreep(weight, newName,{memory: {role: role}}) == -6){
                Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName,{memory: {role: role}})
            }
        }
    
        if(Game.spawns[spawn].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
            Game.spawns[spawn].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawn].pos.x + 1,
                Game.spawns[spawn].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}
module.exports = autoSpawner;