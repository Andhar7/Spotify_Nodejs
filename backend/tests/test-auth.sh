#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/test-helpers.sh"

test_auth() {
    print_header "AUTHENTICATION TESTS"

    # Generate random email for testing
    RANDOM_NUM=$RANDOM
    USER_EMAIL="testuser${RANDOM_NUM}@example.com"
    USER_PASSWORD="Test@123456"
    USER_NAME="Test User ${RANDOM_NUM}"

    # Test 1: Sign Up
    print_test "POST /auth/signup - Create new user"
    response=$(api_post "/auth/signup" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"$USER_PASSWORD\",
        \"name\": \"$USER_NAME\"
    }" "Sign up new user" 201)

    USER_ID=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d':' -f2)
    print_info "Created user with ID: $USER_ID"

    sleep_with_message 2 "Waiting for verification email"

    # Test 2: Try login without verification (should fail)
    print_test "POST /auth/login - Login without email verification"
    api_post "/auth/login" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"$USER_PASSWORD\"
    }" "Login without verification (should fail)" 403

    # Test 3: Verify email with code (manual step required)
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}MANUAL STEP REQUIRED:${NC}"
    echo -e "Check email: ${GREEN}${USER_EMAIL}${NC}"
    echo -e "Enter the 6-digit verification code:"
    read VERIFICATION_CODE
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    print_test "POST /auth/verify-email - Verify email with code"
    response=$(api_post "/auth/verify-email" "{
        \"code\": \"$VERIFICATION_CODE\"
    }" "Verify email" 200)

    # Test 4: Login after verification
    print_test "POST /auth/login - Login with verified account"
    response=$(api_post "/auth/login" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"$USER_PASSWORD\"
    }" "Login successfully" 200)

    # Extract token from response (it's set as cookie)
    ACCESS_TOKEN=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$ACCESS_TOKEN" ]; then
        # Try to extract from user object
        USER_ID=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d':' -f2)
    fi
    print_info "Login successful, token obtained"

    # Test 5: Check authentication status
    print_test "GET /auth/check-auth - Check authentication status"
    api_get "/auth/check-auth" "Check auth status" 200

    # Test 6: Logout
    print_test "POST /auth/logout - Logout user"
    api_post "/auth/logout" "{}" "Logout" 200

    ACCESS_TOKEN=""
    print_info "Token cleared"

    # Test 7: Try to access protected route after logout
    print_test "GET /auth/check-auth - Check auth after logout (should fail)"
    api_get "/auth/check-auth" "Check auth after logout (should fail)" 401

    # Test 8: Login again to continue testing
    print_test "POST /auth/login - Login again for subsequent tests"
    response=$(api_post "/auth/login" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"$USER_PASSWORD\"
    }" "Login again" 200)

    ACCESS_TOKEN=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    print_info "Logged in again for subsequent tests"

    # Test 9: Forgot password
    print_test "POST /auth/forgot-password - Request password reset"
    api_post "/auth/forgot-password" "{
        \"email\": \"$USER_EMAIL\"
    }" "Request password reset" 200

    sleep_with_message 2 "Waiting for password reset email"

    # Test 10: Login with wrong password
    print_test "POST /auth/login - Login with wrong password (should fail)"
    api_post "/auth/login" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"WrongPassword123\"
    }" "Login with wrong password (should fail)" 401

    # Test 11: Sign up with existing email
    print_test "POST /auth/signup - Sign up with existing email (should fail)"
    api_post "/auth/signup" "{
        \"email\": \"$USER_EMAIL\",
        \"password\": \"$USER_PASSWORD\",
        \"name\": \"Another User\"
    }" "Sign up with existing email (should fail)" 400

    print_info "Auth tests completed. User email: $USER_EMAIL"
}

# Export the function
export -f test_auth
