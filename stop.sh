# vagrant global-status | grep virtualbox | cut -c 1-9 | while read line; do echo $line; vagrant halt $line; done;

ansible-playbook provisioning/plays/teardown-dev-machine.yml

vagrant destroy --force

VBoxManage list runningvms | awk '{print $2;}' | xargs -I vmid VBoxManage controlvm vmid poweroff
