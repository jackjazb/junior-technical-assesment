# Junior Technical Assesment

## Approach

My initial approach for this task was to gain some familiarity with Angular and its best practices before making a start on any changes, primarily using the guides and tutorials on angular.dev.

The first change I made to the project was to factor out the product card component. This seemed like a good way to gain an understanding of Angular's components, and I felt refactoring was a good entry point into learning the codebase. I then moved on to fixing the ambiguous main form validation errors - this involved making the errors for the name field consistent with those shown by description. I also implemented the missing unit tests - in general, I used the existing code as a reference in an effort to keep standards and practices consistent across the codebase.

I enjoyed the chance to exercise some creativity when implementing an improved error feedback system, designing a toast component and service to display timed messages, which also gave me a chance to begin learning both RxJS and Angular's animation system. To ensure clarity for users, I then implemented some simple formatting for the errors returned by the product service. While developing the component I introduced a bug caused by a new toast being cleared by the previous toast's timeout - having fixed this, I introduced a unit test to ensure such cases function correctly in future. With the toast system implemented, I decided to add a second "success" toast type to be shown when operations are successful.

---
This is a basic technical test for potential Kore developers.

This has been designed to provide an insight into the type of projects you'll be working on day to day.
Nothing in here has been done to deliberately catch you out.

This repo contains a basic Angular app with some components and tests mirroring a fairly typical setup.

For simplicity authentication, authorisation and apis have been excluded.
There is a service class which is emulating api like responses.

Before doing anything you will need to clone this repo and install the dependancies using `pnpm`.

We then have some simple tasks we'd like you to attempt, these are shown within the code using `@fixme`.

1. Refactor the product card out of the main app component into it's own (with tests)
1. Ensure errors during create/update of a product are shown to the user
1. Provide meaningful feedback to the user depending on the validation error
1. Ensure form data is not lost if errors occur
1. Complete the missing tests

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
