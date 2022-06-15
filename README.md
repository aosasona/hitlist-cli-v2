# Hit List 🚀

- Author - Ayodeji
- Documentation - https://www.hitlist.dev/docs/

#### Your personal **online** commands manager

Note: HitList will now save and sync hits locally and with the cloud. You also now need to use the sudo prefix on MacOS and Linux.

#### Requirements

> NodeJS >= 14.0.0

> Node Package Manager (NPM) >= 6.0.0

> Internet Connection

# Installation

To install **Hit List**, run the following command in your terminal

```
npm i -g hitlist-cli
```

# Usage

# Account & Authentication

This section contains everything related to your Hit List account, to reset your password, you would have to do that on the website at https://www.hitlist.dev

## Create a new Hit List account

Create a new Hit List account from the terminal, you can also do this on the webiste at https://www.hitlist.dev

```
hit join
```

## Login to your account

Login to your Hit List. You need to be logged in to use Hit List

```
hit login
```

## View Current User

View who is currently logged in

```
hit me
```

## Sign out of Hit List CLI

Logout of your Hit List account

```
hit logout
```

# Lists

This section contains everything related to Hit Lists 🔫

## Create a new Hit List

Add a new list to your collection, or pool (get the reference?)

```
hit create [LIST NAME]
```

OR

```
hit c [LIST NAME]
```

You would have to enter the:

- Hits separated by commas (eg. mkdir test-folder, cd test-folder)
- Description of the list (eg. This is my test list)
- Visibility of the list

## View all lists

This will show all lists you own, it will attempt to fetch it locally first by default.

```
hit list
```

OR

```
hit ls
```

## Execute a personal list

This will automatically execute a list you **OWN** locally first and then try to execute it online.

```
hit run [LIST NAME]
```

OR

```
hit r [LIST NAME]
```

## Execute a public list

This will automatically execute a **PUBLIC** list from a user's pool (collection of lists)

```
hit run -p [USERNAME] [LIST NAME]
```

## Delete a list

This will delete a list you **OWN** locally and online

```
hit delete [LIST NAME]
```

## New: Sync with HitList Cloud

This will download and save all lists from the cloud to make them available offline.

```
hit sync
```

# Extra

Other things included for you - these will be updated over time

## Clear Terminal

This will clear ALL the terminal/console output

```
hit clean
```

OR

```
hit c
```

## Push to a set GIT repository

This will push to a pre-configured GIT repository

```
hit push [YOUR COMMIT MESSAGE]
```

OR

```
hit p [YOUR COMMIT MESSAGE]
```

## HELP

```
hit help [COMMAND]
```

You can also run the command below to open the online docs

```
hit doc
```

If you need to report a bug, request a feature or request for help, contact **hit@hitlist.dev** or reach out to me on [Twitter](https://twitter.com/trulyao)
