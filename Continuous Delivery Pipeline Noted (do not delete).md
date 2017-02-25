# Notes on continuous delivery

1. Commit Phase
    1. Changes
    1. Test
    1. Commit
1. Acceptance Phase
    1. Checkout
    1. Compile
    1. Static Code Analysis (does it meet dev standards?)
    1. Unit Test  (Cucumber BDD, lowest fidelity tests to higher fidelity tests)
    1. Package software (generate artifacts, put into artifact repository)
1. Load & Perf Phase
    1. Build environment infrastructure (e.g. I use Ansible & AWS CloudFormation to build a staging ENV)
    1. Create DB, populate with appropriate data for higher fidelity testing.
    1. Deploy software artifacts onto infrastructure
    1. Run highest-fidelity tests (since a real costly environment exists now) (Selenium tests)
    1. Load testing and manual exploration phase (optional).
    1. Perf testing (does application meet business specifications? e.g. low amount of delay for static asset requests)
1. Release Phase
    1. Can be manual "one button" click; Green/Blue deploy infrastructure with new code
    1. Hit health checks and slowly change reality so that all servers are of the alt color's code type
1. Production Monitoring Phase (continuous)
    1. Health checks are constantly pinged to ensure maximum up time.  At this stage if you have any issues you store the logs and spin up a new environment (Immutable infrastructure) with ready to go auto-scalable VM images.
    1. Logs go into logstash where a ops can constantly check the health of production.  Hooks into AWS email (SES?), AWS SMS using AWS SQS if things do go south (like if your image artifacts have gone corrupt and nothing can spin up any longer).


    A continuous delivery pipeline delivers a value stream from developer's laptop to production where everything is automated and problem types can be easily isolated.  Above are listed out the phases, the steps where manual steps can be placed if a business desires to have someone explore before releasing.

    At all steps of this process should you log out to some developer accessible log, such as a slack integration with the build tool.
