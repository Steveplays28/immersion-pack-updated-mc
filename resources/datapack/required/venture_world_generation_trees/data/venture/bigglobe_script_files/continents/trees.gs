repeat (random.roundInt(fastExp2(`venture:continents/moisture`(minModifiableX | 8, minModifiableZ | 8) / 2475.0I * 10.0I)):
    int*(
        rng = random.nextInt()
        x = minModifiableX | (rng & 15)
        z = minModifiableZ | ((rng >>> 4) & 15)
    )
    ArrayList choices = new()
    var altitude = `venture:continents/altitude`(x, z)
    var temperature = `venture:continents/temperature`(x, z)
    var moisture = `venture:continents/moisture`(x, z)
    if (temperature >= 4.0L && temperature < 26.0L && moisture >= 470.25L && moisture < 990.0L:
        choices.add(ConfiguredFeature('venture:continents/trees/oak_skinny'))
    )
    if (temperature >= 6.0L && temperature < 22.0L && moisture >= 470.25L && moisture < 915.75L:
        choices.add(ConfiguredFeature('venture:continents/trees/birch'))
    )
    if (temperature >= -1.0L && temperature < 15.0L && moisture >= 300.0L && moisture < 900.0L:
        choices.add(ConfiguredFeature('venture:continents/trees/white_spruce'))
    )
    if (temperature >= 7.0L && temperature < 31.0L && moisture >= 25.0L && moisture < 374.0L:
        choices.add(ConfiguredFeature('venture:continents/trees/saguaro_cactus'))
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
