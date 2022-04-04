# ToDo's

- Add(ok) / delete widget

- Add(ok) / delete screen

- Fix select statement to create widget and screen-list dependent on "see public"

- public Widgets/Screens that are not owned by the user cannot be deleted/configured

- Screens can only be public if all used widgets are public => determine automaticlly if screen is public?

- Authentication

- Form validation -> rules:

  - Screen-Widgets:

    - at least one widget must be selected (no empty screen allowed)

  - User:

    - E-Mail: /\S+@\S+\.\S+/ + unique in DB
    - User name: not empty + unique in DB

  - Screen + Widget:

    - Name: unique for user_id

- Settings => "Account" and move into Avatar-Menu

- display owner on settings page of public widget/screen

- display "widget is used on screens: ....." on widget page + dialogs

- display "screen uses widgets: ....." on screens page
