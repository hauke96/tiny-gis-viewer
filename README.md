# TinyGisViewer

A tiny web-application to view geospatial data.
The core idea is to just need a simple HTTP webspace and load the layers from existing servers.
Configuration takes place in a simple JSON file on your webspace.

If you host your own GIS server (GeoServer, MapServer, QGIS-Server, whatever), then you can use TinyGisViewer as a simple frontend for your layers.

<img align="center" style="width: 100%; max-width: 1200px;" src="https://raw.githubusercontent.com/hauke96/tiny-gis-viewer/master/screenshot.webp">

## Demo

You can find a hosted version here: https://deneb.hauke-stieler.de/geo/viewer/

## Features

* Show WMS and XYZ layers
  * Load WMS layers automatically based on `GetCapabilities`-URL
* Select features and show their attributes
* Measure distance and area 

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
    image: hauke96/tiny-gis-viewer:0.2.0
```

That's it.

## Configuration

Take a look at [public/config.json](./public/config.json) for an example or [config.ts](src/app/config/config.ts) for the corresponding TypeScript file.
The `mapView` property can contain exactly the properties of an OpenLayers `ViewOptions` object.

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
* User-management, admin-interface or any kind of configuration within the browser
* Anything that would require a proper backend server
