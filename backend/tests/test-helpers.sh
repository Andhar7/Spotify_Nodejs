#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:5001/api"

# Global variables for storing tokens and user data
ACCESS_TOKEN=""
USER_ID=""
USER_EMAIL=""
SONG_ID=""
ALBUM_ID=""
ADMIN_EMAIL="east.strategi.company@gmail.com"

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print colored output
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_test() {
    echo -e "${YELLOW}Testing: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ PASSED: $1${NC}"
    ((PASSED_TESTS++))
    ((TOTAL_TESTS++))
}

print_failure() {
    echo -e "${RED}✗ FAILED: $1${NC}"
    echo -e "${RED}   Response: $2${NC}"
    ((FAILED_TESTS++))
    ((TOTAL_TESTS++))
}

print_info() {
    echo -e "${CYAN}ℹ Info: $1${NC}"
}

print_summary() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}TEST SUMMARY${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "Total Tests: ${TOTAL_TESTS}"
    echo -e "${GREEN}Passed: ${PASSED_TESTS}${NC}"
    echo -e "${RED}Failed: ${FAILED_TESTS}${NC}"
    if [ $FAILED_TESTS -eq 0 ]; then
        echo -e "${GREEN}All tests passed! 🎉${NC}"
    else
        echo -e "${RED}Some tests failed! ❌${NC}"
    fi
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Function to make GET request
api_get() {
    local endpoint=$1
    local description=$2
    local expected_status=${3:-200}

    print_test "$description"

    if [ -n "$ACCESS_TOKEN" ]; then
        response=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -b "token=${ACCESS_TOKEN}")
    else
        response=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "$expected_status" ]; then
        print_success "$description (Status: $http_code)"
        echo "$body"
    else
        print_failure "$description (Expected: $expected_status, Got: $http_code)" "$body"
        echo "$body"
    fi
}

# Function to make POST request
api_post() {
    local endpoint=$1
    local data=$2
    local description=$3
    local expected_status=${4:-200}

    print_test "$description"

    if [ -n "$ACCESS_TOKEN" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -b "token=${ACCESS_TOKEN}" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "$expected_status" ]; then
        print_success "$description (Status: $http_code)"
        echo "$body"
    else
        print_failure "$description (Expected: $expected_status, Got: $http_code)" "$body"
        echo "$body"
    fi
}

# Function to make DELETE request
api_delete() {
    local endpoint=$1
    local description=$2
    local expected_status=${3:-200}

    print_test "$description"

    if [ -n "$ACCESS_TOKEN" ]; then
        response=$(curl -s -w "\n%{http_code}" -X DELETE "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json" \
            -b "token=${ACCESS_TOKEN}")
    else
        response=$(curl -s -w "\n%{http_code}" -X DELETE "${BASE_URL}${endpoint}" \
            -H "Content-Type: application/json")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "$expected_status" ]; then
        print_success "$description (Status: $http_code)"
        echo "$body"
    else
        print_failure "$description (Expected: $expected_status, Got: $http_code)" "$body"
        echo "$body"
    fi
}

# Function to make multipart form-data POST request
api_post_multipart() {
    local endpoint=$1
    local description=$2
    local expected_status=${3:-201}
    shift 3
    local form_data=("$@")

    print_test "$description"

    local curl_cmd="curl -s -w \"\n%{http_code}\" -X POST \"${BASE_URL}${endpoint}\""

    if [ -n "$ACCESS_TOKEN" ]; then
        curl_cmd="$curl_cmd -b \"token=${ACCESS_TOKEN}\""
    fi

    for field in "${form_data[@]}"; do
        curl_cmd="$curl_cmd -F \"$field\""
    done

    response=$(eval $curl_cmd)

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "$expected_status" ]; then
        print_success "$description (Status: $http_code)"
        echo "$body"
    else
        print_failure "$description (Expected: $expected_status, Got: $http_code)" "$body"
        echo "$body"
    fi
}

# Function to extract JSON value
extract_json_value() {
    local json=$1
    local key=$2
    echo "$json" | grep -o "\"$key\":\"[^\"]*\"" | cut -d'"' -f4
}

# Function to wait for user input
wait_for_continue() {
    echo -e "\n${YELLOW}Press Enter to continue...${NC}"
    read
}

# Function to sleep with message
sleep_with_message() {
    local seconds=$1
    local message=$2
    print_info "$message (waiting ${seconds}s)"
    sleep $seconds
}
