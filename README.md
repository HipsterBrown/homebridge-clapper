# Homebridge Clapper

This uses [multicast messaging](https://en.wikipedia.org/wiki/Multicast) as a publisher/subscriber system over the local network, so no Internet required, just WiFi. I'm using a [Tessel 2](https://tessel.io/) with an [ambient sound module](http://tessel.github.io/t2-start/modules/ambient.html) to detect the claps and send the messages to this plugin. To be honest, this could eventually be generalized into a "multicast switch" module that listens for "on" or "off" events over the local network, but the first purpose was to be a clap detector so here we are.

## Install

Install [homebridge](https://github.com/nfarina/homebridge#installation) on your device if you haven't already.

Then install the plugin:
```
npm install -g homebridge-clapper
```

Example `config.json`
```
{
  "accessories": [
    {
      "accessory": "Clapper",
      "name": "Tessel Clapper"
    }
  ]
}
```


TODO: _instructions about setting up a Tessel 2, or other device that can run Node.js, to emit multicast messages_

## Testing

No unit tests because this is a personal project, so 🤷.

Running the plugin locally, [check out the homebridge docs](https://github.com/nfarina/homebridge#plugin-development).
