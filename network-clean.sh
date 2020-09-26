#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0

echo "deleting files"
cd "/home/venkat/hyper-samp/fabric-samples/paymtrecon/organization/bankofgotham/identity/user/jeeva/wallet/"
rm *
cd "/home/venkat/hyper-samp/fabric-samples/paymtrecon/organization/gothamgeneralhospital/identity/user/venkat/wallet/"
rm *
cd "/home/venkat/hyper-samp/fabric-samples/paymtrecon/organization/waynehealth/identity/user/elayabharathi/wallet/"
rm *

cd "/home/venkat/hyper-samp/fabric-samples/paymtrecon"

function _exit(){
    printf "Exiting:%s\n" "$1"
    exit -1
}

# Exit on first error, print all commands.
set -ev
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export FABRIC_CFG_PATH="${DIR}/../config"

cd "${DIR}/../test-network/"

docker kill cliBankOfGotham cliWayneHealth cliGothamGeneralHospital logspout || true
./network.sh down

# remove any stopped containers
docker rm $(docker ps -aq)
