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
  ansible-galaxy install \
  -r provisioning/requirements.yml
  if [[ $? != 0 ]] ; then
    echo "ERROR: Try `sudo ansible-galaxy install -r provisioning/requirements.yml`"
    exit 1
  fi

  # - Setup local machine
  ansible-playbook provisioning/setup-workstation.yml \
  --ask-sudo-pass \
  --extra-vars "developer=False operations=False artist=False vagrant=False sampleRuns=False"

  if [[ $? != 0 ]] ; then
    echo EndOfMessage
ERROR: Rerun ansible-playbook provisioning/setup-workstation.yml --ask-sudo-pass --extra-vars "developer=false operations=false artist=false"
EndOfMessage
    exit 1
  fi
  # - Provision
  ansible-playbook provisioning/deploy-env.yml --ask-sudo-pass
  if [[ $? != 0 ]] ; then
    echo "ERROR: Rerun \`ansible-playbook provisioning/deploy-env.yml\`"
    exit 1
  fi
  # Temporarily add node_modules/.bin to $PATH
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
