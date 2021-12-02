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
	// Looping through all containers in config.json
	for (let item in baseConfig.containers) {
		var _container = baseConfig.containers[item]
		// Looping through all containers in the cache items.json
		for (let item in base.data) {
			var _case = base.data[item]
			// If container _id in cache items.json matches the container _id in config.json
			if (_case._id === _container._id) {
				cases = _case._name
				logger.logInfo(`[MOD] FOUND CUSTOMIZED ITEM:   "${_case._id}" (${_case._name}) : APPLYING NEW FILTER (Adding ${_container.UpdatedFilter.length} items)`)
				// Append the array in config.json to the array for the same item in the cache items.json
				_case._props.Grids[0]._props.filters[0].Filter.push.apply(_case._props.Grids[0]._props.filters[0].Filter, _container.UpdatedFilter)
			}
		}
		// Loop through all the items in specified container's array in config.json, then appending it to a list for simplified logging
		for (var i = 0; i < _container.UpdatedFilter.length; i++) {
			counter = `"${_container.UpdatedFilter[i]}"`
			console.log(counter)
		}
		// Redundant NewLine for easier readability in the console and log
		console.log(``)
	}
	// Write the new info to the cache items.json using the base data
	fileIO.write(global.db.user.cache.items, base)
	logger.logSuccess(`[MOD] ${mod_info.name} Applied; ${Object.keys(baseConfig.containers).length} containers affected`);
}