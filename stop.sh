# vagrant global-status | grep virtualbox | cut -c 1-9 | while read line; do echo $line; vagrant halt $line; done;

ansible-playbook plays/teardown-dev-machine.yml -i inventories/dev/hosts.ini

vagrant destroy --force

VBoxManage list runningvms | awk '{print $2;}' | xargs -I vmid VBoxManage controlvm vmid poweroff
