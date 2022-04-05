# ToDo's

- completely rethink the concept of public widgets/screens

  - !! First step: all widgets are private !!
  - users can publish their widgets/screens
  - screens can only be public if ALL widgets on them are public
  - other users can copy OR reference public widgets
    - copy => the data are copied and the copy is owned be the copying user, the user can change the widget afterwards
    - reference => the data are not copied but the original widget is used on own screen => the user cannot edit the referenced widget, later changes by the owner of the widget have effect on own screen using the referenced widget

- Add(ok) / delete widget

  - delete as screen-widget from all involved screens
  - list the screens the widget is used on
  - warn user in the case the widget is used on screens (especially of other users)

- Add(ok) / delete screen

- Fix select statement to create widget and screen-list dependent on "see public"

- public Widgets/Screens that are not owned by the user cannot be deleted/configured => make icons invisible

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

- Future: User "Sequelize" as ORM in backend
