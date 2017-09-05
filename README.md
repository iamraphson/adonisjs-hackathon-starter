**Live Demo**: http://adonisjs-hackathonstarter.herokuapp.com/

A boilerplate for **AdonisJS 4.0** web applications.

If you have attended any hackathons in the past, then you know how much time it takes to
get a project started: decide on what to build, pick a programming language, pick a web framework,
pick a CSS framework. A while later, you might have an initial project up on GitHub and only then
can other team members start contributing. Or how about doing something as simple as *Sign in with Facebook*
authentication? You can spend hours on it if you are not familiar with how OAuth 2.0 works.

When I started this project using *AdonisJs*, my primary focus was on **simplicity** and **ease of use** and also integrate as many API as Possible.
I also tried to make it as **generic** and **reusable** as possible to cover most use cases of hackathon web apps,
without being too specific. In the worst case you can use this as a learning guide for your projects,
if for example you are only interested in **Sign in with Google** authentication and nothing else.

AdonisJS Hackathon Starter is a boilerplate application developed with AdonisJS 4.0 to keep you ahead in hackathons.

AdonisJS is a free, open-source Node.js web framework, created by Aman Virk and intended for the development of web applications following the model–view–controller (MVC) architectural pattern

<h4 align="center">Home Example</h4>

![](https://user-images.githubusercontent.com/3502724/29689780-5a64de42-891c-11e7-8650-4c0e6e926189.png)

<h4 align="center">Login Example</h4>

![](https://user-images.githubusercontent.com/3502724/29689778-59d036de-891c-11e7-835a-de7a25ff958c.png)

<h4 align="center">API Examples</h4>

![](https://user-images.githubusercontent.com/3502724/29689777-59c5a6ce-891c-11e7-90b9-6bfa3a672d43.png)

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Obtaining API Keys](#obtaining-api-keys)
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [Useful Tools and Resources](#useful-tools-and-resources)
- [Recommended Design Resources](#recommended-design-resources)
- [Recommended Laravel Libraries](#recommended-laravel-libraries)
- [Pro Tips](#pro-tips)
- [FAQ](#faq)
- [How It Works](#how-it-works-mini-guides)
- [Laravel Eloquent Cheatsheet](#laravel-eloquent-cheatsheet)
- [Deployment](#deployment)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

Features
--------

- **Local Authentication** using Email and Password
- **OAuth 1.0a Authentication** via Twitter
- **OAuth 2.0 Authentication** via Facebook, Google, GitHub, LinkedIn, Instagram, Foursquare, Bitbucket
- Flash notifications
- MVC Project Structure
- Bootstrap 3
- Contact Form (powered by Mailgun or Mandrill or Sendgrid)
- **Account Management**
	- Gravatar
 	- Profile Details
 	- Change Password
 	- Forgot Password
 	- Reset Password
 	- Delete Account
 	- CSRF protection
 	- Link to Social Accounts
 	- **API Examples**: Facebook, Foursquare, Last.fm, Instagram, Tumblr, Twitter, Stripe, LinkedIn, Google Map e.t.c.

Prerequisites
-------------
- [Mysql](http://www.mysql.com) or [Postgresql](http://www.postgresql.org/)
- [NodeJS 4.0.0+](https://nodejs.org/en/)
- [NPM 3.0.0+](https://www.npmjs.com/)
- [AdonisJS 3.2](http://adonisjs.com/)
- Command Line Tools
    - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
    - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs)
    - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`
    - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17">&nbsp;**Fedora**: `sudo dnf groupinstall "Development Tools"`
    - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17">&nbsp;**OpenSUSE:** `sudo zypper install --type pattern devel_basis` 	
   
**Note:** If you are new to AdonisJS, I recommend to watch
[Getting Started With AdonisJs](https://www.youtube.com/playlist?list=PLWmIA5YpCsizOMoM3tH5NSp1sHmdzVLvW) screencast by tutlage that teaches AdonisJS 3.2 from scratch. Alternatively,
here is another great tutorial for building a project management app for beginners/intermediate developers by Ayeni Olusegun - [Build A Contact Management web Application with AdonisJS Framework](http://goodheads.io/2017/08/04/build-contact-management-web-application-adonisjs-framework-part-1/)

Getting Started
---------------

#### Via Cloning The Repository:

```bash

# if you don't have nodemon
npm install -g nodemon

# Get the project
git clone https://github.com/iamraphson/adonisjs-hackathon-starter.git adonisjs-hackathon-starter

# Change directory
cd adonisjs-hackathon-starter

# Rename env.example to .env and fill in all the keys and secrets and also generate a secure key for the app using `php artisan key:generate`

# Install Composer dependencies
npm install

# Run your migrations
node ace migration:run

npm run serve:dev
```

Obtaining API Keys
------------------

To use any of the included APIs or OAuth authentication methods, you will need
to obtain appropriate credentials: Client ID, Client Secret, API Key, or
Username & Password. You will need to go through each provider to generate new
credentials.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1000px-Google_2015_logo.svg.png" width="200">

- Visit [Google Cloud Console](https://cloud.google.com/console/project)
- Click on the **Create Project** button
- Enter *Project Name*, then click on **Create** button
- Then click on *APIs & auth* in the sidebar and select *API* tab
- Click on **Google+ API** under *Social APIs*, then click **Enable API**
- Next, under *APIs & auth* in the sidebar click on *Credentials* tab
- Click on **Create new Client ID** button
- Select *Web Application* and click on **Configure Consent Screen**
- Fill out the required fields then click on **Save**
- In the *Create Client ID* modal dialog:
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: http://localhost:3333
 - **Authorized redirect URI**: http://localhost:3333/auth/google/callback
- Click on **Create Client ID** button
- Copy and paste *Client ID* and *Client secret* keys into `.env`

<hr>

<img src="http://www.doit.ba/img/facebook.jpg" width="200">


- Visit [Facebook Developers](https://developers.facebook.com/)
- Click **My Apps**, then select **Add a New App* from the dropdown menu
- Select **Website** platform and enter a new name for your app
- Click on the **Create New Facebook App ID** button
- Choose a **Category** that best describes your app
- Click on **Create App ID** button
- In the upper right corner click on **Skip Quick Star**
- Copy and paste *App ID* and *App Secret* keys into `.env`
 - **Note:** *App ID* is **clientID**, *App Secret* is **clientSecret**
- Click on the *Settings* tab in the left nav, then click on **+ Add Platform**
- Select **Website**
- Enter `http://localhost:3333` under *Site URL*

**Note:** After a successful sign in with Facebook, a user will be redirected back to home page with appended hash `#_=_` in the URL. It is *not* a bug. See this [Stack Overflow](https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url) discussion for ways to handle it.

<hr>

<img src="https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Logo.png" width="200">


- Go to [Account Settings](https://github.com/settings/profile)
- Select **Applications** from the sidebar
- Then inside **Developer applications** click on **Register new application**
- Enter *Application Name* and *Homepage URL*
- For *Authorization Callback URL*: http://localhost:3333/auth/github/callback
- Click **Register application**
- Now copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>


<img src="https://g.twimg.com/ios_homescreen_icon.png" width="90">


- Sign in at [https://apps.twitter.com/](https://apps.twitter.com/)
- Click **Create a new application**
- Enter your application name, website and description
- For **Callback URL**: http://127.0.0.1:3333/auth/twitter/callback
- Go to **Settings** tab
- Under *Application Type* select **Read and Write** access
- Check the box **Allow this application to be used to Sign in with Twitter**
- Click **Update this Twitter's applications settings**
- Copy and paste *Consumer Key* and *Consumer Secret* keys into `.env` file

<hr>

<img src="http://www.danpontefract.com/wp-content/uploads/2014/02/logo-linkedin.png" width="200">


- Sign in at [LinkedIn Developer Network](https://developer.linkedin.com/)
- From the account name dropdown menu select **API Keys**
 - *It may ask you to sign in once again*
- Click **+ Add New Application** button
- Fill out all the *required* fields
 - **OAuth 2.0 Redirect URLs**: http://localhost:3333/auth/linkedin/callback
 - **JavaScript API Domains**: http://localhost:3333
- For **Default Application Permissions** make sure at least the following is checked: `r_basicprofile`
- Finish by clicking **Add Application** button
- Copy and paste *API Key* and *Secret Key* keys into `.env` file
 - *API Key* is your **clientID**
 - *Secret Key* is your **clientSecret**

<hr>


<img src="https://s3.amazonaws.com/venmo/venmo_logo_blue.png" width="200">


- Visit the **Account** section of your Venmo profile after logging in
- Click on the **Developers** tab
- Then click on the [new](https://venmo.com/account/app/new) link next to **Your Applications (0)**
- Fill in the required fields: *App Name* and *What Will The App Be Used For?*
- For **Web Redirect URL** enter: http://localhost:3333/auth/venmo/callback
- Hit **Create** button
- Back on the **Developers** tab click on **view** link next to **Your Applications (1) new**
- Copy and paste **ID** and **Secret** keys into `.env` file

<hr>

<img src="https://stripe.com/img/about/logos/logos/black@2x.png" width="200">


- [Sign up](https://stripe.com/) or log into your [dashboard](https://manage.stripe.com)
- Click on your profile and click on Account Settings
- Then click on [API Keys](https://manage.stripe.com/account/apikeys)
- Copy the **Secret Key**. and add this into `.env` file
<hr>

<img src="https://pixabay.com/static/uploads/photo/2015/05/26/09/37/paypal-784404_960_720.png" width="200">


- Visit [PayPal Developer](https://developer.paypal.com/)
- Log in to your PayPal account
- Click **Applications > Create App** in the navigation bar
- Enter *Application Name*, then click **Create app**
- Copy and paste *Client ID* and *Secret* keys into `.env` file
- *App ID* is **client_id**, *App Secret* is **client_secret**
- Change **host** to api.paypal.com if you want to test against production and use the live credentials

<hr>

<img src="http://33.media.tumblr.com/ffaf0075be879b3ab0b87f0b8bcc6814/tumblr_inline_n965bkOymr1qzxhga.png" width="200">


- Go to [foursquare for Developers](https://developer.foursquare.com/)
- Click on **My Apps** in the top menu
- Click the **Create A New App** button
- Enter *App Name*, *Welcome page url*,
- For **Redirect URI**: http://localhost:3333/auth/foursquare/callback
- Click **Save Changes**
- Copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>

<img src="http://img4.wikia.nocookie.net/__cb20130520163346/logopedia/images/8/8d/Tumblr_logo_by_x_1337_x-d5ikwpp.png" width="200">


- Go to http://www.tumblr.com/oauth/apps
- Once signed in, click **+Register application**
- Fill in all the details
- For **Default Callback URL**: http://localhost:3333/auth/tumblr/callback
- Click **✔Register**
- Copy and paste *OAuth consumer key* and *OAuth consumer secret* keys into `.env` file

<hr>

<img src="http://iandouglas.com/presentations/pyconca2012/logos/sendgrid_logo.png" width="200">


- Go to https://sendgrid.com/user/signup
- Sign up and **confirm** your account via the *activation email*
- Then enter your SendGrid *Username* and *Password* into `.env` file

<hr>

<img src="https://raw.github.com/mailgun/media/master/Mailgun_Primary.png" width="200">


- Go to http://www.mailgun.com
- Sign up and add your *Domain Name*
- From the domain overview, copy and paste the default SMTP *Login* and *Password* into `.env` file

<hr>


<img src="https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg" width="200">


- Go to https://www.twilio.com/try-twilio
- Sign up for an account.
- Once logged into the dashboard, expand the link 'show api credentials'
- Copy your Account Sid and Auth Token

Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **app/Model**/User.js                 | Mysql/Postgresql schema and model for User.                          |
| **app/Model**/UserProfile.js                 | Mysql/Postgresql schema and model for User Profile.                          |
| **app/Http/Controllers**/AccountController.js                 | Controller for Account management                          |
| **app/Http/Controllers**/ClockworkController.js                 | Controller for Clockwork API functionality                           |
| **app/Http/Controllers**/FacebookController.js                 | Controller for Facebook API functionality                            |
| **app/Http/Controllers**/ContactController.js                 | Controller for Contact page                            |
| **app/Http/Controllers**/FoursquareController.js                 | Controller for Foursquare API functionality                           |
| **app/Http/Controllers**/GithubController.js                 | Controller for Github API functionality                           |
| **app/Http/Controllers**/GoogleMapsController.js                 | Controller for Google Maps API functionality                           |
| **app/Http/Controllers**/HomeController.js                 | Controller for Home Page                           |
| **app/Http/Controllers**/InstagramController.js                 | Controller for Instagram API functionality                           |
| **app/Http/Controllers**/LastFmController.js                 | Controller for LastFM API functionality                           |
| **app/Http/Controllers**/LinkedinController.js                 | Controller for Linkedin API functionality                           |
| **app/Http/Controllers**/LobController.js                 | Controller for Lob API functionality                           |
| **app/Http/Controllers**/NewYorkTimesController.js                 | Controller for New York Times API functionality                  |
| **app/Http/Controllers**/PayPal.js                 | Controller for Paypal API functionality               |
| **app/Http/Controllers**/ScarpingController.js                 | Controller for Web Scraping API functionality              |
| **app/Http/Controllers**/SlackController.js                 | Controller for Slack API functionality              |
| **app/Http/Controllers**/StripeController.js                 | Controller for Stripe API functionality                |
| **app/Http/Controllers**/TumbirController.js                 | Controller for Tumblr API functionality                |
| **app/Http/Controllers**/TwitterController.js                 | Controller for Twitter API functionality                |
| **app/Http/Controllers**/UploadController.js                 | Controller for Upload functionality               |
| **app/Http/Controllers**/YahooController.js                 | Controller for Yahoo functionality               |
| **app/Http/Controllers/Auth**/AuthController.js                 | Controller for login and signup functionality               |
| **app/Http/Controllers/Auth**/PasswordController.js                 | Controller for password reset functionality               |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **Config**/                        | configurations for your application.                         |
| **database**/                        | All database related files like migration and seed files.                          |
| **public/css**/style.css       | Main stylesheet for your app.                                |
| **resources/views/account**/                 | Template for *account*.      |
| **resources/views/auth**/                 | Templates for *login, password reset, signup, profile*.      |
| **resources/views/api**/                     | Templates for API Examples.                                  |
| **resources/views/contact**/                     | Template for *Contact*                                 |
| **resources/views/mail**/                     | Templates for *Mail*                                 |
| **resources/views/layout**/alerts.njk                    | Template for error, info and success flash notifications.                               |
| **resources/views/layout**/master.njk                    | Base template.                               |
| **resources/views**/welcome.njk                    | Home page template.                                |
| **resources/views**/apiPage.njk                    | API dashboard template.                               |
| .env.example                       | Your API keys, tokens, passwords and database URI.           |
| server.js                             | The main application file.                                   |
| package.json                       | NPM dependencies.                                            |
| package-lock.lock                          | Contains exact versions of NPM dependencies in package.json. |
| ace                         | File for enabling commands to run     |

List of Packages
----------------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| adonis-ally                           | AdonisJs social authentication provider              |
| @slack/client                           | Slack Package              |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| cheerio                         | Scrape web pages using jQuery-style syntax.                           |
| clockwork                       | Clockwork SMS API library.                                            |
| mysql                            | MySql ODM                                  |
| dotenv                          | Loads environment variables from .env file.                           |
| adonis-framework                 | Node.js web framework.                                                |
| cloudinary                        | Upload images/videos to Cloudinary                                             |
| serve-favicon                   | Express 4 middleware offering favicon serving and caching.            |
| fbgraph                         | Facebook Graph API library.                                           |
| github                          | GitHub API library.                                                   |
| lastfm                          | Last.fm API library.                                                  |
| instagram-node                  | Instagram API library.                                                |
| lob                             | Lob API library                                                       |
| node-foursquare                 | Foursquare API library.                                               |
| node-linkedin                   | LinkedIn API library.                                                 |
| Instagram                       | Instagram API library.                                                 |
| Moment                           | Date / Time Library.                                        |
| nodemailer                      | Node.js library for sending emails.                                   |
| paypal-rest-sdk                 | PayPal APIs library.                                                  |
| request                         | Simplified HTTP request library.                                      |
| stripe                          | Offical Stripe API library.                                           |
| tumblr.js                       | Tumblr API library.                                                   |
| twilio                          | Twilio API library.                                                   |
| twit                            | Twitter API library.                                                  |
| lodash                          | Handy JavaScript utlities library.                                    |
| adonis-validation-provider       | Validate form in adonisJS |
| mocha                           | Test framework.                                                       |
|thunkify                       | Turn a regular node function into one which returns a thunk            |
|standard                       | JavaScript Standard Style            |

Useful Tools and Resources
--------------------------
- [JavaScripting](http://www.javascripting.com/) - The Database of JavaScript Libraries
- [JS Recipes](http://sahatyalkabov.com/jsrecipes/) - JavaScript tutorials for backend and frontend development.
- [Jade Syntax Documentation by Example](http://naltatis.github.io/jade-syntax-docs/#attributes) - Even better than official Jade docs.
- [HTML to Jade converter](http://html2jade.aaron-powell.com) - Extremely valuable when you need to quickly copy and paste HTML snippets from the web.
- [JavascriptOO](http://www.javascriptoo.com/) - A directory of JavaScript libraries with examples, CDN links, statistics, and videos.
- [Favicon Generator](http://realfavicongenerator.net/) - Generate favicons for PC, Android, iOS, Windows 8.
- [Goodheads](http://goodheads.io) - Laravel, PHP, Node.js and JS tutorials
- [Favicon Generator](http://realfavicongenerator.net/) - Generate favicons for PC, Android, iOS, Windows 8.
-

Recommended Design Resources
----------------------------
- [Code Guide](http://codeguide.co/) - Standards for developing flexible, durable, and sustainable HTML and CSS.
- [Bootsnipp](http://bootsnipp.com/) - Code snippets for Bootstrap.
- [UIBox](http://www.uibox.in) - Curated HTML, CSS, JS, UI components.
- [Bootstrap Zero](https://www.bootstrapzero.com) - Free Bootstrap templates themes.
- [Google Bootstrap](http://todc.github.io/todc-bootstrap/) - Google-styled theme for Bootstrap.
- [Font Awesome Icons](http://fortawesome.github.io/Font-Awesome/icons/) - It's already part of the Hackathon Starter, so use this page as a reference.
- [Colors](http://clrs.cc) - A nicer color palette for the web.
- [Creative Button Styles](http://tympanus.net/Development/CreativeButtons/) - awesome button styles.
- [Creative Link Effects](http://tympanus.net/Development/CreativeLinkEffects/) - Beautiful link effects in CSS.
- [Medium Scroll Effect](http://codepen.io/andreasstorm/pen/pyjEh) - Fade in/out header background image as you scroll.
- [GeoPattern](https://github.com/btmills/geopattern) - SVG background pattern generator.
- [Trianglify](https://github.com/qrohlf/trianglify) - SVG low-poly background pattern generator.


Recommended Node.js Libraries
-----------------------------

- [Nodemon](https://github.com/remy/nodemon) - Automatically restart Node.js server on code changes.
- [geoip-lite](https://github.com/bluesmoon/node-geoip) - Geolocation coordinates from IP address.
- [Filesize.js](http://filesizejs.com/) - Pretty file sizes, e.g. `filesize(265318); // "265.32 kB"`.
- [Numeral.js](http://numeraljs.com) - Library for formatting and manipulating numbers.
- [Node Inspector](https://github.com/node-inspector/node-inspector) - Node.js debugger based on Chrome Developer Tools.
- [node-taglib](https://github.com/nikhilm/node-taglib) - Library for reading the meta-data of several popular audio formats.
- [sharp](https://github.com/lovell/sharp) - Node.js module for resizing JPEG, PNG, WebP and TIFF images.

FAQ
---

### Why do I get `csrf token mismatch` when submitting a form?
You need to add the following code to your form. This has been
added in the existing codebase as part of the CSRF protection.

```
{{ csrfField }}
```
### I get a whoops error when I deploy my app, why?
Chances are you haven't generated the app key, so run `node ace key:generate`.
Chances are you haven't put your credentials in your .env file.

How It Works (mini guides)
--------------------------

This section is intended for giving you a detailed explanation about
how a particular functionality works. Maybe you are just curious about
how it works, or maybe you are lost and confused while reading the code,
I hope it provides some guidance to you.

<hr>

### How do flash messages work in this project?
Flash messages allow you to display a message at the end of the request and access
it on next request and only next request. For instance, on a failed login attempt, you would
display an alert with some error message, but as soon as you refresh that page or visit a different
page and come back to the login page, that error message will be gone. It is only displayed once. All flash messages are available in your views via adonisJS sessions.
To send a flash message to the view, you need to add the following code 
```js
yield request.with({error: "Eroor due to 1.2.3 .."}).flash()
```
To display the flash message,you need to add the following code.
```twig
{% if old('error') %}
    <div class="alert alert-danger">
        {{ old('error') }}
    </div>
{% endif %}
```

<hr>

### How do I create a new page?
A more correct way to be to say "How do I create a new route". The main file `routes.js` contains all the routes. It's located in the **app/Http** directory
Each route has a callback function associated with it. You will see 2 arguments
to routes. In cases like that, the first argument is still a URL string, while the second argument is a callback function.  Example is a route that requires authentication.

```js
const Route = use('Route')
Route::get('/account', 'AccountController.getAccount').middleware('auth')
```
It always goes from left to right. A user visits `/account` page. Then `auth` middleware checks if you are authenticated:

Here is a typical workflow for adding new routes to your application. Let's say we are building a page that lists all books from database.

**Step 1.** Start by defining a route.

```js
const Route = use('Route')
Route::get('/books', 'BookController.getBooks');
```
---

**Step 2.** Create a new model `Book.js` inside the *app/Model* directory. You can simply run `node ace make:model Book`

```js

'use strict'

const Lucid = use('Lucid')

class Book extends Lucid {

}

module.exports = Book

```

**Step 3.** Create a migration file like so: `node ace make:migration create_books_table`

```js
'use strict'

const Schema = use('Schema')

class CreateBooksTableTableSchema extends Schema {

  up () {
    this.table('books', (table) => {
    	table.increments()
        table.string('name').nullable()
        table.string('isbn').nullable()
        table.timestamps()
    });
  }

  down () {
    this.drop('books');
  }
}

module.exports = CreateBooksTableTableSchema
```

**Step 4.** Create a new controller file called `BookController.js` inside the *app/Http/Controllers* directory. You can simply run `node ace make:controller BookController` and it ask you `Generating a controller for ?` select `Http Request`

```js
'use strict'

const Contact = use('App/Model/Contact')

class BookController {

    /**
     * Return all books
     * @return Response
     */
  * index(request, response) {
    let contacts = yield Contact.all();

    yield response.sendView('contacts', { contacts: contacts.toJSON() })
  }
  
}

module.exports = BookController
```

**Step 5.** Create `books.njk` template in *resources/views* directory

```js
{% extends 'master' %}

{% block content %}
    {% include 'layout.nav' %}
    <div class="main-container">
        {% include 'layout.alerts' %}

        <div class="page-header">
            <h2><i style="color: #f00" class="fa fa-book"></i>All Books</h2>
        </div>

        <ul>
        {% for book in books %}
            <li> {{ book.name }} </li>
        {%  endfor %}
        </div>
    </div>
{% endblock %}
```

That's it!
<hr>

Deployment
----------

Once you are ready to deploy your app, you will need to create an account with a cloud platform to host it. These are not the only choices, but they are my top
picks. From my experience, **Heroku** is the easiest to get started with,  deployments and custom domain support on free accounts.

### 1-Step Deployment with Heroku

<img src="http://blog.exadel.com/wp-content/uploads/2013/10/heroku-Logo-1.jpg" width="200">

- Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/)
- In terminal, run `heroku login` and enter your Heroku credentials
- From *your app* directory run `heroku create`
- Create a Procfile in your app root. All this file needs to contain is `web: ENV_SILENT=true node --harmony_proxies server.js` 
- Run `heroku addons:add heroku-postgresql:dev  ` to add a Postgres database to your heroku app from your terminal
- Lastly, do `git push heroku master`.  Done!
- Run artisan commands on heroku like so `heroku run node ace migration:run`

**Note:** To install Heroku add-ons your account must be verified.

---
<img src="http://www.opencloudconf.com/images/openshift_logo.png" width="200">

- First, install this Ruby gem: `sudo gem install rhc` :gem:
- Run `rhc login` and enter your OpenShift credentials
- From your app directory run `rhc app create MyApp nodejs-0.10`
 - **Note:** *MyApp* is the name of your app (no spaces)
- Once that is done, you will be provided with **URL**, **SSH** and **Git Remote** links
- Visit provided **URL** and you should see the *Welcome to your Node.js application on OpenShift* page
- Copy and and paste **Git Remote** into `git remote add openshift YOUR_GIT_REMOTE`
- Before you push your app, you need to do a few modifications to your code

go to `htpp.js` in *bootstrap* directory, 

Then change `Server.listen(Env.get('HOST'), Env.get('PORT'))` to:
```js
Server.listen(Env.get('OPENSHIFT_NODEJS_IP') || '127.0.0.1', Env.get('OPENSHIFT_NODEJS_PORT') || 3333)
```
Add this to `package.json`, after *name* and *version*. This is necessary because, by default, OpenShift looks for `server.js` file. And by specifying `ENV_SILENT=true supervisor server.js` it will automatically restart the server when node.js process crashes.

```js
"main": "server.js",
"scripts": {
  "start": "ENV_SILENT=true supervisor server.js"
},
```

- Finally, you can now push your code to OpenShift by running `git push -f openshift master`
 - **Note:** The first time you run this command, you have to pass `-f` (force) flag because OpenShift creates a dummy server with the welcome page when you create a new Node.js app. Passing `-f` flag will override everything with your *Hackathon Starter* project repository. **Do not** run `git pull` as it will create unnecessary merge conflicts.
- And you are done!

## Contributing

Thank you for considering contributing to AdonisJS Hackathon Starter.

## Security Vulnerabilities

If you discover a security vulnerability within Hackathon Starter, please send an e-mail to Ayeni Olusegun at nsegun5@gmail.com. All security vulnerabilities will be promptly addressed.

## Credits
* [Sahat Yalkabov](https://github.com/sahat/hackathon-starter)

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or HackerNews? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
