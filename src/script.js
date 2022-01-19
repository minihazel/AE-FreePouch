exports.mod = (mod_info) => {
    logger.logInfo(`   [MOD] Loading:  Cases-12.12-Cases`);
    logger.logInfo(`   [MOD] -------------------------------`);
    logger.logInfo(`   [MOD] Version :-                12.12`);
    logger.logInfo(`   [MOD] Variant :-           Containers`);
    let modFolder = `user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}`
    // Getting local config file to fetch the mod's filters
    let PathResolver = global.internal.path.resolve
	let baseConfig = fileIO.readParsed(PathResolver(`${modFolder}/containers.json`))
    // Getting the cached items.json to fetch all containers in-game
    let base = fileIO.readParsed(global.db.user.cache.items)
    // Introducing global variables for inserting info
	let cases = ``
	let originalID = ``
	let originalName = ``
	let placeHolderH = 0
	let placeHolderV = 0
    // Looping through all containers in config.json
    for (let item in baseConfig) {
        var _container = baseConfig[item]
        // Looping through all containers in the cache items.json
        for (let item in base.data) {
            var _case = base.data[item]
            // If container _id in cache items.json matches the container _id in config.json
            if (_case._id === _container._id) {
                originalID = _container._id
				originalName = _container._name
				cases = _case._name
                logger.logInfo(`   [MOD] Item detected: Adding ${_container.UpdatedFilter.length} items to filter (${placeHolderH}x${placeHolderV}) (${_case._name})`)
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
    }
    // Write the new info to the cache items.json using the base data
	fileIO.write(global.db.user.cache.items, base)
    logger.logSuccess(`[MOD] Cases-12.12 Applied; ${Object.keys(baseConfig).length} containers affected`);
    logger.logSuccess(``);

    // Splitting cases with pockets here
    
    logger.logInfo(`   [MOD] Loading:  Cases-12.12-Pockets`);
    logger.logInfo(`   [MOD] -------------------------------`);
    logger.logInfo(`   [MOD] Version  :-               12.12`);
    logger.logInfo(`   [MOD] Variant  :-             Pockets`);
	baseConfig = fileIO.readParsed(PathResolver(`${modFolder}/pockets.json`))
    // Getting the cached items.json to fetch all containers in-game
    base = fileIO.readParsed(global.db.user.cache.items)
    for (let item in base.data) {
        var _case = base.data[item]
        if (_case._id === `557ffd194bdc2d28148b457f`) {
            if (baseConfig.EnablePockets = true) {
                _case._props.Grids[0]._props.cellsV = baseConfig.pockets.One.VerticalSize
                _case._props.Grids[0]._props.cellsH = baseConfig.pockets.One.HorizontalSize
                _case._props.Grids[1]._props.cellsV = baseConfig.pockets.Two.VerticalSize
                _case._props.Grids[1]._props.cellsH = baseConfig.pockets.Two.HorizontalSize
                _case._props.Grids[2]._props.cellsV = baseConfig.pockets.Three.VerticalSize
                _case._props.Grids[2]._props.cellsH = baseConfig.pockets.Three.HorizontalSize
                _case._props.Grids[3]._props.cellsV = baseConfig.pockets.Four.VerticalSize
                _case._props.Grids[3]._props.cellsH = baseConfig.pockets.Four.HorizontalSize
            }
        }
    }
    // Write the new info to the cache items.json using the base data
	fileIO.write(global.db.user.cache.items, base)
    logger.logInfo(`   [MOD] Pocket 1 :-                 ${baseConfig.pockets.One.VerticalSize}x${baseConfig.pockets.One.HorizontalSize}`);
    logger.logInfo(`   [MOD] Pocket 2 :-                 ${baseConfig.pockets.Two.VerticalSize}x${baseConfig.pockets.Two.HorizontalSize}`);
    logger.logInfo(`   [MOD] Pocket 3 :-                 ${baseConfig.pockets.Three.VerticalSize}x${baseConfig.pockets.Three.HorizontalSize}`);
    logger.logInfo(`   [MOD] Pocket 4 :-                 ${baseConfig.pockets.Four.VerticalSize}x${baseConfig.pockets.Four.HorizontalSize}`);
    logger.logSuccess(`[MOD] Cases-12.12 :-          Applied`);
    logger.logSuccess(`[MOD] -------------------------------`);
    logger.logSuccess(``);
}
