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
  sudo ansible-galaxy install -r requirements.yml

  # - setup dev machine
  ansible-playbook plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars "@config.yml"
  # - Provision
  ansible-playbook plays/spinup-env.yml --extra-vars "@config.yml"
  # - Deploy

  exit 0
}

echo "OSTYPE: $OSTYPE"
case "$OSTYPE" in
  solaris*) echo "SOLARIS not supported (yet)." ;;
  darwin*) setup_osx ;;
  linux*) echo "LINUX not supported (yet)." ;;
  bsd*) echo "BSD not supported (yet)." ;;
  msys*) "Windows not supported (yet)." ;;
  *) echo "unknown: $OSTYPE not supported (yet)." ;;
esac
