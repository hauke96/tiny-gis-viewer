# TinyGisViewer

A tiny web-application to view geospatial data.
The core idea is to have no dedicated server other than a simple HTTP webspace.
Configuration takes place in a JSON file on your webspace and the data comes from external OGC services.

<img align="center" style="width: 100%; max-width: 1200px;" src="https://raw.githubusercontent.com/hauke96/tiny-gis-viewer/master/screenshot.webp">

## Demo

You can find a hosted version here: https://deneb.hauke-stieler.de/geo/viewer/

## Configuration

See the [public/config.json](./public/config.json) as an example.
The `mapView` property can contain exactly the properties of an OpenLayers `ViewOptions` object.

## Development

Run the application locally with `ng serve`.

## Roadmap

Things that I'll add in upcoming releases:

* Selecting and viewing features.
* Specifying not only whole `GetCapabilities`-URLs but also single layer of a service.
* Typical map tools (at least measuring) that are easy to implement.
