function setup_osx {
  echo "osx"

  # - Install prerequisites
  pip --version
  if [[ $? != 0 ]] ; then
    echo "No valid pip installed.  Installing..."
    easy_install pip
  fi
  ansible --version
  if [[ $? != 0 ]] ; then
    echo "No valid ansible installed.  Installing..."
    pip install ansible
  fi
  ansible-galaxy install -r requirements.yml

  # - Setup local machine
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
