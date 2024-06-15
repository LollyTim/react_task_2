# This project is a toy project for training and quality assurance purposes

# Web App

Boilerplate Webpack 5, React and Bootstrap 5 project with global Css and Css modules enabled.

# Hosts File Config
In order to run this application in local, you'll need to modify your hosts file configuration. Then you will be able to access/serve your application at https://test.manaknightdev.com:3000

### Windows
Please include the following line in your hosts file

`127.0.0.1 test.manaknightdev.com`

See How to edit your hosts file on Windows [here](https://www.groovypost.com/howto/edit-hosts-file-windows-10/)

### Mac
Please do the following steps

`sudo nano /private/etc/hosts`

add `127.0.0.1 test.manaknightdev.com` to the end of the file and save

run `sudo dscacheutil -flushcache` to flush the DNS cache

you might need to run `chmod +x .husky/pre-commit` to have the linter activated on commits

# App Setup

This project is setup to use yarn.

to get started.

`run yarn`

This will install the nodule modules

# Dev Build

`yarn run start`

The Webpack build has a lot of outputs, if this is not intterupted then allow it to completely build for the first time... consecutive builds on "save" are faster after the first build.

In the event you run into any error with the build failing
for this project you can downgrade your `node version to 14 or 16`

# Staging Build

`yarn run staging`

# Production Build

`yarn run production`

# Task

- To login go to https://test.manaknightdev.com:3000/
- devtest@manaknightdev.com / Abcdef123
- Create the form page https://test.manaknightdev.com:3000/form as in screenshot_1
- Create delete modal and it can delete the form as well screenshot_2
- When we click on add button, it will open modal popup showing form. need to integrate the ADD FORM api
- Need to integrate API to load the table

## API for getting Contract Forms
```
GET `/companies/${companyId}/contract-forms`
```

## API for Adding Contract Forms
```
Request Body: {
company_id: companyId,
name: formName,
replacement_tags: typeof String,
status: 'active',
template: typeof string,
has_signature: true || false,
}
```

```
POST  `/contract-forms`
```
## API for deleting Contract Forms
```
DELETE `/contract-forms/${contractId}`
```