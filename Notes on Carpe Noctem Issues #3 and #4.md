Provision Web Dev VM

1. This VM will have exposed ports and synced folders from `guest` OS to `host` OS.  Use the `Vagrantfile.j2` to modify target VM.  At the very least for the developer's OS (`MacOSX` represent).


1. This VM will have developer friendly versions of software.  `JDK`, endless watcher versions of software that restart on failure (e.g. `nodemon` or `activator` or `sbt`) is a must.
1. The VM will display developer framework warnings on all relevant ports.

    > Browser extensions always use port 35729
    [according to feedback.livereload.com](http://feedback.livereload.com/knowledgebase/articles/195869-how-to-change-the-port-number-livereload-listens-o)

    Therefore ports such as these items will have to be exposed
    1. LiveReload port: `35729` (pass through to host OS)
    1. HTTP server port: `8000` (pass through to host OS)
    1. HTTPS server port: `8443` (pass through to host OS)
    1. Hot swapping resource port: todo
    1. easy state import and export statements to be used in acceptance testing
1. And updated `Vagrantfile` will be committed to the project.


Provision Build Dev VM

1. This VM will have exposed ports and synced folders from `guest` OS to `host` OS.  Use the `Vagrantfile.j2` to modify target VM.  At the very least for the developer's OS (`MacOSX` represent).

    ports like
    1. `http://localhost.com` (port 80)  - For the production artifacts with maximum core business value
    1. `https://localhost.com` (port 443) - For the production artifacts with maximum core business value
    1. `http://localhost.com:7080` ELK (`ElasticSearch`, `Logstash`, `Kibana` monitoring system)
    1. `http://localhost.com:7443` Secure, hardened ELK
    1. `http://localhost.com:111080` Consul (feature flag framework)
    1. `https://localhost.com:111443` Secure, hardened Consul server
    1. TODO: Add any other open source frameworks that help to this section.


1. This VM will have production sturdy versions of software end software.  Perhaps even `Docker` images working to use up a maximum amount of VM resources.
1. The VM will expose all devops/ops tooling used to diagnose production issues.
1. An updated `Vagrantfile` will be committed to the project to run this awesome "build box".
