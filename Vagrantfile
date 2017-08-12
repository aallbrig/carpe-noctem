VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.insert_key = false

  config.vm.define "jenkins-dev" do |jenkins|
    jenkins.vm.box = "ubuntu/trusty64"
    jenkins.vm.synced_folder ".", "/vagrant", disabled: true
    jenkins.vm.network "private_network", ip: "192.168.50.4"
  end

  config.vm.define "web-dev" do |web|
    web.vm.box = "ubuntu/trusty64"
    web.vm.synced_folder ".", "/vagrant", disabled: true
    web.vm.network "private_network", ip: "192.168.50.4"
    web.vm.synced_folder "source/web/static", "/var/www/"
  end

  config.vm.define "build-dev" do |build|
    build.vm.box = "ubuntu/trusty64"
    build.vm.synced_folder ".", "/vagrant", disabled: true
    build.vm.network "private_network", ip: "192.168.50.4"
  end


end
