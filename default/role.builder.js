var roleBuilder = {

    /** @param {Creep} creep **/
    run: async function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            if(creep.room.find(FIND_CONSTRUCTION_SITES).length >0){
                var targets =  creep.room.find(FIND_CONSTRUCTION_SITES).reduce((max, obj) => (max.progress > obj.progress) ? max : obj);;
                if (targets) {
                    if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;