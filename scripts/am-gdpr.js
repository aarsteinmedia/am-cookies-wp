
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (exports) {
    'use strict';

    (function() {
        const env = {"NODE_ENV":"development"};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    /*! js-cookie v3.0.5 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (name, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        name = encodeURIComponent(name)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          name + '=' + converter.write(value, name) + stringifiedAttributes)
      }

      function get (name) {
        if (typeof document === 'undefined' || (arguments.length && !name)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var found = decodeURIComponent(parts[0]);
            jar[found] = converter.read(value, found);

            if (name === found) {
              break
            }
          } catch (e) {}
        }

        return name ? jar[name] : jar
      }

      return Object.create(
        {
          set,
          get,
          remove: function (name, attributes) {
            set(
              name,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    var api = init(defaultConverter, { path: '/' });

    var settings$2="Cookie Settings";var customize$2={header:"Your data, your choice",label:"Customize",text:"We use <strong>functional cookies</strong> for navigation, etc. In addition, we use <strong>statistical cookies</strong> to see how users interact with the website.",retargeting:"We also use <strong>cookies for marketing.</strong>",link:"See our <a href=\"/%URL%\">privacy policy</a>"};var header$2="This website uses";var miniGDPR$3="Cookie settings";var accept$2="I understand";var acceptAll$2="Accept all";var decline$2="Only functional";var close$2="Close";var save$2="Save preferences";var functional$2={label:"Functional"};var statistical$2={label:"Statistical"};var marketing$2={label:"Marketing"};var policyUrl$2="privacy";var en = {settings:settings$2,customize:customize$2,header:header$2,miniGDPR:miniGDPR$3,accept:accept$2,acceptAll:acceptAll$2,decline:decline$2,close:close$2,save:save$2,functional:functional$2,statistical:statistical$2,marketing:marketing$2,policyUrl:policyUrl$2};

    var settings$1="Paramètres des cookies";var customize$1={header:"Vos données, votre choix",label:"Personnaliser",text:"Nous utilisons des <strong>cookies fonctionnels</strong> pour la navigation, etc. De plus, nous utilisons des <strong>cookies statistiques</strong> pour voir comment les utilisateurs interagissent avec le site Web.",retargeting:"Nous utilisons également <strong>des cookies à des fins de marketing.</strong>",link:"Consultez notre <a href=\"/%URL%\">politique de confidentialité</a>"};var header$1="Ce site Web est utilisé";var miniGDPR$2="Paramètres des cookies";var accept$1="Je comprends";var acceptAll$1="Accepter tout";var decline$1="Uniquement fonctionnel";var close$1="Fermer";var save$1="Enregistrer les préférences";var functional$1={label:"Fonctionnel"};var statistical$1={label:"Calcul statistique"};var marketing$1={label:"Commercialisation"};var policyUrl$1="confidentialite";var fr = {settings:settings$1,customize:customize$1,header:header$1,miniGDPR:miniGDPR$2,accept:accept$1,acceptAll:acceptAll$1,decline:decline$1,close:close$1,save:save$1,functional:functional$1,statistical:statistical$1,marketing:marketing$1,policyUrl:policyUrl$1};

    var settings="Cookieinnstillinger";var customize={header:"Dine data, ditt valg",label:"Tilpass",text:"Vi bruker <strong>funksjonelle cookies</strong> til navigering og lignende. I tillegg bruker vi <strong>statistiske cookies</strong> til å se hvordan brukere interagerer med nettsiden.",retargeting:"Vi bruker også <strong>cookies til markedsføring.</strong>",link:"Les mer på vår <a href=\"/%URL%\">personvernserklæring</a>"};var header="Denne nettsida bruker";var miniGDPR$1="Innstillinger for cookies";var accept="Jeg forstår";var acceptAll="Godta alle";var decline="Bare funksjonelle";var close="Lukk";var save="Lagre innstillinger";var functional={label:"Funksjonell"};var statistical={label:"Statistisk"};var marketing={label:"Markedsføring"};var policyUrl="personvern";var no = {settings:settings,customize:customize,header:header,miniGDPR:miniGDPR$1,accept:accept,acceptAll:acceptAll,decline:decline,close:close,save:save,functional:functional,statistical:statistical,marketing:marketing,policyUrl:policyUrl};

    const languages = [
        'en',
        'fr',
        'nb',
        'no'
    ], fallbackLanguage = 'en', browserLanguage = document.documentElement.lang.toLowerCase() || fallbackLanguage, translation = languages.find((lang)=>browserLanguage.includes(lang)) || fallbackLanguage;
    function getTranslation() {
        switch(translation){
            case 'fr':
                return fr;
            case 'no':
            case 'nb':
                return no;
            default:
                return en;
        }
    }

    const gtmCode = (gtmId, defer, domain)=>`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.id='gtm-snippet';j.${defer ? 'defer' : 'async'}=true;j.src='https://${domain}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
    let GTM = class GTM {
        initialize() {
            gtag('consent', 'default', this.consentParams);
            if (this._initialized) {
                console.warn('Google Tag Manager is already loaded');
                return;
            }
            if (!this.gtmId) {
                console.error('No Google Tag Manager ID was assigned');
                return;
            }
            const isAlreadyLoaded = document.getElementById('gtm-snippet');
            if (!(isAlreadyLoaded && 'src' in isAlreadyLoaded && typeof isAlreadyLoaded.src === 'string' && isAlreadyLoaded.src.includes(`id=${this.gtmId}`))) {
                const script = document.createElement('script'), innerHTML = gtmCode(this.gtmId, this.defer, this.serverSideDomain ? this.serverSideDomain.replace(/http(|s):\/\/|\/$/g, '') : 'www.googletagmanager.com');
                script.innerHTML = innerHTML;
                document.head.appendChild(script);
                script.insertAdjacentHTML('beforebegin', '<!-- Google Tag Manager -->');
                script.insertAdjacentHTML('afterend', '<!-- End Google Tag Manager -->');
                this._initialized = true;
            }
        }
        updateConsent({ consentParams }) {
            try {
                window.gtag('consent', 'update', consentParams);
            } catch (err) {
                console.error(err);
            }
        }
        constructor({ gtmId, serverSideDomain = null, consentParams, defer = false }){
            this._initialized = false;
            this.gtmId = null;
            this.serverSideDomain = null;
            this.defer = false;
            this.gtmId = gtmId ? gtmId.trim() : null;
            this.serverSideDomain = serverSideDomain ? serverSideDomain.trim() : null;
            this.defer = !!defer;
            this.consentParams = consentParams;
            if (!window.gtag) {
                window.gtag = function(...args) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(args);
                };
            }
        }
    };

    let GTag = class GTag {
        initialize() {
            gtag('consent', 'default', this.consentParams);
            const scriptID = 'ga-gtag';
            if (document.getElementById(scriptID) || this._initialized) {
                return;
            }
            try {
                if (!this.googleID) {
                    throw new Error('No Google Tag ID was assigned');
                }
                const script = document.createElement('script');
                script.id = scriptID;
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${this.googleID}`;
                document.head.appendChild(script);
                script.insertAdjacentHTML('beforebegin', '<!-- Google Analytics -->');
                script.insertAdjacentHTML('afterend', '<!-- End Google Analytics -->');
                gtag('js', new Date());
                gtag('config', this.googleID, this.config);
                this._initialized = true;
            } catch (err) {
                console.error(err);
            }
        }
        updateConsent({ consentParams }) {
            try {
                window.gtag('consent', 'update', consentParams);
            } catch (err) {
                console.error(err);
            }
        }
        constructor({ googleID, config = {}, consentParams }){
            this._initialized = false;
            this.config = {};
            this.googleID = googleID;
            this.config = config;
            this.consentParams = consentParams;
            if (!window.gtag) {
                window.gtag = function(...args) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(args);
                };
            }
        }
    };

    let MetaPixel = class MetaPixel {
        initialize() {
            const scriptID = 'meta-pixel';
            if (document.getElementById(scriptID) || this._initialized) {
                return;
            }
            try {
                if (!this.metaPixelID) {
                    throw new Error('No Meta Pixel ID was assigned');
                }
                const script = document.createElement('script');
                script.id = scriptID;
                script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/${this.locale}/fbevents.js');fbq('init', '${this.metaPixelID}');fbq('track', 'PageView');`;
                document.head.appendChild(script);
                script.insertAdjacentHTML('beforebegin', '<!-- Meta Pixel Code -->');
                script.insertAdjacentHTML('afterend', '<!-- End Meta Pixel Code -->');
            } catch (err) {
                console.error(err);
            }
        }
        constructor({ metaPixelID, locale = 'en_US' }){
            this._initialized = false;
            this.metaPixelID = metaPixelID;
            this.locale = locale.replaceAll('-', '_');
        }
    };

    let SnapChatPixel = class SnapChatPixel {
        initialize() {
            const scriptID = 'snap-pixel';
            if (document.getElementById(scriptID) || this._initialized) {
                return;
            }
            try {
                if (!this.snapChatPixelID) {
                    throw new Error('No SnapChat Pixel ID was assigned');
                }
                const script = document.createElement('script');
                script.id = scriptID;
                script.innerHTML = `(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init', '${this.snapChatPixelID}', { 'user_email': '__INSERT_USER_EMAIL__' });snaptr('track', 'PAGE_VIEW');`;
                document.head.appendChild(script);
                script.insertAdjacentHTML('beforebegin', '<!-- Snap Pixel Code -->');
                script.insertAdjacentHTML('afterend', '<!-- End Snap Pixel Code -->');
            } catch (err) {
                console.error(err);
            }
        }
        constructor({ snapChatPixelID }){
            this._initialized = false;
            this.snapChatPixelID = snapChatPixelID;
        }
    };

    let TikTokPixel = class TikTokPixel {
        initialize() {
            const scriptID = 'snap-pixel';
            if (document.getElementById(scriptID) || this._initialized) {
                return;
            }
            try {
                if (!this.tiktokPixelID) {
                    throw new Error('No TikTok Pixel ID was assigned');
                }
                const script = document.createElement('script');
                script.id = scriptID;
                script.innerHTML = `!function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${this.tiktokPixelID}');ttq.page();}(window, document, 'ttq');`;
                document.head.appendChild(script);
                script.insertAdjacentHTML('beforebegin', '<!-- TikTok Pixel Code -->');
                script.insertAdjacentHTML('afterend', '<!-- End TikTok Pixel Code -->');
            } catch (err) {
                console.error(err);
            }
        }
        constructor({ tiktokPixelID }){
            this._initialized = false;
            this.tiktokPixelID = tiktokPixelID;
        }
    };

    function cookieWarning() {
        if (!this.gdprContainer) {
            return;
        }
        this.gdprContainer.innerHTML = `<div class="cookie-container ${this.alignPrompt} ${this.format}-format" lang="${document.documentElement.lang}"><div class="content"><div aria-describedby="cookie-warning-text" aria-labelledby="cookie-warning-text" aria-modal="false" role="dialog"><p class="h3" id="cookie-warning-text"></p></div><div class="button-wrapper"><button class="button gdpr customize" style="background-color:transparent"></button> <button class="button gdpr accept"></button></div></div></div>`;
        if (this.text) {
            this.setText(this.text);
        }
        const acceptAll = this.gdprContainer.querySelector('.accept');
        if (acceptAll instanceof HTMLButtonElement) {
            acceptAll.onclick = this.acceptAll;
        }
        const customize = this.gdprContainer.querySelector('.customize');
        if (customize instanceof HTMLButtonElement) {
            customize.onclick = ()=>this.setCustomize(true);
        }
    }

    var icon = `<svg xmlns="http://www.w3.org/2000/svg" width="992" height="1024" viewBox="0 0 992 1024"><path d="M810.112 4.992c-27.232 0-49.28 22.112-49.344 49.344 0 27.232 22.112 49.344 49.344 49.344s49.344-22.112 49.344-49.344c0-27.232-22.112-49.344-49.344-49.344zm13.184 429.728c-167.424 54.048-292.352-63.52-236.384-243.232-61.728-22.944-82.24-90.368-58.016-166.24C255.36 11.456 14.336 224.416.672 498.048c-13.792 273.536 196.896 506.432 470.368 520.32 273.6 13.792 506.528-196.896 520.32-470.464 1.248-24.736.672-49.184-1.664-73.088-69.952 43.008-123.84 23.52-166.432-40.032zm-575.52-35.392c40.992 0 74.176 33.248 74.176 74.176s-33.248 74.176-74.176 74.176c-40.992 0-74.176-33.248-74.176-74.176s33.248-74.176 74.176-74.176zm233.696 94.56c23.616 0 42.752 19.136 42.752 42.752s-19.136 42.752-42.752 42.752c-23.616 0-42.752-19.136-42.752-42.752-.096-23.616 19.072-42.752 42.752-42.752zM295.968 669.952c28.8 0 52.16 23.36 52.16 52.16s-23.36 52.16-52.16 52.16c-28.8 0-52.16-23.36-52.16-52.16 0-28.864 23.36-52.16 52.16-52.16zm112.384-399.008c22.624 0 40.832 18.304 40.832 40.832 0 22.624-18.304 40.832-40.832 40.832-22.624 0-40.832-18.304-40.832-40.832s18.304-40.832 40.832-40.832zm221.952 417.28c37.856 0 68.48 30.688 68.48 68.48 0 37.856-30.688 68.48-68.48 68.48-37.856 0-68.48-30.688-68.48-68.48s30.688-68.48 68.48-68.48zm144.224-492.608c25.408 0 46.048 20.64 46.048 46.048s-20.64 46.048-46.048 46.048-46.048-20.64-46.048-46.048 20.64-46.048 46.048-46.048z"/></svg>`;

    var loading = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor"><style>@keyframes spinner_zKoa{to{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,to{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g style="transform-origin:center;animation:spinner_zKoa 2s linear infinite"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" style="stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite"/></g></svg>`;

    function miniGDPR() {
        if (!this.gdprContainer) {
            return;
        }
        this.gdprContainer.innerHTML = `<button class="mini-gdpr ${this.alignMiniPrompt}" data-hide="false" aria-label="${this.text?.miniGDPR || 'Cookie settings'}"><figure class="icon-cookies settings">${icon}</figure></button>`;
        const button = this.gdprContainer.querySelector('.mini-gdpr');
        if (button instanceof HTMLButtonElement) {
            button.onclick = this.setVisible;
        }
    }

    function uiButton({ className, isOpen }) {
        return `<button class="menu-button ${className}" data-open="${isOpen}"><span class="hamburger"><span></span></span></button>`;
    }

    function popUp() {
        if (!this.gdprContainer) {
            return;
        }
        this.gdprContainer.innerHTML = `<div class="pop-up fadeIn" lang="${document.documentElement.lang}"><dialog open>${uiButton({
        className: 'close-button',
        isOpen: true
    })}<div class="dialog-inner-box" style="display:flex;flex-direction:column"><h3><figure aria-label="cookies" class="icon-cookies" style="display:inline-flex;margin-right:.5em">${icon}</figure><slot id="customize-header"></slot></h3><p id="customize-text"></p><p id="customize-link"></p><div id="save-wrapper" class="button-wrapper"><button class="button gdpr decline-all" style="background-color:transparent"></button> <button class="button gdpr accept-all"></button></div><div class="button-wrapper">${this.switchButton({
        label: this.text?.functional.label,
        name: 'functional',
        value: true,
        disabled: true
    })} ${this.switchButton({
        label: this.text?.statistical.label,
        name: 'allowStatistical',
        value: !!this.allowStatistical
    })} ${this.hasRetargeting ? this.switchButton({
        label: this.text?.marketing.label,
        name: 'allowRetargeting',
        value: !!this.allowRetargeting
    }) : ''}</div></div></dialog></div>`;
        this.setText(this.text);
        const saveWrapper = this.gdprContainer.querySelector('#save-wrapper'), saveButton = document.createElement('button');
        saveButton.innerText = this.text?.save ?? 'Save preferences';
        saveButton.className = 'button gdpr save';
        saveButton.onclick = ()=>{
            this.save();
            this.isCustomize = false;
            this.isVisible = false;
        };
        const statistical = this.gdprContainer.querySelector('[name="allowStatistical"]');
        if (statistical instanceof HTMLInputElement) {
            statistical.onchange = (e)=>{
                saveWrapper?.replaceChildren(saveButton);
                this.handleChange(e, this);
            };
        }
        const retargeting = this.gdprContainer.querySelector('[name="allowRetargeting"]');
        if (retargeting instanceof HTMLInputElement) {
            retargeting.onchange = (e)=>{
                saveWrapper?.replaceChildren(saveButton);
                this.handleChange(e, this);
            };
        }
        const acceptAll = this.gdprContainer.querySelector('.accept-all');
        if (acceptAll instanceof HTMLButtonElement) {
            acceptAll.onclick = this.acceptAll;
        }
        const declineAll = this.gdprContainer.querySelector('.decline-all');
        if (declineAll instanceof HTMLButtonElement) {
            declineAll.onclick = this.declineAll;
        }
        const closeButton = this.gdprContainer.querySelector('.close-button');
        if (closeButton instanceof HTMLButtonElement) {
            closeButton.onclick = ()=>this.setCustomize(false);
        }
        setTimeout(()=>{
            const dialog = this.gdprContainer?.querySelector('dialog'), dialogInner = this.gdprContainer?.querySelector('.dialog-inner-box');
            if (!(dialog instanceof HTMLDialogElement) || !(dialogInner instanceof HTMLElement)) {
                return;
            }
            const height = `${(dialogInner.offsetHeight ?? 0) + 80}px`;
            Object.assign(dialog.style, {
                minHeight: height,
                maxHeight: height
            });
        }, 10);
    }

    var Align;
    (function(Align) {
        Align["BottomLeft"] = "bottom-left";
        Align["BottomRight"] = "bottom-right";
        Align["TopLeft"] = "top-left";
        Align["TopRight"] = "top-right";
    })(Align || (Align = {}));
    var Format;
    (function(Format) {
        Format["Banner"] = "banner";
        Format["Box"] = "box";
    })(Format || (Format = {}));
    const boolToConsentParams = (bool)=>{
        if (bool === undefined || bool === null) {
            return undefined;
        }
        return bool ? 'granted' : 'denied';
    }, consentParamsToBool = (param)=>{
        if (param === undefined || param === null) {
            return null;
        }
        return param === 'granted';
    }, getConsent = ()=>{
        const cookie = api.get('CookieConsent');
        if (cookie) {
            return JSON.parse(decodeURIComponent(cookie));
        }
        return {
            functionality_storage: 'granted',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_storage: 'denied',
            ad_personalization: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
        };
    }, isServer = ()=>!(typeof window !== 'undefined' && window.document), useId = (prefix)=>{
        const s4 = ()=>((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        return `${prefix ?? `:${s4()}`}-${s4()}`;
    };

    function switchButton({ disabled = false, name, label, value }) {
        const id = useId();
        return `<div class="container">${label ? `<label class="textLabel" for="${id}">${label}</label>` : ''} <label class="label"><input ${value ? 'checked' : ''} class="input" ${disabled ? 'disabled' : ''} id="${id}" name="${name}" type="checkbox" value="${value}"> <span class="slider"></span></label></div>`;
    }

    var css_248z = "\n  @keyframes fadeInUp {\n    0% {\n      transform: translateY(1em);\n      opacity: 0;\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  }\n  @keyframes fadeInDown {\n    0% {\n      transform: translateY(-1em);\n      opacity: 0;\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  }\n  @keyframes popInBottomLeft {\n    0% {\n      transform: translateY(100%) translateX(-100%);\n    }\n    100% {\n      transform: translate(0);\n    }\n  }\n  @keyframes popInBottomRight {\n    0% {\n      transform: translateY(100%) translateX(100%);\n    }\n    100% {\n      transform: translate(0);\n    }\n  }\n  @keyframes popInTopLeft {\n    0% {\n      transform: translateY(-100%) translateX(-100%);\n    }\n    100% {\n      transform: translate(0);\n    }\n  }\n  @keyframes popInTopRight {\n    0% {\n      transform: translateY(-100%) translateX(100%);\n    }\n    100% {\n      transform: translate(0);\n    }\n  }\n  @keyframes fadeIn {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes fadeUp {\n    0% {\n      opacity: 0;\n      transform: translateY(0);\n    }\n    100% {\n      opacity: 1;\n      transform: translateY(-50%);\n    }\n  }:host {\n    font-family: var(--font-family);\n    font-size: 16px;\n    color: var(--color);\n    line-height: 1.3em;\n    display: block;\n    width: 100%;\n    height: 100%;\n    cursor: default;\n  }:host *::selection {\n    background-color: var(--color);\n    color: var(--background-color);\n  }:host .cookie-overlay {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 99999;\n    background-color: rgba(0, 0, 0, 0.3);\n    -webkit-backdrop-filter: blur(2px);\n            backdrop-filter: blur(2px);\n  }:host #cookie-warning-text {\n    margin: 0;\n  }:host .cookie-container {\n    padding: 20px 30px;\n    transform-origin: bottom;\n    align-items: center;\n    display: flex;\n    position: fixed;\n    z-index: 999999;\n    background-color: var(--background-color);\n  }:host .cookie-container.bottom-left, :host .cookie-container.bottom-right {\n    animation: fadeInUp 0.3s ease-in-out;\n  }:host .cookie-container.top-left, :host .cookie-container.top-right {\n    animation: fadeInDown 0.3s ease-in-out;\n  }:host .cookie-container.box-format {\n    flex-direction: column;\n    border: solid var(--border-width) currentColor;\n    border-radius: 0.25em;\n  }:host .cookie-container.box-format.bottom-left {\n    left: 30px;\n    bottom: 30px;\n  }:host .cookie-container.box-format.bottom-right {\n    right: 30px;\n    bottom: 30px;\n  }:host .cookie-container.box-format.top-left {\n    left: 30px;\n    top: 30px;\n  }:host .cookie-container.box-format.top-right {\n    right: 30px;\n    top: 30px;\n  }:host .cookie-container.box-format .content {\n    flex-direction: column;\n  }:host .cookie-container.banner-format {\n    flex-direction: row;\n    left: 0;\n    right: 0;\n  }:host .cookie-container.banner-format.bottom-left, :host .cookie-container.banner-format.bottom-right {\n    bottom: 0;\n    border-top: solid var(--border-width) currentColor;\n  }:host .cookie-container.banner-format.top-left, :host .cookie-container.banner-format.top-right {\n    top: 0;\n    border-bottom: solid var(--border-width) currentColor;\n  }:host .cookie-container.banner-format .content {\n    flex-direction: row;\n    justify-content: space-between;\n    width: 100%;\n  }:host .cookie-container .content {\n    display: flex;\n    align-items: center;\n    margin: 0;\n    font-size: 0.9em;\n    gap: 1em;\n  }:host .button {\n    border: solid var(--border-width);\n    font-size: 0.9em;\n    line-height: 0.9em;\n    font-weight: bold;\n    padding: 10px 15px;\n    margin: 0;\n    border-radius: 1.5em;\n    border-color: currentColor;\n    display: inline-flex;\n    align-items: center;\n  }:host .button-wrapper {\n    display: flex;\n    gap: 0.5em;\n  }:host .mini-gdpr {\n    position: fixed;\n    width: 40px;\n    height: 40px;\n    z-index: 99999;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 0.2s ease-in-out;\n  }:host .mini-gdpr.bottom-left, :host .mini-gdpr.bottom-right {\n    bottom: 0;\n    border-top: solid var(--border-width);\n  }:host .mini-gdpr.top-left, :host .mini-gdpr.top-right {\n    top: 0;\n    border-bottom: solid var(--border-width);\n  }:host .mini-gdpr.bottom-left, :host .mini-gdpr.top-left {\n    left: 0;\n    border-right: solid var(--border-width);\n  }:host .mini-gdpr.bottom-right, :host .mini-gdpr.top-right {\n    right: 0;\n    border-left: solid var(--border-width);\n  }:host .mini-gdpr.bottom-left {\n    border-radius: 0 66% 0 0;\n    transform-origin: bottom left;\n    animation: popInBottomLeft 0.3s ease-in-out;\n  }:host .mini-gdpr.bottom-left[data-hide=true] {\n    transform: translateY(100%) translateX(-100%);\n  }:host .mini-gdpr.bottom-right {\n    border-radius: 66% 0 0 0;\n    transform-origin: bottom right;\n    animation: popInBottomRight 0.3s ease-in-out;\n  }:host .mini-gdpr.bottom-right[data-hide=true] {\n    transform: translateY(100%) translateX(100%);\n  }:host .mini-gdpr.top-left {\n    border-radius: 0 0 66% 0;\n    transform-origin: top left;\n    animation: popInTopLeft 0.3s ease-in-out;\n  }:host .mini-gdpr.top-left[data-hide=true] {\n    transform: translateY(-100%) translateX(-100%);\n  }:host .mini-gdpr.top-right {\n    border-radius: 0 0 0 66%;\n    transform-origin: top right;\n    animation: popInTopRight 0.3s ease-in-out;\n  }:host .mini-gdpr.top-right[data-hide=true] {\n    transform: translateY(-100%) translateX(100%);\n  }:host .mini-gdpr svg {\n    height: 1em;\n  }:host .mini-gdpr:hover, :host .mini-gdpr:active {\n    transform: scale(1.1);\n  }@media only screen and (max-width: 760px) {\n    :host .cookie-container {\n      padding: 15px;\n    }\n    :host .cookie-container.box-format {\n      left: 20px;\n      right: 20px;\n    }\n    :host .cookie-container.banner-format .content {\n      flex-direction: column;\n    }\n    :host .cookie-container.banner-format.top-left, :host .cookie-container.banner-format.top-right {\n      padding-bottom: 10px;\n    }\n    :host .cookie-container.banner-format.bottom-left, :host .cookie-container.banner-format.bottom-right {\n      padding-top: 10px;\n    }\n  }:host .pop-up {\n    position: fixed;\n    width: 100vw;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    z-index: 999999;\n    animation-duration: 0.4s;\n    animation-name: fadeIn;\n    background-color: rgba(0, 0, 0, 0.3);\n  }:host .pop-up dialog {\n    position: absolute;\n    width: 600px;\n    height: 90%;\n    max-width: 90%;\n    min-height: 0;\n    max-height: 0;\n    border-radius: 0.25em;\n    border: solid var(--border-width);\n    left: 0;\n    right: 0;\n    margin: auto;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 40px;\n    overflow: hidden;\n    transition: max-height 0.2s ease-in-out, min-height 0.2s ease-in-out;\n    width: 600px;\n    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n    color: var(--color);\n    background-color: var(--background-color);\n  }:host .pop-up dialog .close-button {\n    top: 14px;\n    right: 14px;\n    width: 25px;\n  }:host .pop-up dialog[data-animate=up] {\n    animation: fadeUp 0.3s ease-in-out;\n  }:host .pop-up[data-gallery=true] dialog {\n    padding: 0;\n  }:host .inner-wrapper {\n    width: 100%;\n    float: left;\n    position: relative;\n    display: flex;\n    align-items: center;\n    overflow: hidden;\n  }:host .row {\n    display: flex;\n    flex-direction: row;\n    gap: 1em;\n    align-items: flex-start;\n    margin: 0;\n  }:host .column {\n    display: flex;\n    flex: 1 1;\n    flex-direction: column;\n    align-items: flex-start;\n  }@media only screen and (max-width: 760px) {\n    :host .pop-up .pop-up-element {\n      padding: 25px;\n    }\n    :host .pop-up .pop-up-element .close-button {\n      width: 20px;\n      top: 5px;\n      right: 5px;\n    }\n    :host .row {\n      overflow-x: auto;\n      overflow-y: hidden;\n      scroll-snap-points-x: repeat(100%);\n      scroll-snap-type: x mandatory;\n      flex: 1 1;\n      -webkit-overflow-scrolling: touch;\n      scrollbar-width: none;\n    }\n    :host .row::-webkit-scrollbar {\n      display: none;\n    }\n    :host .column {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      flex: 0 0 100%;\n      scroll-snap-align: start;\n    }\n  }:host .container {\n    display: inline-flex;\n    flex-direction: column;\n    margin-right: 0.5em;\n    margin-top: 0.5em;\n    font-size: 0.9em;\n  }:host .textLabel {\n    margin-bottom: 0.5em;\n  }:host .label {\n    position: relative;\n    display: inline-block;\n    width: 3em;\n    height: 1.5em;\n  }:host .label .input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n  }:host .slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    transition: 0.4s;\n    border-radius: 1em;\n    border: solid var(--border-width);\n    appearance: none;\n    transition: background-color 0.2s;\n  }:host .slider::before {\n    position: absolute;\n    border-radius: 50%;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 0.2em;\n    bottom: 0;\n    top: 0;\n    margin: auto;\n    background-color: currentColor;\n    transition: 0.4s;\n  }:host .input:focus + .slider {\n    box-shadow: 0 0 1px;\n  }:host .input:checked + .slider {\n    background-color: var(--accent-color);\n  }:host .input:checked + .slider:before {\n    transform: translateX(1.4em);\n  }:host .input:disabled + .slider {\n    opacity: 0.5;\n  }:host .menu-button {\n    position: absolute;\n    width: 40px;\n    max-width: 100%;\n    padding: 0;\n    margin: 0;\n    line-height: 0;\n    z-index: 999;\n    cursor: pointer;\n    transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;\n    background-color: transparent;\n    display: block;\n    border-color: unset;\n    outline-color: unset;\n  }:host .menu-button .hamburger {\n    width: 100%;\n    display: inline-block;\n    vertical-align: middle;\n  }:host .menu-button .hamburger::before,\n  :host .menu-button .hamburger > span,\n  :host .menu-button .hamburger::after {\n    background-color: currentColor;\n    border-color: currentColor;\n    outline-color: currentColor;\n    display: block;\n    height: 2px;\n    margin: 10px 0;\n    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease-in-out;\n  }:host .menu-button .hamburger::before, :host .menu-button .hamburger::after {\n    content: \"\";\n  }:host .menu-button .hamburger::before {\n    margin-top: 0;\n  }:host .menu-button .hamburger::after {\n    margin-bottom: 0;\n  }:host .menu-button[data-open=true] .hamburger::before {\n    transform: translateY(12px) rotate(135deg);\n  }:host .menu-button[data-open=true] .hamburger > span {\n    transform: translateY(0) rotate(-135deg);\n    opacity: 0;\n  }:host .menu-button[data-open=true] .hamburger::after {\n    transform: translateY(-12px) rotate(-135deg);\n  }:host * {\n    box-sizing: border-box;\n  }:host input,\n  :host textarea,\n  :host button {\n    color: inherit;\n    font-size: inherit;\n    font-family: inherit;\n    font-weight: inherit;\n    border: 0;\n    outline: 0;\n    background-color: transparent;\n  }:host button,\n  :host input[type=submit],\n  :host input[type=button],\n  :host input[type=reset] {\n    appearance: none;\n  }:host button *,\n  :host input[type=submit] *,\n  :host input[type=button] *,\n  :host input[type=reset] * {\n    pointer-events: none;\n  }:host button:not([disabled]),\n  :host input[type=submit]:not([disabled]),\n  :host input[type=button]:not([disabled]),\n  :host input[type=reset]:not([disabled]) {\n    cursor: pointer;\n  }:host button {\n    background-color: var(--accent-color);\n    transition: transform 0.2s ease-in-out;\n  }:host button:hover {\n    transform: scale(1.02);\n  }:host a {\n    color: inherit;\n    font-weight: bold;\n    text-decoration: none;\n    position: relative;\n  }:host a::after {\n    content: \"\";\n    border-bottom: solid var(--border-width) var(--accent-color);\n    position: absolute;\n    width: 100%;\n    bottom: 0;\n    left: 0;\n    z-index: -1;\n  }:host a:hover:after {\n    opacity: 0;\n  }:host svg {\n    width: auto;\n    height: auto;\n    display: inline-block;\n  }:host svg path {\n    fill: currentColor;\n  }:host p {\n    margin: 0;\n    padding: 0.5em 0 0.7em;\n  }:host h1,\n  :host .h1,\n  :host h2,\n  :host .h2,\n  :host h3,\n  :host .h3 {\n    font-weight: bold;\n    font-size: 2.2em;\n    padding: 0;\n    margin: 0;\n    margin-top: 0.5em;\n  }:host h2,\n  :host .h2 {\n    font-size: 1.7em;\n  }:host h3,\n  :host .h3 {\n    font-size: 1.5em;\n  }:host h3 svg,\n  :host .h3 svg {\n    height: 1.2em;\n    display: inline-block;\n    vertical-align: bottom;\n  }:host .icon-cookies {\n    display: flex;\n    margin: 0;\n    padding: 0;\n  }";

    const UPDATE_ON_CONNECTED = Symbol('UPDATE_ON_CONNECTED');
    if (isServer()) {
        global.HTMLElement = class EmptyHTMLElement {
        };
    }
    let EnhancedElement = class EnhancedElement extends HTMLElement {
        connectedCallback() {
            let arr = [];
            if (UPDATE_ON_CONNECTED in this && Array.isArray(this[UPDATE_ON_CONNECTED])) {
                arr = this[UPDATE_ON_CONNECTED];
            }
            for (const propName of arr){
                if (!('propertyChangedCallback' in this) || typeof this.propertyChangedCallback !== 'function') {
                    continue;
                }
                if (propName in this) {
                    this.propertyChangedCallback(propName, undefined, this[propName]);
                }
            }
        }
        constructor(){
            super();
            const { observedProperties = [] } = this.constructor;
            if (UPDATE_ON_CONNECTED in this) {
                this[UPDATE_ON_CONNECTED] = [];
            }
            if ('propertyChangedCallback' in this && typeof this.propertyChangedCallback === 'function') {
                for (const propName of observedProperties){
                    const initialValue = this[propName], CACHED_VALUE = Symbol(propName);
                    this[CACHED_VALUE] = initialValue;
                    Object.defineProperty(this, propName, {
                        get () {
                            return this[CACHED_VALUE];
                        },
                        set (value) {
                            const oldValue = this[CACHED_VALUE];
                            this[CACHED_VALUE] = value;
                            this.propertyChangedCallback(propName, oldValue, value);
                        }
                    });
                    if (typeof initialValue !== 'undefined') {
                        if (UPDATE_ON_CONNECTED in this && Array.isArray(this[UPDATE_ON_CONNECTED])) {
                            this[UPDATE_ON_CONNECTED].push(propName);
                        }
                    }
                }
            }
        }
    };

    class AMGDPR extends EnhancedElement {
        connectedCallback() {
            super.connectedCallback();
            this.render();
            this._addEventListeners();
            this.allowStatistical = consentParamsToBool(getConsent().analytics_storage);
            this.allowRetargeting = consentParamsToBool(getConsent().ad_storage);
            this.gdprContainer = this.shadow.querySelector('#gdpr-container');
            if (!this.isCustomize && !this.allowStatistical && this.allowStatistical !== false || !!this.isVisible || !api.get('CookieConsent')) {
                this._cookieWarning();
            } else if (this.isCustomize) {
                this._popUp();
            } else {
                this._miniGDPR();
            }
            this.text = getTranslation();
            if (this.googleID?.startsWith('GTM-')) {
                this._gtm = new GTM({
                    gtmId: this.googleID,
                    consentParams: getConsent()
                });
                this.hasRetargeting = true;
            } else if (this.googleID?.startsWith('G-')) {
                this._gTag = new GTag({
                    googleID: this.googleID,
                    consentParams: getConsent()
                });
                if (this.metaPixelID) {
                    this._meta = new MetaPixel({
                        metaPixelID: this.metaPixelID,
                        locale: navigator.language
                    });
                    this.hasRetargeting = true;
                }
                if (this.snapChatPixelID) {
                    this._snapChat = new SnapChatPixel({
                        snapChatPixelID: this.snapChatPixelID
                    });
                    this.hasRetargeting = true;
                }
                if (this.tiktokPixelID) {
                    this._tikTok = new TikTokPixel({
                        tiktokPixelID: this.tiktokPixelID
                    });
                    this.hasRetargeting = true;
                }
            }
            this._gtm?.initialize();
            this._gTag?.initialize();
            if (this.allowRetargeting) {
                this._meta?.initialize();
                this._snapChat?.initialize();
                this._tikTok?.initialize();
            }
            if (!this._gtm && !this._gTag && !this._meta && !this._snapChat && !this._tikTok) {
                console.warn('No tracking is enabled');
            }
            if (this._gtm && (this._meta || this._snapChat || this._tikTok)) {
                console.warn('Consider moving tags into Google Tag Manager');
            }
            window.addGDPRConsent = (callback)=>{
                this._consentListeners.push(callback);
            };
            const sheet = this.shadowRoot?.adoptedStyleSheets[0];
            setTimeout(()=>{
                sheet?.insertRule(`:host{--border-width: ${this.borderWidth}px;--font-family: ${this.fontFamily};--color: ${this.color};--background-color: ${this.backgroundColor};--accent-color: ${this.accentColor};}`);
            }, 0);
            this.debug();
        }
        disconnectedCallback() {
            this._removeEventListeners();
        }
        static get observedProperties() {
            return [
                'allowStatistical',
                'allowRetargeting',
                'isVisible',
                'isCustomize',
                'isSaving'
            ];
        }
        propertyChangedCallback(name, _oldValue, value) {
            if (!this.shadow || !this.gdprContainer) {
                return;
            }
            switch(name){
                case 'isCustomize':
                    {
                        if (value) {
                            this._popUp();
                        }
                        break;
                    }
                case 'isSaving':
                    {
                        const button = this.gdprContainer.querySelector('.accept-all');
                        if (value && button instanceof HTMLButtonElement) {
                            button.innerHTML = loading;
                        }
                        break;
                    }
                case 'allowStatistical':
                    {
                        const input = this.gdprContainer.querySelector('[name="allowStatistical"]');
                        if (input instanceof HTMLInputElement) {
                            input.checked = !!value;
                        }
                        break;
                    }
                case 'allowRetargeting':
                    {
                        const input = this.gdprContainer.querySelector('[name="allowRetargeting"]');
                        if (input instanceof HTMLInputElement) {
                            input.checked = !!value;
                        }
                        break;
                    }
                case 'isVisible':
                    {
                        if (this.isCustomize) {
                            break;
                        }
                        if (value) {
                            this._cookieWarning();
                        } else {
                            this._miniGDPR();
                        }
                        break;
                    }
            }
        }
        set googleID(value) {
            this.setAttribute('googleID', value || '');
        }
        get googleID() {
            return this.getAttribute('googleID');
        }
        set metaPixelID(value) {
            this.setAttribute('metaPixelID', value || '');
        }
        get metaPixelID() {
            return this.getAttribute('metaPixelID');
        }
        set snapChatPixelID(value) {
            this.setAttribute('snapChatPixelID', value || '');
        }
        get snapChatPixelID() {
            return this.getAttribute('snapChatPixelID');
        }
        set tiktokPixelID(value) {
            this.setAttribute('tiktokPixelID', value || '');
        }
        get tiktokPixelID() {
            return this.getAttribute('tiktokPixelID');
        }
        set color(value) {
            this.setAttribute('color', value);
        }
        get color() {
            return this.getAttribute('color') || '#000';
        }
        set backgroundColor(value) {
            this.setAttribute('backgroundColor', value);
        }
        get backgroundColor() {
            return this.getAttribute('backgroundColor') || '#FFF';
        }
        set accentColor(value) {
            this.setAttribute('accentColor', value);
        }
        get accentColor() {
            return this.getAttribute('accentColor') || '#FFF';
        }
        set fontFamily(value) {
            this.setAttribute('fontFamily', value);
        }
        get fontFamily() {
            return this.getAttribute('fontFamily') || '"Helvetica Neue", Helvetica, sans-serif';
        }
        set borderWidth(value) {
            this.setAttribute('borderWidth', value.toString());
        }
        get borderWidth() {
            return Number(this.getAttribute('borderWidth') ?? 2);
        }
        set alignPrompt(value) {
            this.setAttribute('alignPrompt', value);
        }
        get alignPrompt() {
            const value = this.getAttribute('alignPrompt');
            if (value && Object.values(Align).includes(value)) {
                return value;
            }
            return Align.BottomLeft;
        }
        set alignMiniPrompt(value) {
            this.setAttribute('alignMiniPrompt', value);
        }
        get alignMiniPrompt() {
            const value = this.getAttribute('alignMiniPrompt');
            if (value && Object.values(Align).includes(value)) {
                return value;
            }
            return Align.BottomLeft;
        }
        set format(value) {
            this.setAttribute('format', value);
        }
        get format() {
            const value = this.getAttribute('format');
            if (value && Object.values(Format).includes(value)) {
                return value;
            }
            return Format.Box;
        }
        set text(value) {
            this.setText(value);
            this.setAttribute('text', JSON.stringify(value));
        }
        get text() {
            const value = JSON.parse(this.getAttribute('text') || 'null');
            return value;
        }
        set privacyPolicyURL(value) {
            this.setAttribute('privacyPolicyURL', value || 'privacy');
        }
        get privacyPolicyURL() {
            return this.getAttribute('privacyPolicyURL');
        }
        save() {
            const consent = {
                functionality_storage: 'granted',
                analytics_storage: boolToConsentParams(this.allowStatistical),
                ad_user_data: boolToConsentParams(this.allowStatistical),
                ad_storage: boolToConsentParams(this.allowRetargeting),
                ad_personalization: boolToConsentParams(this.allowRetargeting),
                personalization_storage: boolToConsentParams(this.allowRetargeting),
                security_storage: 'granted'
            };
            api.set('CookieConsent', encodeURIComponent(JSON.stringify(consent)), {
                sameSite: 'Lax',
                expires: 365,
                secure: process.env.NODE_ENV !== 'development'
            });
            this._gtm?.updateConsent({
                consentParams: getConsent()
            });
            this._gTag?.updateConsent({
                consentParams: getConsent()
            });
            if (this.allowRetargeting) {
                this._meta?.initialize();
                this._snapChat?.initialize();
                this._tikTok?.initialize();
            }
            for (const callback of this._consentListeners){
                callback(consent);
            }
        }
        acceptAll() {
            const prev = {
                statistical: this.allowStatistical,
                retargeting: this.hasRetargeting ? this.allowRetargeting : false
            };
            this.allowStatistical = true;
            this.allowRetargeting = this.hasRetargeting;
            this.isSaving = true;
            setTimeout(()=>{
                this.isCustomize = false;
                this.isVisible = false;
                this.isSaving = false;
            }, this.isCustomize && (!prev.statistical || !prev.retargeting) ? 800 : 0);
            if (!window.dataLayer || !window.google_tag_data) {
                this._gtm?.initialize();
                this._gTag?.initialize();
            }
            this.save();
            this.debug();
        }
        declineAll() {
            this.isCustomize = false;
            this.isVisible = false;
            this.allowStatistical = false;
            this.allowRetargeting = false;
            this.debug();
            if (!!window.dataLayer || !!window.google_tag_data) {
                location.reload();
            }
            this.save();
        }
        esc({ key }) {
            if (this.isCustomize && key === 'Escape') {
                this.setCustomize(false);
            }
        }
        setCustomize(value) {
            this.isCustomize = !!value;
            this.isVisible = !value;
            this.allowStatistical = !!this.allowStatistical;
            this.allowRetargeting = !!this.allowRetargeting;
            this.debug();
        }
        handleChange({ target }, component) {
            if (target instanceof HTMLInputElement) {
                const { checked, name } = target;
                if (name in component) {
                    component[name] = checked;
                }
            }
            this.debug();
        }
        setVisible() {
            api.remove('CookieConsent');
            this.allowStatistical = null;
            this.allowRetargeting = null;
            this.isVisible = true;
            this.debug();
        }
        hideOnScroll() {
            const bcr = document.body.getBoundingClientRect(), mini = this.gdprContainer?.querySelector('.mini-gdpr');
            if (!(mini instanceof HTMLButtonElement)) {
                return;
            }
            mini.dataset.hide = (bcr.top < this._scrollPos && bcr.top < -20).toString();
            this._scrollPos = bcr.top;
        }
        setText(text) {
            if (!text) {
                return;
            }
            const cookieWarningText = this.shadow.querySelector('#cookie-warning-text');
            if (cookieWarningText) {
                cookieWarningText.innerHTML = `${text.header} ${icon}`;
            }
            const customizeLabel = this.shadow.querySelector('.customize');
            if (customizeLabel instanceof HTMLButtonElement) {
                customizeLabel.ariaLabel = text.customize.label;
                customizeLabel.innerText = text.customize.label;
            }
            const accept = this.shadow.querySelector('.accept');
            if (accept instanceof HTMLButtonElement) {
                accept.ariaLabel = text.accept;
                accept.innerText = text.accept;
            }
            const acceptAll = this.shadow.querySelector('.accept-all');
            if (acceptAll instanceof HTMLButtonElement) {
                acceptAll.ariaLabel = text.acceptAll;
                acceptAll.innerText = text.acceptAll;
            }
            const settings = this.shadow.querySelector('.settings');
            if (settings instanceof HTMLElement) {
                settings.ariaLabel = text.settings;
            }
            const decline = this.shadow.querySelector('.decline-all');
            if (decline instanceof HTMLButtonElement) {
                decline.ariaLabel = text.decline;
                decline.innerText = text.decline;
            }
            const customizeHeader = this.shadow.querySelector('#customize-header');
            if (customizeHeader instanceof HTMLSlotElement) {
                customizeHeader.innerText = text.customize.header;
            }
            const customizeText = this.shadow.querySelector('#customize-text');
            if (customizeText instanceof HTMLElement) {
                customizeText.innerHTML = `${text.customize.text}${this.hasRetargeting ? ` ${text.customize.retargeting}` : ''}`;
            }
            const customizeLink = this.shadow.querySelector('#customize-link');
            if (customizeLink instanceof HTMLElement) {
                customizeLink.innerHTML = text.customize.link.replace('%URL%', this.privacyPolicyURL || text.policyUrl);
            }
            const miniGDPR = this.shadow.querySelector('.mini-gdpr');
            if (miniGDPR instanceof HTMLButtonElement) {
                miniGDPR.ariaLabel = text.miniGDPR;
            }
        }
        _addEventListeners() {
            document.addEventListener('keydown', this.esc, {
                passive: true,
                capture: true
            });
            document.addEventListener('scroll', this.hideOnScroll, {
                passive: true,
                capture: true
            });
        }
        _removeEventListeners() {
            document.removeEventListener('keydown', this.esc);
            document.removeEventListener('scroll', this.hideOnScroll);
        }
        static get styles() {
            const styleSheet = new CSSStyleSheet();
            styleSheet.replace(css_248z);
            return styleSheet;
        }
        debug() {
            if (process.env.NODE_ENV !== 'development') {
                return;
            }
            console.debug({
                googleID: this.googleID,
                customize: this.isCustomize,
                statistical: this.allowStatistical,
                retargeting: this.allowRetargeting,
                visible: this.isVisible
            }, this._gtm || this._gTag);
        }
        render() {
            this.template.innerHTML = '<slot id="gdpr-container"></slot>';
            this.shadow.adoptedStyleSheets = [
                AMGDPR.styles
            ];
            this.shadow.appendChild(this.template.content.cloneNode(true));
        }
        constructor(){
            super(), this.allowStatistical = null, this.allowRetargeting = null, this.isVisible = false, this.isCustomize = null, this.isSaving = false, this._scrollPos = 0, this._consentListeners = [], this.hasRetargeting = false, this._popUp = popUp, this._cookieWarning = cookieWarning, this._miniGDPR = miniGDPR, this.switchButton = switchButton;
            this.acceptAll = this.acceptAll.bind(this);
            this.declineAll = this.declineAll.bind(this);
            this.esc = this.esc.bind(this);
            this.hideOnScroll = this.hideOnScroll.bind(this);
            this.setVisible = this.setVisible.bind(this);
            this.template = document.createElement('template');
            this.shadow = this.attachShadow({
                mode: 'open'
            });
        }
    }

    const tagName = 'am-gdpr';
    if (!isServer()) {
        customElements.define('am-gdpr', AMGDPR);
    }

    exports.default = AMGDPR;
    exports.tagName = tagName;

    Object.defineProperty(exports, '__esModule', { value: true });

})(this["am-gdpr"] = this["am-gdpr"] || {});
