# TinyGisViewer

A tiny web-application to view geospatial data.
The core idea is to have no dedicated server other than a simple HTTP webspace.
Configuration takes place in a JSON file on your webspace and the data comes from external OGC services.

<img align="center" style="width: 100%; max-width: 1200px;" src="https://raw.githubusercontent.com/hauke96/tiny-gis-viewer/master/screenshot.webp">

## Demo

You can find a hosted version here: https://deneb.hauke-stieler.de/geo/viewer/

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
    image: hauke96/tiny-gis-viewer:0.1.0
```

That's it.

## Configuration

See the [public/config.json](./public/config.json) as an example.
The `mapView` property can contain exactly the properties of an OpenLayers `ViewOptions` object.

## Development

Run the application locally with `ng serve`.

Use `npm run build` to build the application.
The artifact is in the `dist/tiny-gis-viewer/browser/` folder.

## Roadmap

Things that I'll add in upcoming releases:

* Selecting and viewing features.
* Specifying not only whole `GetCapabilities`-URLs but also single layer of a service.
* Typical map tools (at least measuring) that are easy to implement.
