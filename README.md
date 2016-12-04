## Carpe Noctem
TODO

### config
The is the main entry point if you want to change system configs.

`env` can be `dev` V `stage` V `prod`

### Setup Dev Machine
#### Automated
1. Run `sh run.sh` to setup environment and spin up local dev resources (e.g. VMs).

#### Manual
TODO

##### Updating Dev Machine files
* If you find another atom package, update and commit the `atom-requirements` using this command:
```
apm list --installed --bare > provisioning/plays/roles/dev-machine/files/atom-requirements.txt
```

### Teardown
#### Automated
1. Run `sh stop.sh` to uninstall dev-machine software and teardown VMs.

#### Manual
TODO

### Common commands
```
ansible-playbook provisioning/plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars "@config.yml" --tags "vagrant"
ansible-playbook provisioning/plays/spinup-env.yml --extra-vars "@config.yml" --tags "jenkins"
```
```
ansible local -a "echo 'hello'"
```
```
> ansible all -m setup -a 'filter=ansible_distribution'

# example run
jenkins-dev | SUCCESS => {
    "ansible_facts": {
        "ansible_distribution": "Ubuntu"
    },
    "changed": false
}
127.0.0.1 | SUCCESS => {
    "ansible_facts": {
        "ansible_distribution": "MacOSX"
    },
    "changed": false
}
database-dev | SUCCESS => {
    "ansible_facts": {
        "ansible_distribution": "Ubuntu"
    },
    "changed": false
}
build-dev | SUCCESS => {
    "ansible_facts": {
        "ansible_distribution": "Ubuntu"
    },
    "changed": false
}
web-dev | SUCCESS => {
    "ansible_facts": {
        "ansible_distribution": "Ubuntu"
    },
    "changed": false
}

```
### Core design of system
  Continuous Delivery pipeline deploys the latest artifacts the instant they become available and acceptable.  This is all done in an automated fashion.  Below I will document the steps of this process.

  1. Commit Phase
      1. Changes
        - `git checkout -b ${Issue}#${Issue Number}/${Author of Developer}-${Description of branch}`
      1. Test
        - Ensure all code pass developer standard lint rules.  A violation of this rules stops the pipeline
        - Run low-fidelity functional tests like request/response contract rule tests and application unit tests
        - TODO: Create way to test (`sh tests.sh` or `ansible-playbook test-env`?)
      1. Commit
        - `git commit -m "Description of solution and how cool of a developer you feel after making the changes"`
        - `gc` to enter `vim` editor where you can scroll through the changes being committed.  It's handy once you know `vim` or `vi`.
  1. Acceptance Phase
      1. Checkout
        - `foreach ${application} git checkout ${application repository URL}`
      1. Static Code Analysis (does it meet dev standards?).  Developer who pushed gets notified if not.
        - `foreach ${lint ruleset} check ${check ruleset} against ${source code location on disk}`
      1. Unit Test  (Cucumber BDD, lowest fidelity tests to higher fidelity tests)
        - `foreach ${application} ${technology build tool} run_unit_tests() using ${source code location on disk}`
      1. Compile
        - `foreach ${technology} ${technology build tool} generate_dist() using ${source code location on disk}`
      1. Package software (generate artifacts, put into artifact repository)
        - `foreach ${imagining software} pack up according to ${image software image file} located at ${source code location on disk}`
        - `foreach ${image on disk} send to ${artifact repository}`
  1. Load & Perf Phase
      1. Build environment infrastructure (e.g. I use Ansible & AWS CloudFormation to build a staging ENV)
        - `ansible-playbook spinup-env` where ENV variables are set up target inventories.

          A local Vagrant VM ecosystem helps provide developer sandboxing of mock production (subset of anonymized user info along with game info).

          AWS Cloud Formation is commonly used to spin up AWS cloud infrastructure.  They come in `*.json` form or `*.yaml` form (yaml is better).
      1. Create DB, populate with appropriate data for higher fidelity testing.
        - TODO: `sh create-or-migrate-database.sh` or `ansible-playbook create-database` or it's a part of existing play?
      1. Deploy software artifacts onto infrastructure
        - `foreach ${artifact image} in ${artifact repository} deploy onto foreach ${target infrastructure resource}`
      1. Run highest-fidelity tests (since a real costly environment exists now) (Selenium tests)

        Robotic clicks, robotic clicks.  These should be parallelized for maximum effect.

        - part of `sh test.sh` or a step in an Ansible playbook play (cool Ender's Game reference).
          `selenium test foreach UI application`
      1. Load testing and manual exploration phase (optional).

        If I wanted to show this off to others from my phone I could set up a VPN, have a staging environment always showcasing current production artifacts.

        Upon further consideration I believe this is necessary until production environment exists.
      1. Perf testing (does application meet business specifications? e.g. low amount of delay for static asset requests)

        Test Load Balancing, autoscaling groups (static asset server, application server, database connection pool)
  1. Release Phase
      1. Can be manual "one button" click if desired but this launches a Green/Blue deploy infrastructure with new code and slowly transfers all traffic to new boxes.
      1. Hit health checks and slowly change reality so that all servers are of the alt color's code type
  1. Production Monitoring Phase (continuous)
      1. Health checks are constantly pinged to ensure maximum up time.  At this stage if you have any issues you store the logs and spin up a new environment (Immutable infrastructure) with ready to go auto-scalable VM images.
      1. Logs go into logstash where a ops can constantly check the health of production.  Hooks into AWS email (SES?), AWS SMS using AWS SQS if things do go south (like if your image artifacts have gone corrupt and nothing can spin up any longer).


  A continuous delivery pipeline delivers a value stream from developer's laptop to production where everything is automated and problem types can be easily isolated.  Above are listed out the phases, the steps where manual steps can be placed if a business desires to have someone explore before releasing.

  At all steps of this process should you log out to some developer accessible log, such as a slack integration with the build tool.  Always documenting these steps in chat form is good for historical record, which can all be stored in AWS Glacier when the facts grow too old.

  ### Value Stream Diagram
  <img width="1282" alt="screen shot 2016-12-04 at 8 25 50 am" src="https://cloud.githubusercontent.com/assets/3106250/20867151/c7af10f2-ba0b-11e6-86a7-5674dd8fdf14.png">

  
  (Diagram source is a screenshots from _Devops in the Cloud_ on Safari: https://www.safaribooksonline.com/library/view/devops-in-the/9780132836357/part17.html with the water mark left in for maximum sourcability (thanks @2012 Pearson), notes by myself


### Known Issues
#### Vagrant
You may encounter an issue if you're coding on a windows machine or OSX on late 2015 Macbook (read: not pro, not air) when running `vagrant up`.
```
$ vagrant up
Bringing machine 'jenkins-dev' up with 'virtualbox' provider...
Bringing machine 'web-dev' up with 'virtualbox' provider...
Bringing machine 'build-dev' up with 'virtualbox' provider...
==> jenkins-dev: Box 'ubuntu/trusty64' could not be found. Attempting to find and install...
    jenkins-dev: Box Provider: virtualbox
    jenkins-dev: Box Version: >= 0
The box 'ubuntu/trusty64' could not be found or
could not be accessed in the remote catalog. If this is a private
box on HashiCorp's Atlas, please verify you're logged in via
`vagrant login`. Also, please double-check the name. The expanded
URL and error message are shown below:

URL: ["https://atlas.hashicorp.com/ubuntu/trusty64"]
Error:
```
Fortunately, denizens of the internet have been able to work out a solution.  As a `MacOSX` on late 2015 Macbook model myself I was interested and able to resolve my issue by following /u/newrulez' suggestion [found in this thread](https://github.com/mitchellh/vagrant/issues/5016).

The fix was interesting because you have to download a better version of `curl` and let `vagrant` know about it.  Only then with running `vagrant up` be able to send those pesky XHRs to download the appropriate VM images.  Neat, eh?


You may encounter an issue related to the hidden directory `.vagrant` being generated by a sudo user.  Run `sudo rm -rf .vagrant` to delete, then `ansible-playbook provisioning/plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars "@config.yml" --tags "vagrant"` to generate a new `.vagrat` directory and `Vagrantfile`.
