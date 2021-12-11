exports.mod = (mod_info) => {
    logger.logInfo("[MOD] FreeContainers");
	let modFolder = `user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}`
	// Getting local config file to fetch the mod's filters
    let PathResolver = global.internal.path.resolve
	let baseConfig = fileIO.readParsed(PathResolver(`${modFolder}/config.json`))
	// Getting the cached items.json to fetch all containers in-game
	let base = fileIO.readParsed(global.db.user.cache.items)
	// Introducing global variables for inserting info
	let cases = ``
	let counter = ``
	let originalID = ``
	let originalName = ``
	let originalH = ``
	let originalV = ``
	let placeHolderH = 0
	let placeHolderV = 0
	let _pocket1 = baseConfig.PocketOne
	let _pocket2 = baseConfig.PocketTwo
	let _pocket3 = baseConfig.PocketThree
	let _pocket4 = baseConfig.PocketFour
	// Looping through all containers in config.json
	for (let item in baseConfig.containers) {
		var _container = baseConfig.containers[item]
		// Looping through all containers in the cache items.json
		for (let item in base.data) {
			var _case = base.data[item]
			if (_case._id === `557ffd194bdc2d28148b457f`) {
				if (baseConfig.TogglePockets = true) {
					_case._props.Grids[0]._props.cellsV = _pocket1
					_case._props.Grids[1]._props.cellsV = _pocket2
					_case._props.Grids[2]._props.cellsV = _pocket3
					_case._props.Grids[3]._props.cellsV = _pocket4
				}
			}
			// If container _id in cache items.json matches the container _id in config.json
			if (_case._id === _container._id) {
				cases = _case._name
				logger.logInfo(`[MOD] FOUND CUSTOMIZED ITEM:   "${_case._id}" (${_case._name}) : APPLYING NEW FILTER (Adding ${_container.UpdatedFilter.length} items)`)
				// Append the array in config.json to the array for the same item in the cache items.json
				_case._props.Grids[0]._props.filters[0].Filter.push.apply(_case._props.Grids[0]._props.filters[0].Filter, _container.UpdatedFilter)
				if (_container.EnableCustomCells = true) {
					_case._props.Grids[0]._props.cellsH = _container.HorizontalSlotCount
					_case._props.Grids[0]._props.cellsV = _container.VerticalSlotCount
					placeHolderH = _case._props.Grids[0]._props.cellsH
					placeHolderV = _case._props.Grids[0]._props.cellsV
				} else {
					placeHolderH = _container.HorizontalSlotCount
					placeHolderV = _container.VerticalSlotCount
				}
			}
		}
		// Loop through all the items in specified container's array in config.json, then appending it to a list for simplified logging
		for (var i = 0; i < _container.UpdatedFilter.length; i++) {
			counter = `"${_container.UpdatedFilter[i]}"`
			console.log(counter)
		}
		// Redundant NewLine for easier readability in the console and log
		console.log(``)
		console.log(`[MOD] APPLYING SLOT SIZE TO ITEM:  ${_container._id} (${_container._name}) :   NEW (${placeHolderH}x${placeHolderV})   OLD (${originalH}x${originalV})\n`)
	}
	// Write the new info to the cache items.json using the base data
	fileIO.write(global.db.user.cache.items, base)
	logger.logSuccess(`[MOD] ${mod_info.name} Applied; ${Object.keys(baseConfig.containers).length} containers affected`);
}
