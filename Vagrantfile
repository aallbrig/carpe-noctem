VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.insert_key = false

  config.vm.define "jenkins-dev" do |jenkins|
    jenkins.vm.box = "ubuntu/trusty64"
    jenkins.vm.network "forwarded_port", guest: 8080, host: 8000
    jenkins.vm.synced_folder "/Users/aallbrig/code/carpe-noctem/plays/roles/jenkins/files/jobs", "/var/lib/jenkins/jobs"
  end
  config.vm.define "web-dev" do |web|
    web.vm.box = "ubuntu/trusty64"
    web.vm.network "forwarded_port", guest: 8080, host: 8080
    web.vm.network "forwarded_port", guest: 35729, host: 35729
  end
  config.vm.define "build-dev" do |build|
    build.vm.box = "ubuntu/trusty64"
    build.vm.network "forwarded_port", guest: 80, host: 80
  end

end
