const snekfetch = require("snekfetch");
const imageUrlRegex = /.webp$/g;

/**
 * Client for Idiotic-api Wrapper
 */
class IdioticClient {
  /**
	 * @typedef {Object} IdioticClientOptions
	 * @property {String} [url] Base URL for Idiotic API
   * @property {Boolean} [dev=false]
	 * @memberof IdioticClient
	 */

  /**
   * @param {String} token Idiotic API token
   * @param {IdioticClientOptions} [options] Client options
   */
  constructor(token, options = {}) {
    if (!token) throw new Error("Unknown Token: Token Missing");
    if (typeof token !== "string") throw new SyntaxError("Invalid Token: Token must be a String");

    /**
     * Idiot's Guide API token
     * @type {String}
     */
    this.token = token;
    /**
     * Client options
     * @type {Object}
     */
    this.options = options;
    /**
     * Whether to use the dev endpoint
     * @type {Boolean}
     */
    this.dev = options.dev || false;
    /**
     * Base URL for Idiot's Guide API
     * @type {String}
     */
    this.baseUrl = options.url || this.dev ? "https://dev.anidiots.guide/" : "https://api.anidiots.guide/api/";
  }

  /* Text based endpoints */

  /**
   * Blame endpoint
   * @param {String} name text to except back
   * @returns {Promise<Buffer>}
   */
  blame(name) {
    return this._get(this.dev ? "generators/blame": "blame", { name }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Pls endpoint
   * @param {String} mame text to except back
   * @returns {Promise<Buffer>}
   */
  pls(name) {
    return this._get(this.dev ? "generators/pls" : "pls", { name }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Snapchat endpoint
   * @param {String} text text to except back
   * @returns {Promise<Buffer>}
   */
  snapchat(text) {
    return this._get(this.dev ? "generators/snapchat" : "snapchat", { text }).then(body => Buffer.from(body.data.data));
  }

  /* Image and Text endpoints */

  /**
   * Achievement endpoint
   * @param {String} avatar Image you except to be used
   * @param {String} text text to except back
   * @returns {Promise<Buffer>}
   */
  achievement(avatar, text) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/achievement" : "achievement", { avatar, text }).then(body => Buffer.from(body.data.data));  
  }  

  /**
   * TheSearch endpoint
   * @param {String} avatar Image you except to be used
   * @param {String} text text to except back
   * @returns {Promise<Buffer>}
   */
  theSearch(avatar, text) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/thesearch" : "thesearch", { avatar, text }).then(body => Buffer.from(body.data.data));  
  }  

  /* Single Image endpoints */

  /**
   * Beautiful endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  beautiful(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/beautiful" : "beautiful", { avatar }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * Facepalm endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  facepalm(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/facepalm" : "facepalm", { avatar }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Respect endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  respect(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/respect" : "respect", { avatar }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Stepped endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  stepped(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/stepped" : "stepped", { avatar }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Tattoo endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  tattoo(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/tattoo" : "tattoo", { avatar }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * Triggered endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  triggered(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/triggered" : "triggered", { avatar }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * VaultBoy endpoint
   * @param {String} avatar Image you except to be used
   * @returns {Promise<Buffer>}
   */
  vaultBoy(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/vault" : "vault", { avatar }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * Wanted endpoint
   * @param {String} image Image you except to be used
   * @returns {Promise<Buffer>}
   */
  wanted(avatar) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/wanted" : "wanted", { avatar }).then(body => Buffer.from(body.data.data));
  }

  /**
   * Missing endpoint
   * @param {String} image Image you except to be used
   * @param {String} text text to except back
   * @returns {Promise<Buffer>}
   */
  missing(avatar, text) {
    if (!this.dev) throw new Error("Missing endpoint is disabled while in production").then(body => Buffer.from(body.data.data));
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get("generators/missing", { avatar, text });
  }

  /* Double Image endpoints */

  /**
   * BatSlap endpoint
   * @param {String} slapper Image you expect to be used
   * @param {String} slapped Image you expect to be used
   * @returns {Promise<Buffer>}
   */
  batSlap(slapper, slapped) {
    slapper = slapper.replace(imageUrlRegex, ".png");
    slapped = slapped.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/batslap" : "batslap", { slapper, slapped }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * SuperPunch endpoint
   * @param {String} puncher Image you expect to be used
   * @param {String} punched Image you expect to be used
   * @returns {Promise<Buffer>}
   */
  superPunch(puncher, punched) {
    puncher = puncher.replace(imageUrlRegex, ".png");
    punched = punched.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/superpunch" : "superpunch", { puncher, punched }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * FanSlap endpoint
   * @param {String} slapper Image you expect to be used
   * @param {String} slapped Image you expect to be used
   * @returns {Promise<Buffer>}
   */
  fanSlap(slapper, slapped) {
    slapper = slapper.replace(imageUrlRegex, ".png");
    slapped = slapped.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/slap" : "slap", { slapper, slapped }).then(body => Buffer.from(body.data.data));  
  }

  /**
   * Crush endpoint
   * @param {String} crusher Image you expect to be used
   * @param {String} crush Image you expect to be used
   * @returns {Promise<Buffer>}
   */
  crush(crusher, crush) {
    crusher = crusher.replace(imageUrlRegex, ".png");
    crush = crush.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? "generators/crush" : "crush", { crusher, crush }).then(body => Buffer.from(body.data.data));    
  }  

  /* Greetings endpoints */

  /**
   * 
   * @param {String} [version="gearz"] The type/version of greeting image you want to use
   * @param {Boolean} [bot=false] A boolean saying if the user is a bot or not
   * @param {String} avatar Avatar url
   * @param {String} usertag User's tag, format: username#discrim
   * @param {String} guild guild name and guild member count seperated by #, format: guildname#memberCount
   * @returns {Promise<Buffer>}
   */
  welcome(version = "gearz", bot = false, avatar, usertag, guild) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? `greetings/${version}_welcome` : `${version}_welcome`, { bot, avatar, usertag, guild }).then(body => Buffer.from(body.data.data));    
  }

  /* Farewell endpoints */

  /**
   * 
   * @param {String} [version="gearz"] The type/version of farewell image you want to use
   * @param {Boolean} [bot=false] A boolean saying if the user is a bot or not
   * @param {String} avatar Avatar url
   * @param {String} usertag User's tag, format: username#discrim
   * @returns {Promise<Buffer>}
   */
  goodbye(version = "gearz", bot = false, avatar, usertag) {
    avatar = avatar.replace(imageUrlRegex, ".png");
    return this._get(this.dev ? `greetings/${version}_goodbye` : `${version}_goodbye`, { bot, avatar, usertag }).then(body => Buffer.from(body.data.data));    
  }

  /**
   * A private method used to get endpoints with querys
   * @param {String} endpoint endpoint string
   * @param {Object} [query={}] query object
   * @returns {Promise<any>}
   * @private
   */
  _get(endpoint, query = {}) {
    return new Promise((resolve, reject) => {
      snekfetch.get(`${this.baseUrl}${endpoint}`)
        .set(this.dev ? "Authorization" : "token", this.token)
        .query(query)
        .then(res => {
          if (res.status !== 200) return reject(res);
          return resolve(res.body);
        }).catch(err => reject(err));
    });
  }

}

module.exports = IdioticClient;
