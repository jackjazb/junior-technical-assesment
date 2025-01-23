# Junior Technical Assesment

This is a basic technical test for potential Kore developers.

This has been designed to provide an insight into the type of projects you'll be working on day to day.
Nothing in here has been done to deliberately catch you out.

This repo contains a basic Angular app with some components and tests mirroring a fairly typical setup.

For simplicity authentication, authorisation and apis have been excluded.
There is a service class which is emulating api like responses.

Before doing anything you will need to clone this repo and install the dependancies using `pnpm`.

We then have some simple tasks we'd like you to attempt, these are shown within the code using `@fixme`.

1. Refactor the product card out of the main app component into it's own (with tests)
    - I've created a new component which accepts a product as input and emits "Edit" or "Delete" events based on button presses containing the card's product as a payload. These are used to trigger the callbacks in the `app` component.
1. Ensure errors during create/update of a product are shown to the user
    - I've added a toast service which allows a message to be set and then automatically clears it after a fixed timeout. I also implemented a new component to display the current value of this message in a fixed position div in the lower left. I then decided to re-use the service for success messages to keep the UX of the app consistent.
1. Provide meaningful feedback to the user depending on the validation error
    - I've improved the granularity of the errors in `product-form` by altering their contents based on the current validation errors. I also added additional functionality to the toast service to format and display product service validation errors.
1. Ensure form data is not lost if errors occur
    - As the save and update functions are asynchronous, I've changed form reset to be event-driven. The `product-form` component now accepts an Observable, which the parent uses to pass a reset event emitter. Events are emitted when product updates are successful.
1. Complete the missing tests
    - I've filled in unimplemented tests and added unit coverage for all new components and services. I've tried to avoid unnecessary mocks to test the true behaviour of the UI.

## Development server

To start a local development server, run:

```bash
pnpm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
pnpm ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
pnpm ng generate --help
```

## Running unit tests

```bash
pnpm test
```
