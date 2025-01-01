int trunkRadius = 1
int treeHeight = random.nextInt(15, 30)
for (int y in range[originY, originY + treeHeight):
    ; Place the trunk
    setBlockState(originX, y, originZ, 'minecraft:spruce_log')

    ; Place the leaves in a circular ring around them
    double fraction = double(y) / double(treeHeight)
    int leavesRadius = roundInt(-3.0L * pow(fraction, 2.0L) - 0.1L * fraction + 4.0L)
    ; Skip placing leaves for even y values
    boolean isYEven = y % 2 == 0
    if (isYEven:
        leavesRadius = leavesRadius / 2
    )

    for (int x in range[originX - leavesRadius, originX + leavesRadius]:
        for (int z in range[originZ - leavesRadius, originZ + leavesRadius]:
            if (x == originX && z == originZ:
                continue()
            )

            ; Occasionally skip an inner leaf to break up the uniformity of the tree
            if (isYEven && random.nextDouble() > 0.85L:
                continue()
            )

            double distance = sqrt(pow(x - originX, 2.0L) + pow(z - originZ, 2.0L))
            if (distance > leavesRadius:
                continue()
            )

            setBlockState(x, y, z, 'minecraft:spruce_leaves')
        )
    )
)
; Place a top leaf block above the trunk as a cap
setBlockState(originX, originY + treeHeight, originZ, 'minecraft:spruce_leaves')

return(true)
