repeat (random.roundInt(fastExp2(`venture:continents/moisture`(minModifiableX | 8, minModifiableZ | 8) / 2475.0I * 10.0I)):
    int*(
        rng = random.nextInt()
        x = minModifiableX | (rng & 15)
        z = minModifiableZ | ((rng >>> 4) & 15)
    )
    ArrayList choices = new()
    var altitude = `venture:continents/altitude`(x, z)
    var moisture = `venture:continents/moisture`(x, z)
    if (moisture >= 470.25L && moisture < 990.0L:
        choices.add(ConfiguredFeature('venture:continents/trees/oak_skinny'))
    )
    if (moisture >= 470.25L && moisture < 915.75L:
        choices.add(ConfiguredFeature('venture:continents/trees/birch'))
    )

    if (choices.isEmpty():
        continue()
    )

    ConfiguredFeature feature = choices.get(random.nextInt(choices.size()))
    if (feature != null:
        int y = floorInt(altitude)
        placeFeature(x, y, z, feature)
    )
)
