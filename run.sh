function setup_osx {
  echo "osx"

  # - Install prerequisites
  pip --version
  if [[ $? != 0 ]] ; then
    echo "No valid pip installed.  Installing..."
    sudo easy_install pip
  fi
  ansible --version
  if [[ $? != 0 ]] ; then
    echo "No valid ansible installed.  Installing..."
    sudo pip install ansible
  fi
  ansible-galaxy install -r requirements.yml

  # - setup dev machine
  ansible-playbook plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars "@config.yml"
  # - Provision
  ansible-playbook plays/spinup-env.yml --extra-vars "@config.yml"
  # - Deploy
  # ansible-playbook

  echo "process complete"
  exit 0
}

function setup_windows {
  echo "windows"
}

echo "OSTYPE: $OSTYPE"
case "$OSTYPE" in
  solaris*) echo "SOLARIS" ;;
  darwin*) setup_osx ;;
  linux*) echo "LINUX" ;;
  bsd*) echo "BSD" ;;
  msys*) setup_windows ;;
  *) echo "unknown: $OSTYPE" ;;
esac
