node {
    def mvnHome
    stage(&apos;Preparation&apos;) { // for display purposes
        // Get some code from a GitHub repository
        git &apos;https://github.com/jglick/simple-maven-project-with-tests.git&apos;
        // Get the Maven tool.
        // ** NOTE: This &apos;M3&apos; Maven tool must be configured
        // **       in the global configuration.
        mvnHome = tool &apos;M3&apos;
    }
    stage(&apos;Build&apos;) {
        // Run the maven build
        if (isUnix()) {
            sh &quot;&apos;${mvnHome}/bin/mvn&apos; -Dmaven.test.failure.ignore clean package&quot;
        } else {
            bat(/&quot;${mvnHome}\bin\mvn&quot; -Dmaven.test.failure.ignore clean package/)
        }
    }
    stage(&apos;Results&apos;) {
        junit &apos;**/target/surefire-reports/TEST-*.xml&apos;
        archive &apos;target/*.jar&apos;
    }
}