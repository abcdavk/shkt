/*
import { world, Items, ItemStack, Location, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment, MinecraftEnchantmentTypes } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition, EntityQueryOptions } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

function getDistance() {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let distanceLevel = Math.abs(entity.location.x)+Math.abs(entity.location.z)
		let stackLevel = Math.floor(distance/200)
		return distanceLevel;
		return stackLevel;
	}
}

function getRandomClass(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

function 
*/

import { world, Items, ItemStack, Location, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment, MinecraftEnchantmentTypes } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition, EntityQueryOptions } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

let classes = [
	"§c§lAdaptable",
	"§1§lGlacier",
	"§e§lHasty",
	"§7§lInfested",
	"§4§lKnocking",
	"§d§lLively",
	"§6§lMolten",
	"§2§lPlaguated"
]

let suffix = [
	"Of Undefined",
	"Of Bloody Thirst",
	"Of Dave",
	"Of Madness",
	"Of Nothing",
	"From Desert",
	"From Forest",
	"The Blamer",
	"The Stealer",
	"The Keeper"
]


function runScript() {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let distance = Math.abs(entity.location.x)+Math.abs(entity.location.z)
		let classesLevel = Math.floor(distance/200)
		let randomClass = Math.floor(Math.random() * 8)
   	 if (entity.hasComponent(`minecraft:movement`) && entity.nameTag == "" && !entity.hasTag("hasClass")){
			if (classesLevel){
     	   	if (classes[randomClass]){
     	   		entity.runCommandAsync(`effect @s health_boost 100000 ${classesLevel} false`)
     				entity.getComponent('health').setCurrent(entity.getComponent('health').value+1000)
     	   		entity.addTag(classes[randomClass])
				}
		   	 entityNameTag()
     	   }
		}
		function entityNameTag() {
			let randomSuffix = Math.floor(Math.random() * 10)
			if (!entity.hasTag("hasClass")) {
        		let entityHp = entity.getComponent("minecraft:health")?.current
				let entityName = entity.typeId.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
				
  	  	    if (entity.hasTag(classes[randomClass])) {
    	    	    entity.nameTag = classes[randomClass] + " [" + classesLevel + "] §r" + entityName + " " + suffix[randomSuffix] + entityHp
					entity.addTag("hasClass")
			    }
     	   }
  	  }
	}
}

world.events.entityCreate.subscribe(() => {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let randomTick = Math.floor(Math.random() * 5)
		if (randomTick == 0 && !entity.hasTag("hasClass")) {
			runScript()
		} else {
			entity.addTag("hasClass")
		}
	}
})