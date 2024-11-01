=== AM Cookies ===
Contributors: johanaarstein
Donate link: https://www.paypal.com/donate/?hosted_button_id=E7C7DMN8KSQ6A
Author URI: https://www.aarstein.media
Plugin URI: https://wordpress.org/plugins/am-cookies/
Tags: gdpr, cookies, analytics, retargetting, tracking
Requires at least: 5.9
Tested up to: 6.6
Requires PHP: 7.0
Stable Tag: 1.2.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Simple and versatile GDPR compatible Cookie Compliance Plugin for WordPress.

== Description ==

AM Cookies for WordPress is easy to use, lightweight, and gives your visitors total control over what data they want to share with you.

This plugin utilizes our own open source web component, `am-gpdr`, which is publicly available here: https://github.com/aarsteinmedia/am-gdpr.

The purpose of this plugin is to give visitors to your website control over how their data is collected by third-party services such as Google, Meta, Snapchat, or TikTok. To use the plugin, simply input your tracking ID or pixel ID from any of these services – no coding is required. Our codebase includes links to sites like googletagmanager.com, gtm.com, facebook.net, sc-static.net, and tiktok.com, but none of these scripts are activated unless you choose to do so. When activated they will only collect data as per your configuration and with user consent. We do not collect any data through this plugin.

= Features =

- Loads tracking codes automatically – no need to manually add any code
- Customizable layout
- Customizable fonts and colors
- Customizable text content
- Front-end script ~40 kB

== Installation ==

= Automatic installation =

Automatic installation is the easiest option — WordPress will handle the file transfer, and you won’t need to leave your web browser.

1. Log in to your WordPress dashboard
2. Navigate to the **Plugins** menu
3. Search for **AM Cookies**
4. Click **Install Now** and WordPress will take it from there
5. Activate the plugin through the **Plugins** menu in WordPress

= Manual installation =

1. Upload the entire 'am-cookies' folder to your plugins directory
2. Activate the plugin through the **Plugins** menu in WordPress

= After activation =

1. Go to the AM Cookies for WordPress admin panel
2. Add one or multiple tracking IDs
3. Click save.

== Feedback ==

We'd love to [hear from you](mailto:johan@aarstein.media)!

== Changelog ==

= 1.2.2 - October 30 2024 =
* More efficient options handling
* Moved uninstall hook inside admin

= 1.2.1 - October 30 2024 =
* Better error handling

= 1.2.0 - October 29 2024 =
* Migrated to namespaces

= 1.1.0 - October 25 2024 =
* More efficient handling of properties
* Added languages

= 1.0.2 - October 20 2024 =
* Expanded browser compability
* Minor bugfixes
* Minor stylistic changes