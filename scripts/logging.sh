#!/bin/bash
# @file logging.sh
#
# @version 1.0
#
# @author Calum Judd Anderson
#
# @brief Contains some basic handles for common logging

function logInfo() {
    printf "\e[37m[INFO] $0\e[0m\n";
}

function logWarn() {
    printf "\e[35m[WARN] $0\e[0m\n";
}

function logError() {
    printf "\e[31m[ERROR] $0\e[0m\n";
}
