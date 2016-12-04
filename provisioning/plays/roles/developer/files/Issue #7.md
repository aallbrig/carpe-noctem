Create Jenkins Job Groups, plug in a Builder and create a Jenkins view

We must
1. Organize current Jenkins Jobs (JJ) into the phases that represent a automated, continuous delivery process.  To this end we must create new Jenkins Job Groups (JJG)(http://docs.openstack.org/infra/jenkins-job-builder/definition.html#job-group), new Jenkins Views (JV)(http://docs.openstack.org/infra/jenkins-job-builder/definition.html#views), and new Jenkins Porjects (JP)(http://docs.openstack.org/infra/jenkins-job-builder/definition.html#project)

    Therefore we must fill in any missing JJ from this organized list of JJs.
    ```
    ---
    - All in list are a JJG(
        Acceptance Phase(
          checkout to disk,
          static code analysis of code on disk,
          unit test(
            api contracts are respected(
              valid request -> valid response,
              invalid request -> valid, expected response
            ),
            status codes all green for all pages and APIs,
            low fidelity highly mocked or stubbed UI tests,
            light application logic tests or whatever else
          ),
          compile source code on disk to distributable artifacts on disk,
          package distributable artifacts to appropriate external repository
        ),
        Load & Performance Phase(
          spin up target environment with infrastructure,
          create or migrate DB and populate with anonymized production data,
          deploy artifacts onto provisioned infrastructure (staging),
          health test(
            infrastructure exists,
            status codes all green for all system pages and APIs,
            third-party vendors are 200 OK
          ),
          functional test(
            api contracts are respected(
              valid request -> valid response,
              invalid request -> valid, expected response
            ),
            Can a selenium bot do all happy UX paths through UI?,
            Can a selenium bot ensure past problems don't exist related to UI?,
            Are third party vendor software panels getting expected traffic?,
            Are third party vendor software panels getting expected results?,
            Can a selenium bot play test through all levels?
          ),
          (performance test)(under ideal conditions)(
            Do site assets deliver in acceptable time under condition?,
            Do deliverables deliver in acceptable time under condition?,
            Is game running at 60 FPS across all playable contexts?,
            Are API response times still great?
          ),
          load test(
            (performance test)(under load conditions),
            Can system handle production-like traffic nominally?,
            Can system infrastructure handle a huge spike in traffic appropriately?,
            Optional manual exploration can now occur (notify stakeholders)
          )
        ),
        Release Phase(
          Rollout new artifacts to production by means of a BLUE/GREEN deploy,
          Optional "tear down staging until next change or manual intervention" can occur now (notify stakeholders)
        ),
        Production Monitoring Phase (continuous)(
          (performance test)(under production conditions),
          functional test() every so often,
          performance test() to collect additional system metrics,
          persist log history(
            for each log service in [ELK, CloudWatch infrastructure logs]
            Persist in AWS Glacier if log.date in log service is > 6 months
          )
        )
      )
    - All in list are JV(
        Available atomic jobs or phases I can rerun manually and can be rerun,
        Current environment status(
          staging,
          production
        )
      )
    - All in list are JP(
        Automated Continuous Delivery Pipeline
      )
    ```
1. Provision Jenkins VM with `HipChat` plugin (Future issue, probably)
1. Integrate with a chat client (Slack?  Discord?) to log a historic build record (and get "CloudOps" strategies going). (Future issue, probably)

    This way we can ensure we are able to talk about all deploys surrounding a deploy if things go wrong (like if we merge `stage` to `master` and the value stream breaks down at a particular location).  The first place to go will be the "#deployments" channel.

    More "master is broken" strategies include:
    - globally an automated "master is broken" announcement so everyone can debug what happened to unblock the value stream. (Future issue, probably)
    - email all registered emails that "master is broken" and a link to the `#deployments` channel. (Future issue, probably)
    - SMS the core maintainers help resolve,. (Future issue, probably)
