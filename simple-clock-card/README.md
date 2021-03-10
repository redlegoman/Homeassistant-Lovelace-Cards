# Simple Clock Card
A text based clock for Homeassistants' Lovelace ui

![24h clock](https://i.imgur.com/n37gyxZ.png)  

![military without seconds](https://i.imgur.com/ej4AFO3.png)

## Usage
- Download the files in this folder to your 'www' folder in the hass config directory. The *'www'* folder can be accesed via *'/local/'* in your configuration I've put my custom elements in the sub folder *'elements'* and the js file of this card in the folder *'simple-clock-card'* as an example.

- enable advanced mode and in your lovelace dashboard settings under the resources tab add the following:

![add a resource](https://i.imgur.com/pySUU4V.png)

- or if you use yaml to configure lovelace:
		
		resources:
			- type: module
	        	  url: /local/elements/simple-clock-card/simple-clock-card.js
			  
- add the following lines to a view in '*cards:*' as a *'manual card'* or use your yaml configuration and add:
		
		cards:
			- type: 'custom:simple-clock-card'

thats it!
		

## Options
|option| default|description| 
|--|--|--|
|  use_millitary| true| When false shows a 24h format clock instead of a 12h format clock with AM/ PM|
|  hide_seconds| false| When true hides the seconds

## Example
- show a 24h clock without seconds:
	
		- type: 'custom:simple-clock-card'
		  use_military: false
		  hide_seconds: false
# Home Assistant clock card
This is a simple clock card made for the Home Assistant Lovelace UI.

## 
![](https://i.imgur.com/L8CFpm6.gif "1")

The clock card requires the clock-card.js to be placed in the local (/www) folder on your Home Assistant installation and the following has to be put into the ui-lovelace.yaml file.
```
resources:
  - url: /local/clock-card.js
    type: js
```

The clock card can then be used by adding a 'manual-card' when configuring the UI.
```
...
  type: 'custom: clock-card'
  locale: <iso language code>
  style: 'both' | 'time' | 'date'
  timeStyle: 'full' | 'long' | 'medium' | 'short'
  dateStyle: 'full' | 'long' | 'medium' | 'short'

```

'en-US' is default as locale.</br>
'both' is default as style.</br>
'medium' is default, both for time and date format


