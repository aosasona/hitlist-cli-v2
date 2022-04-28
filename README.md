# Hit List

#### Your personal **online** commands manager

#### Requirements

> NodeJS >= 16.0.0
> Node Package Manager >= 6.0.0
> Internet Connection

#### Installation

To install **Hit List**, run the following command in your terminal

###### If you're running MacOS/Linux,

> sudo npm i -g hitlist

And enter your PC's password

###### For other Operating Systems,

> npm i -g hitlist

# Usage

## Account & Authentication

This section contains everything related to your Hit List account, to reset your password, you would have to do that on the website at https://hitlist.dev

#### Create a new Hit List account

> hit join

OR

> hit j

#### Login to your account

> hit login

OR

> hit l

#### View Current User

> hit me

OR

> hit m

#### Sign out of Hit List CLI

> hit logout

OR

> hit d

## Lists

This section contains everything related to Hit Lists 🔫

#### Create a new Hit List

> hit create [LIST NAME]

OR

> hit c [LIST NAME]

You would have to enter the:

- Hits separated by commas (eg. mkdir test-folder, cd test-folder)
- Description of the list (eg. This is my test list)
- Visibility of the list (Y/N)

#### View all lists

> hit list

OR

> hit ls

#### Execute a personal list

This will automatically execute a list you **OWN**

> hit run [LIST NAME]

OR

> hit r [LIST NAME]

#### Execute a public list

This will automatically execute a **PUBLIC** list from a user's pool (collection of lists)

> hit run -p [USERNAME] [LIST NAME]

OR

> hit r -p [USERNAME] [LIST NAME]

#### Delete a list

This will delete a list you **OWN**

> hit delete [LIST NAME]

OR

> hit x [LIST NAME]

## Extra

Other things included for you - these will be updated over time

#### Clear Terminal

This will clear ALL the terminal/console output

> hit clean

OR

> hit c

#### Push to a set GIT repository

This will push to a pre-configured GIT repository

> hit push [YOUR COMMIT MESSAGE]

OR

> hit git [YOUR COMMIT MESSAGE]

#### HELP

> hit help [COMMAND]

If you need to report a bug, request a feature or request for help, contact **hit@hitlist.dev**
