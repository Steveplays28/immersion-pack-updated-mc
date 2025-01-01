int treeHeight = random.nextInt(3, 16)
int branchHeight = random.nextInt(1, 3)
int maximumTrunkY = originY + treeHeight
boolean hasPlacedBranchEast = false
boolean hasPlacedBranchWest = false
boolean hasPlacedBranchSouth = false
boolean hasPlacedBranchNorth = false
for (int y in range[originY, maximumTrunkY):
    String branchBlockStateSide = ''
    if (abs(y - originY) >= 1:
        if (!hasPlacedBranchEast && random.nextDouble() > 0.5L:
            ; Place a branch
            branchBlockStateSide = ',west=true'
            setBlockState(originX - 1, y, originZ, 'terrestria:saguaro_cactus[east=true,west=true]')
            setBlockState(originX - 2, y, originZ, 'terrestria:saguaro_cactus[east=true,up=true]')
            for (int branchY in range(y, y + branchHeight):
                setBlockState(originX - 2, branchY, originZ, 'terrestria:saguaro_cactus[down=true,up=true]')
            )
            setBlockState(originX - 2, y + branchHeight, originZ, 'terrestria:saguaro_cactus[down=true]')
            hasPlacedBranchEast = true
        ) else if (!hasPlacedBranchWest && random.nextDouble() > 0.5L:
            ; Place a branch
            branchBlockStateSide = ',east=true'
            setBlockState(originX + 1, y, originZ, 'terrestria:saguaro_cactus[west=true,east=true]')
            setBlockState(originX + 2, y, originZ, 'terrestria:saguaro_cactus[west=true,up=true]')
            for (int branchY in range(y, y + branchHeight):
                setBlockState(originX + 2, branchY, originZ, 'terrestria:saguaro_cactus[down=true,up=true]')
            )
            setBlockState(originX + 2, y + branchHeight, originZ, 'terrestria:saguaro_cactus[down=true]')
            hasPlacedBranchWest = true
        ) else if (!hasPlacedBranchSouth && random.nextDouble() > 0.5L:
            ; Place a branch
            branchBlockStateSide = ',north=true'
            setBlockState(originX, y, originZ - 1, 'terrestria:saguaro_cactus[south=true,north=true]')
            setBlockState(originX, y, originZ - 2, 'terrestria:saguaro_cactus[south=true,up=true]')
            for (int branchY in range(y, y + branchHeight):
                setBlockState(originX, branchY, originZ - 2, 'terrestria:saguaro_cactus[down=true,up=true]')
            )
                setBlockState(originX, y + branchHeight, originZ - 2, 'terrestria:saguaro_cactus[down=true]')
            hasPlacedBranchSouth = true
        ) else if (hasPlacedBranchNorth && random.nextDouble() > 0.5L:
            ; Place a branch
            branchBlockStateSide = ',south=true'
            setBlockState(originX, y, originZ + 1, 'terrestria:saguaro_cactus[north=true,south=true]')
            setBlockState(originX, y, originZ + 2, 'terrestria:saguaro_cactus[north=true,up=true]')
            for (int branchY in range(y, y + branchHeight):
                setBlockState(originX, branchY, originZ + 2, 'terrestria:saguaro_cactus[down=true,up=true]')
            )
            setBlockState(originX, y + branchHeight, originZ + 2, 'terrestria:saguaro_cactus[down=true]')
            hasPlacedBranchNorth = true
        )
    )

    ; Place the trunk
    if (y == maximumTrunkY - 1:
        setBlockState(originX, y, originZ, 'terrestria:saguaro_cactus[down=true$branchBlockStateSide]')
    ) else (
        setBlockState(originX, y, originZ, 'terrestria:saguaro_cactus[down=true,up=true$branchBlockStateSide]')
    )
)

return(true)
