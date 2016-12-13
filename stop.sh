ansible-playbook provisioning/teardown-dev-machine.yml

vagrant destroy --force

VBoxManage list runningvms | awk '{print $2;}' | xargs -I vmid VBoxManage controlvm vmid poweroff
