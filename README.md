Wot's all this then?
--------------------

This is a tool intended to speed up manual transcription of commodity prices in Star Citizen 3.19+ since the game files no-longer appear to have price data

built by oneeyedziggy w/ help from the sc-trade.tools discord 05/2023
free for use and reuse w/ attribution

Usage:
------

The intended usage of this tool is (currenly) to either:

For web usage:

* Upload a set of screenshots of in-game commodity trade terminals, click to have it attempt to parse the names, prices, and other available data from the right side of the screen to JSON
* Manually review and correct the initial per-screenshot json... tweaking prices, adding back missing commodities, etc.
* Click the "Transform to Output Formats" button (this will compile the data from all screenshots into one, slightly more compact JSON output below, as well as CSV and TSV)
* Take this data for use in your own logs, tooling, or for contributing to a community price-sourcing effort

OR, for unix-based command line:

* clone this repo
* run `npm install` ( w/ node.js 20+ installed locally... )
* cd into `/src/local`
* run `node ./app.js` to parse all jpg/jpeg/png image files in the `/src/local` directory
* this should dump output as json (no csv/tsv options yet for local runs...)

TODO:
* something to include timetamp info in output
* clean up local usage to support custom path/file extensions and/or archiving processed images... possibly out to another custom path 
* break cleanup and csv/tsv conversion utils out into shared code