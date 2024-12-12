# Venture

Creativity and infrastructure based modpack with a focus on immersion, running on Minecraft `1.21.1` with the [Fabric Loader](https://fabricmc.net).  

## Installation

### Client-side

1. Download the Prism Launcher instance (which contains the Packwiz Installer bootstrap) from the repository's [releases tab](https://github.com/steves-underwater-paradise/venture/releases/latest)
2. Change the RAM allocation (6GB+ is recommended)
3. Run the Prism Launcher instance (files will auto download from this GitHub repository using Packwiz)
4. Tweak Minecraft (`options.txt` or in game) and Distant Horizons settings to your liking (`config/DistantHorizons.toml` or in game via `Options->DH button` or `Mod Menu->Distant Horizons->Config`)
5. Load a singleplayer world

### Server-side

The server uses Docker Compose for easy installation. Make sure you have [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose) set up.  
Portainer is recommended, as it is the easiest installation method.

1. Copy the [Docker Compose script](docker-compose.yaml)
2. Change the RCON password
3. Change the data directory (if you're getting permission errors when running the server, make sure to create these directories if they don't exist)
4. On the server PC, use Portainer or Docker Compose to create the Docker server from the [Docker Compose script](docker-compose.yaml) (make sure to change the RCON password and the data directory)
5. Accept the EULA (`eula.txt`)
6. Enable serverside support in Distant Horizons' config (`config/DistantHorizons.toml`)
7. Tweak the Minecraft server's properties (`server.properties`) and Distant Horizons settings to your liking (`config/DistantHorizons.toml`)
8. Start the server (the server will run on the default Minecraft port `25565`)
9. On the client PC, download the modpack's instance, see the [`installation guide`](#client-side)
10. Tweak Minecraft and Distant Horizons settings to your liking (`config/DistantHorizons.toml` or in game via `Options->DH button` or `Mod Menu->Distant Horizons->Config`)
11. Join your server

### Recommended JVM arguments

Client:

```jvm_args
-javaagent:mod-loading-screen-1.0.4.jar -Dmax.bg.threads=4 -XX:+UnlockDiagnosticVMOptions -XX:+AllowArchivingWithJavaAgent -XX:SharedArchiveFile="appcds_cache.jsa" -XX:+AutoCreateSharedArchive
```

## Contributing

To report bugs/crashes, or give suggestions, head over to the repository's [issues tab](https://github.com/steves-underwater-paradise/venture/issues).

### Development

1. Install [Packwiz](https://packwiz.infra.link/installation/)
2. Clone the repository
3. Run the Visual Studio Code task (or the terminal command) `packwiz serve` (the Packwiz server will now run locally on port `8080`)
4. Download the modpack's instance, see the [`installation guide`](#installation)
5. Change the pre-launch command to `$INST_JAVA -jar packwiz-installer-bootstrap.jar "http://localhost:8080/pack.toml"` (default pre-launch command is `https://github.com/steves-underwater-paradise/venture/raw/1.20.1/pack.toml`)
