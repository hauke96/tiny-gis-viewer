<img align="right" width="64px" src="https://raw.githubusercontent.com/hauke96/tiny-gis-viewer/main/icon.png">

# TinyGisViewer

TinyGisViewer is a simple frontend/viewer for your own GIS servers (GeoServer, MapServer, QGIS-Server, whatever).
It has no backend and can be deployed on any web space or simple HTTP server.

The core idea is to _not_ need a dedicated server for configuration and data management, but to simply use a simple HTTP web space and load the layers from existing GIS servers.
The configuration is done in a simple JSON file on your web space or by uploading such a file.

<img align="center" style="width: 100%; max-width: 1200px;" src="https://raw.githubusercontent.com/hauke96/tiny-gis-viewer/master/screenshot.webp">

## Demo

You can find a hosted version here: https://deneb.hauke-stieler.de/geo/viewer/

## Features

* Show WMS and XYZ layers
  * Add multiple WMS layers automatically via a `GetCapabilities`-URL
* Add and delete layers manually
* Show legend graphics of WMS layers
* Select features and show their attributes
* Measure distance and area
* Configuration
  * Load configuration via simple JSON file from webspace where TGV is hosted
    * Specify config filename in URL to support multiple different maps
  * Upload own configuration (just a frontend-feature, config is not stored on server)
  * Download current configuration
  * Share current configuration via URL
  * Share state of the map (including manually added layers) via URL

## Deployment

There are two ways to deploy TGV: Via docker and via a normal HTTP webspace.

See the [configuration section](#configuration) below on how to configure TGV.

### Via normal webspace

Download the ZIP-file from the [releases](https://github.com/hauke96/tiny-gis-viewer/releases/latest) and upload its content to your webspace.
That's it.

You can also manually build your app (s. [below](#development)) and then upload the content of the `dist/tiny-gis-viewer/browser/` folder to your webspace.

### Via docker

There's the docker-image https://hub.docker.com/r/hauke96/tiny-gis-viewer, which has a nginx server inside hosting the application.
With docker-compose, you can easily deploy TGV on a server:

```yaml
services:
  tiny-gis-viewer:
    image: hauke96/tiny-gis-viewer:0.3.0
```

That's it.

## Configuration

Take a look at the [public/config.json](./public/config.json) file for an example or at the [config.ts](src/app/config/config.ts) TypeScript file, which represents the configuration within the code.
The `mapView` property can contain exactly the properties of an OpenLayers `ViewOptions` object.

### Specify config in URL

By default the `config.json` file is loaded.
When the `configId=...` URL-parameter is set, then this config is loaded.
This parameter should only contain the filename without the `.json` extension and without any special characters (just letters, numbers, "-" and "_" are allowed).

## Development

Run the application locally with `ng serve`.

Use `npm run build` to build the application.
The artifact is in the `dist/tiny-gis-viewer/browser/` folder.

## Roadmap

Things that I'll add in upcoming releases:

* Adding support for WFS services
* Export of data (in case the WMS service has a corresponding WFS service)
* Organize Layers in Groups

Things I might add and thing I would accept via a PR:

* Support for more layer types
* Additional map tools (printing, fullscreen, rotation)
* Responsive design
* Additional translations
* Other useful features that do not add unnecessary complexity to this simple tool

Things that will not be implemented:

* Editing or creating data
* User-management, admin-interface or persisting the configuration on the server
* Anything that would require a proper backend server
