int surfaceY = world_traits.`bigglobe:y_level_on_surface`
;skip the bulk of the work if the surface is outside the world height,
;which could happen with cubic chunks.
if (surfaceY.isBetween[minY, maxY]:
	long seed = columnSeed(16x89EA3521C6A72ABCUL)
	double slopeSquared = (
		+ dx(`bigglobe:overworld/basic_surface_y`) ^ 2
		+ dz(`bigglobe:overworld/basic_surface_y`) ^ 2
	)
	if ((seed := seed.newSeed()).nextDouble() < unmixSmooth(8.0L, 4.0L, `bigglobe:overworld/processed_surface_y`):
		int depth = (seed := seed.newSeed()).nextInt(3, 7)
		setBlockStates(surfaceY - depth, surfaceY, 'minecraft:gravel')
	)
	if (`bigglobe:overworld/lake_surface_states` != null:
		setBlockStates(
			surfaceY - (seed := seed.newSeed()).nextInt(3, 7),
			surfaceY,
			`bigglobe:overworld/lake_surface_states`.under
		)
	)
	int depth = floorInt(
		+ (seed := seed.newSeed()).nextDouble(3.0L, 7.0L) ;base randomness
		- (slopeSquared * 3.0L) ;less depth when slope is high
		+ (`bigglobe:overworld/height_adjusted_foliage`(surfaceY) * 2.0L)
	)
	if (depth > 0:
		if (`bigglobe:overworld/lake_surface_states` != null:
			setBlockStates(
				surfaceY - depth,
				surfaceY,
				`bigglobe:overworld/lake_surface_states`.top
			)
		)
		else (
			SurfaceStates states = `bigglobe:overworld/surface_states`
			boolean hadBlock = false
			for (int y in -range[surfaceY - depth, surfaceY):
                hadBlock = (getBlockState(y) !=. 'minecraft:air').if (
					setBlockState(y, hadBlock ? states.subsurfaceState : states.surfaceState)
				)

                ; Replace certain blocks with slabs to smooth out the terrain
                int slabPosition = getBottomOfSegment(y)
                BlockState blockStateBelow = getBlockState(slabPosition - 1)
                if (blockStateBelow.?blocksLight() && !blockStateBelow.?isIn('#minecraft:slabs') && ceilInt(world_traits.`bigglobe:exact_surface_y` * 2.0) & 1 == 1:
                    BlockState previousBlockState = getBlockState(slabPosition)
                    if (previousBlockState == null:
                        continue()
                    )

                    String waterLoggedState = ''
                    if (slabPosition < `bigglobe:overworld/sea_level`:
                        waterLoggedState = '[waterlogged=true]'
                    )

                    BlockState slabBlockState = null
                    if (previousBlockState == BlockState('minecraft:grass_block'):
                        slabBlockState = BlockState('grassoverhaul:grass_sod_slab$waterLoggedState')
                    ) else if (previousBlockState == BlockState('minecraft:podzol'):
                        slabBlockState = BlockState('grassoverhaul:podzol_sod_slab$waterLoggedState')
                    ) else if (previousBlockState == BlockState('minecraft:mycelium'):
                        slabBlockState = BlockState('grassoverhaul:mycelium_sod_slab$waterLoggedState')
                    ) else if (previousBlockState.isIn('#minecraft:dirt'):
                        slabBlockState = BlockState('grassoverhaul:dirt_sod_slab$waterLoggedState')
                    ) else if (previousBlockState == BlockState('minecraft:diorite'):
                        slabBlockState = BlockState('grassoverhaul:diorite_slab$waterLoggedState')
                    ) else if (previousBlockState == BlockState('minecraft:granite'):
                        slabBlockState = BlockState('grassoverhaul:granite_slab$waterLoggedState')
                    ) else if (previousBlockState == BlockState('minecraft:andesite'):
                        slabBlockState = BlockState('grassoverhaul:andesite_slab$waterLoggedState')
                    ) else (
                        slabBlockState = BlockState('minecraft:stone_slab$waterLoggedState')
                    )

                    setBlockState(slabPosition, slabBlockState)
                )
            )
        )
    )
	if (`bigglobe:overworld/processed_surface_y` > `bigglobe:overworld/sea_level` && (seed := seed.newSeed()).nextBoolean(world_traits.`bigglobe:snow_chance`):
		generateSnow(surfaceY, `bigglobe:overworld/snow_y`)
	)
)
