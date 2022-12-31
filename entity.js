import { world, Items, ItemStack, Location, Entity, ItemEnchantsComponent, ItemTypes, EntityInventoryComponent, Block, Enchantment, MinecraftEnchantmentTypes } from "@minecraft/server"
import { system } from "@minecraft/server";
import { MinecraftEntityTypes, DynamicPropertiesDefinition, EntityQueryOptions } from "@minecraft/server"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

let classes = [
	"§c§lAdaptable",
	"§e§lHasty",
	"§6§lMolten",
	"§2§lPlaguated",
	"§7§lWeaker",
	"§1§lGlacier",
	"§9§lDarkblood"
]

let suffix = [
	"Of Undefined",
	"Of Bloody Thirst",
	"Of Dave",
	"Of Madness",
	"Of Nothing",
	"The Hunter",
	"The Fighter",
	"The Blamer",
	"The Stealer",
	"The Keeper"
]


function runScript() {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let distance = Math.abs(entity.location.x)+Math.abs(entity.location.z)
		let classesLevel = Math.floor(distance/200)
		let randomClass = Math.floor(Math.random() * 7)
		let classesHighEnd = [
			"I",
			"II",
			"III",
			"IV",
			"V"
		]
		let  highEndLevel = classesLevel-250
   	 if (entity.hasComponent(`minecraft:movement`) && entity.nameTag == "" && !entity.hasTag("hasClass")){
			if (classesLevel < 250){
     	   	if (classes[randomClass]){
     	   		entity.runCommandAsync(`effect @s health_boost 100000 ${classesLevel} false`)
            		entity.getComponent('health').setCurrent(entity.getComponent('health').value+1000)
     	   		entity.addTag(classes[randomClass])
				}
		   	 entityNameTag()
				addSpecialEffect()
     	   }
			if (classesLevel > 250){
     	   	if (classesHighEnd[highEndLevel]){
     	   		entity.runCommandAsync(`effect @s health_boost 100000 ${classesLevel} false`)
            		entity.getComponent('health').setCurrent(entity.getComponent('health').value+1000)
     	   		entity.addTag("High-End")
				}
		   	 entityNameTag()
				addSpecialEffect()
     	   }
		}
		function addSpecialEffect() {
			if (entity.hasTag(classes[0])) {
				entity.runCommandAsync(`effect @s strength 100000 ${classesLevel} false`)
			}
			if (entity.hasTag(classes[1])) {
				if (classesLevel < 25) {
					entity.runCommandAsync(`effect @s speed 100000 2 false`)
				}
				if (classesLevel > 25 && classesLevel < 50) {
					entity.runCommandAsync(`effect @s speed 100000 4 false`)
				}
				if (classesLevel > 50 && classesLevel < 100) {
					entity.runCommandAsync(`effect @s speed 100000 6 false`)
				}
				if (classesLevel > 100 && classesLevel < 150) {
					entity.runCommandAsync(`effect @s speed 100000 8 false`)
				}
				if (classesLevel > 150 && classesLevel < 200) {
					entity.runCommandAsync(`effect @s speed 100000 10 false`)
				}
				if (classesLevel > 200 && classesLevel < 250) {
					entity.runCommandAsync(`effect @s speed 100000 12 false`)
				}
				if (classesLevel > 250 && classesLevel < 255) {
					entity.runCommandAsync(`effect @s speed 100000 14 false`)
				}
			}
		}
		function entityNameTag() {
			let randomSuffix = Math.floor(Math.random() * 10)
			if (!entity.hasTag("hasClass")) {
        		let entityHp = entity.getComponent("minecraft:health")?.current
				let entityName = entity.typeId.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
				
  	  	    if (entity.hasTag(classes[randomClass])) {
    	    	    entity.nameTag = classes[randomClass] + " [" + classesLevel + "] §r" + entityName + " " + suffix[randomSuffix]
					entity.addTag("hasClass")
			    }
				if (entity.hasTag("High-End")) {
    	    	    entity.nameTag = "High End" + " [" + classesHighEnd[highEndLevel] + "] §r" + entityName + " " + suffix[randomSuffix]
					entity.addTag("hasClass")
			    }
     	   }
  	  }
	}
}

world.events.entityCreate.subscribe(() => {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let randomTick = Math.floor(Math.random() * 10)
		if (randomTick == 0 && !entity.hasTag("hasClass")) {
			runScript()
		} else {
			entity.addTag("hasClass")
		}
	}
})

world.events.tick.subscribe(() => {
	const entities = Array.from(world.getDimension("overworld").getEntities())
	for(const entity of entities) {
		let distance = Math.abs(entity.location.x)+Math.abs(entity.location.z)
		let classesLevel = Math.floor(distance/200)
		if (entity.hasTag(classes[5])) {
			entity.runCommandAsync(`effect @e[r=5] slowness 5 ${classesLevel} false`)
		}
		if (entity.hasTag(classes[6])) {
			entity.runCommandAsync(`effect @e[r=5] wither 5 ${classesLevel} false`)
		}
	}
})
