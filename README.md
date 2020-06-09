# Peachtree Bank

The purpose of this application is to provide an easier way of transferring money from your account to a merchant. It also provides 
an overview of all recent transactions.

## Getting Started

### Installing and Running

1. In your terminal, navigate to the root of the folder
2. Install all dependencies
    ```bash
    $ npm install
    ```
3. Run the application
    ```bash
    $ npm start
    ```
4. Open your browser window and navigate to [http://localhost:4200/](http://localhost:4200/)
### Build the application

To build the application you need to run the following command
```bash
$ npm run build
```
This will compile the application into the **dist** folder. However, you cannot just open the index file. The application will not work.
The reason why is because the application was compiled with ES6 modules. Unfortunately, modern browsers are not supporting
pointing to the files directly. You need to use a server.

To run the application, you can use any tools, but here is a nice little tool that will do the job. The name of the tool is [Serve](https://www.npmjs.com/package/serve) by Zeit

## Project Development

### Architecture

The application is designed with separation of responsibility in mind. First, the components are separated into two categories, **containers** and **components**.
This will help with making a distinction between components dealing with some business login (containers), and presentational components (components).

Next we have the service. In this application there only one service, the **ApiService**. The purpose of this service is to fetch the data from an external source.
This can be an API endpoint, or a file. The services can hold the main business logic, or communicate with other services from the outside.

Then we have some useful files, like the **entities**, helping us better define our domain. We also have the **interfaces** defining our variables and method inputs and outputs.

Last but not least is the application state, called **store**. More on this in the next segment.

### State Management with NGRX

This application has its global state, called application state. Under the hood we are using a common pattern called Redux. For Redux to be implemented in the application
we are using the tool NGRX.

The NGRX library helps us with reactive programing, by providing an API developed with Observables.

This application have a couple of actions:
* **loadTransactions** - triggered when the transactions are fetched from the API.
* **loadFailure** - for when the loading of the transaction fails 
* **requestNewTransaction** - initializing a new transaction request
* **createTransaction** - the creation of the transaction
* **failedTransaction** - if the validation from the request fails, this action will be dispatched
* **filterTransactions** - when we filter transactions based on the provided query or sort options

Redux also has the concept around side effects. A side effect can be an API call, or displaying a notification.

In this application we have few effects.
* One for when the app has been initialized, we want to fetch all information from an API
* An effect for when a new transaction request has been made, this will validate if we have reached the limit or not
* Last one is for when we have reached our limit, a notification will be triggered

### Styling

For styling, the app uses Twitter Bootstrap. With some overrides like the primary color.

The layout is Mobile first, using the Layout system provided by the library itself. In some places, additional flexbox parameters were added, for better UX.

### Google Fonts

For loading the fonts, I have used a technique presented recently in an article from Harry Roberts, [The Fastest Google Fonts](https://csswizardry.com/2020/05/the-fastest-google-fonts/)

In this technique, along side using the `display=swap` configuration for the fonts, we are also using some benefits provided by the today's modern browsers,
like `preload`
```html
<link rel="preload"
      as="style"
      href="$URL&display=swap" />
```

and another useful technique for pre-connecting to the Google servers
```html
<link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />
```
