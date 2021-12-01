exports.mod = (mod_info) => {
	
    let PathResolver = global.internal.path.resolve
	let modFolder = `user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}`
	
    logger.logInfo("[MOD] FreePouch");

	let checkFilter = fileIO.readParsed(PathResolver(`${modFolder}/src/filter.json`))

	let filterArray = checkFilter.FilteredItems
	let base = fileIO.readParsed(global.db.user.cache.items)

	for (let item in base.data) {
		var _case = base.data[item]

		if (_case._id === `5d235bb686f77443f4331278` && _case._name === `item_container_lopouch`) {

			let CurrentfilterArray = _case._props.Grids[0]._props.filters[0].Filter
			
			CurrentfilterArray.push.apply(CurrentfilterArray, filterArray)

			/*
			[
				"59faff1d86f7746c51718c9c",
				"5d235b4d86f7742e017bc88a",
				"5f745ee30acaeb0d490d8c5b",
				"5c1267ee86f77416ec610f72",
				"5d235a5986f77443f6329bc6",
				"59f32bb586f774757e1e8442",
				"59f32c3b86f77472a31742f0",
				"590c621186f774138d11ea29",
				"543be5e94bdc2df1348b4568",
				"543be5dd4bdc2deb348b4569"
			]
			*/

			_case._props.Grids[0]._props.filters[0].Filter = CurrentfilterArray
			base.data[_case._id] = _case
		}
	}

	fileIO.write(global.db.user.cache.items, base)
	logger.logSuccess("[MOD] FreePouch; Applied");
}