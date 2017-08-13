function setup_osx {
  echo "Detected OSX machine.  Proceeding with OS specific instructions."

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

  # - Setup local work station
  ansible-playbook provisioning/setup-workstation.yml --ask-sudo-pass

  # - Provision
  ansible-playbook provisioning/deploy-env.yml --ask-sudo-pass

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
