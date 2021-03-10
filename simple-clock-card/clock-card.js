class ClockCard extends Polymer.Element {
    static get template() {
      return Polymer.html`
         <style>
          :host {
            cursor: pointer;
          }
          .content {
            padding: 24px 26px 26px;
          }
          .name {
            margin-left: 16px;
            font-size: 16px;
            color: var(--secondary-text-color);
          }
          .now {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          .main {
            display: flex;
            align-items: center;
            margin-right: 32px;
          }
          .main .clock {
            font-size: 152px;
            line-height: 1em;
            position: relative;
          }
          .date {
            padding: 24px 26px 26px;
            font-family: var(--paper-font-headline_-_font-family);
            -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
            xfont-size: var(--paper-font-headline_-_font-size);
            font-size: 60px;
            font-weight: var(--paper-font-headline_-_font-weight);
            letter-spacing: var(--paper-font-headline_-_letter-spacing);
            line-height: var(--paper-font-headline_-_line-height);
            text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            opacity: var(--dark-primary-opacity);
          }
        </style>
        <ha-card>
          <div class="content">
            <div class="now">
              <div class="main">
                <div class="clock" id="time"></div>
              </div>
              <div class="date">
                <div id="date"></div>
              </div>
            </div>
          </div>
        </ha-card>
       `
    }
    
    static get properties() {
      return {
        _hass: Object
      }
    }
    
    ready() {
      super.ready();
      this.time = this.$.time;
      this.date = this.$.date;
      
      this._updateTime();
      setInterval(() => this._updateTime(), 500);
    }
    
    setConfig(config) {
      const cardConfig = Object.assign({}, config);
      if (!cardConfig.time_font_size) cardConfig.time_font_size = "50px";
      if (!cardConfig.locale) cardConfig.locale = "en-GB";
      this.config = config;
      console.log("clock: time_font_size:"+cardConfig.time_font_size);
      console.log("clock: locale:"+cardConfig.locale);
      console.log("clock: time_style:"+cardConfig.time_style);
      console.log("clock: date_style:"+cardConfig.date_style);

      console.log("clock: show:"+cardConfig.show);
      //console.log("|"+this.config.time_style+"|"+this.config.date_style+"|"+this.config.show);
/*
      if (this.config.locale == null) this.config.locale = 'en-US';
      if (this.config.time_style == null) this.config.time_style = 'medium'; // full, long, medium, short
      if (this.config.date_style == null) this.config.date_style = 'medium'; // full, long, medium, short
      if (this.config.show == null) this.config.show = 'both'; // date, time, both
*/

      this.config = cardConfig;
    }
    
    set hass(hass) {
      this._hass = hass;
    }


    addZero(i){
      if (i < 10){
        i = "0" + i;
      }
      return i;
    }
    _updateTime(force = true) { 
      const event = new Date(Date.now());

      var today = new Date(),
          h = today.getHours(),
          m = today.getMinutes(),
          s = today.getSeconds(),

          h = this.addZero(h);
          m = this.addZero(m);
          s = this.addZero(s);

      var weekday = new Array(7);
          weekday[0] = "Sun";
          weekday[1] = "Mon";
          weekday[2] = "Tue";
          weekday[3] = "Wed";
          weekday[4] = "Thu";
          weekday[5] = "Fri";
          weekday[6] = "Sat";

      var D = weekday[today.getDay()]; 

      var month = new Array();
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
      var M = month[today.getMonth()];

      var DOM = today.getDate();
      const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
         switch (d % 10) {
           case 1:  return "st";
           case 2:  return "nd";
           case 3:  return "rd";
           default: return "th";
         }
      }
      var SFX = nth(DOM);
  
      if(this.config.show === 'both') {
        //console.log("-- clock: time_font_size:"+this.config.time_font_size);
        //this.time.innerHTML = event.toLocaleTimeString(this.config.locale, { fontSize : this.config.time_font_size });
        //this.time.innerHTML = event.toLocaleTimeString(this.config.locale, { timeStyle : this.config.time_style });
        //this.date.innerHTML = event.toLocaleDateString(this.config.locale, { dateStyle : this.config.date_style });

        let time_str =  ( h ) + ":" + m + ":" + s;
        this.time.innerHTML = time_str;

        let date_str = D+" "+DOM+SFX+" "+M;
        this.date.innerHTML = date_str;
        //document.getElementById('time').style.fontSize = this.config.time_font_size;
        return;
      }


      if(this.config.show === 'date') {
        this.time.innerHTML = event.toLocaleDateString(this.config.locale, { dateStyle : this.config.date_style });
        this.date.innerHTML = '';
        return;
      }

      if(this.config.show === 'time') {
        this.time.innerHTML = event.toLocaleTimeString(this.config.locale, { timeStyle : this.config.time_style });
        this.date.innerHTML = '';
        return;
      }
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
      return 10;
    }
  }
  
  customElements.define('clock-card', ClockCard);
