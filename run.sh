function setup_osx {
  echo "osx"

  # Prerequisites
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
  ansible-galaxy install -r provisioning/requirements.yml
  if [[ $? != 0 ]] ; then
    echo "ERROR: Try `sudo ansible-galaxy install -r provisioning/requirements.yml`"
    exit 1
  fi

  # - Setup local machine
  ansible-playbook provisioning/plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars "@config.yml"
  if [[ $? != 0 ]] ; then
    echo "ERROR: Rerun \`ansible-playbook provisioning/plays/setup-dev-machine.yml --ask-sudo-pass --extra-vars \"@config.yml\"\`"
    exit 1
  fi
  # - Provision
  ansible-playbook provisioning/plays/spinup-env.yml --ask-sudo-pass --extra-vars "@config.yml"
  if [[ $? != 0 ]] ; then
    echo "ERROR: Rerun \`ansible-playbook provisioning/plays/spinup-env.yml --extra-vars \"@config.yml\"\`"
    exit 1
  fi
  # - Deploy
  echo "$(echo pwd)/source/web/static/node_modules/.bin"
  export PATH="$(echo pwd)/source/web/static/node_modules/.bin:$PATH"
  exit 0
}

case "$OSTYPE" in
  solaris*) echo "SOLARIS" ;;
  darwin*) setup_osx ;;
  linux*) echo "LINUX" ;;
  bsd*) echo "BSD" ;;
  msys*) echo "windows" ;;
  *) echo "unknown: $OSTYPE" ;;
esac
