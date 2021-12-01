exports.mod = (mod_info) => {
    logger.logInfo("[MOD] FreePouch");

    let PathResolver = global.internal.path.resolve
	let modFolder = `user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}`
	let checkFilter = fileIO.readParsed(PathResolver(`${modFolder}/src/filter.json`))
	let filterArray = checkFilter.FilteredItems
	let base = fileIO.readParsed(global.db.user.cache.items)

	for (let item in base.data) {
		var _case = base.data[item]
		if (_case._id === `5d235bb686f77443f4331278` && _case._name === `item_container_lopouch`) {
			let CurrentfilterArray = _case._props.Grids[0]._props.filters[0].Filter
			CurrentfilterArray.push.apply(CurrentfilterArray, filterArray)

			_case._props.Grids[0]._props.filters[0].Filter = CurrentfilterArray
			base.data[_case._id] = _case
		}
	}
	fileIO.write(global.db.user.cache.items, base)
	logger.logSuccess("[MOD] FreePouch; Applied");
}
