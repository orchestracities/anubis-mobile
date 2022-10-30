# Anubis Mobile interface for users

<img src="img/logo.jpg" alt="Anubis" style="float: left; margin-right: 10px;"
width="200"/> This is a proof of concept implementation of a Mobile application allowing
resource owners to interact with a network of [Anubis](https://anubis-pep.readthedocs.io/en/latest/)
middleware to govern policies.
Ultimately this allows for decentralized definition of policies for resources
owners via a mobile device that will be the ultimate source of true for defined
policies by resource owners.

Being a proof of concept to be further developed, we focused on the user
interaction for policy definition and the interaction with the middleware
leaving a side other aspects such as security and making the app available
in a App store.

The mobile app currently as been tested only for Android (Android 6.0
(Marshmallow) SDK or later).

## User Manual

1. A user, once launched the application, can register using the email.

    ![Registration](img/registration.jpg)

1. Once registered, if any resource owned by the user are available in the
    middleware network, this will be listed in the home page.

    ![Home: List of resources](img/home.jpg)

    Resources and related policies are retrieved via the `/user/policies` end
    point of the [Policy Distribution Middleware API](https://anubis-pep.readthedocs.io/en/latest/user/walkthrough-middleware.html#userpolicies)

1. From the home page, the user can pick a resource, and see existing policies
  for the picked resource.

    ![List of policies](img/policies.jpg)

1. In the policy view, the user using long press, can trigger the edit of a
    policy.

    ![Edit policy](img/edit-policy.jpg)

1. In the policy view the user can add new policies.

    ![New policy](img/new-policy.jpg)

1. Once done, the user can push back policies to the middleware network using
    the synch button. A local copy will be preserved.

    ![Synch data](img/synch.jpg)

    Updated resource policies are published via the `/user/policies` end point
    of the [Policy Distribution Middleware API](https://anubis-pep.readthedocs.io/en/latest/user/walkthrough-middleware.html#userpolicies)

## Development Setup

In order to run Anubis mobile you must at first configure React native using
this [guide](https://reactnative.dev/docs/environment-setup).
After that run inside the folder

```bash
$ npm install
$ react-native run-android
```

### If watchman is doing an error:

This error is very common with the port on OSX to fix it, run this commands in
order and then start the application again 

```bash
$ watchman watch-del-all
$ watchman shutdown-server
```

### Testing on your device

In order to run Anubis mobile on your device, follow this [guide](https://reactnative.dev/docs/running-on-device).