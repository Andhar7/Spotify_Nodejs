#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/test-helpers.sh"

test_users_stats() {
    print_header "USERS & STATS TESTS"

    # ===== USER TESTS =====
    print_test "GET /users - Get all users"
    response=$(api_get "/users" "Get all users" 200)

    # Extract a user ID for message tests
    OTHER_USER_ID=$(echo "$response" | grep -o '"id":[0-9]*' | tail -1 | cut -d':' -f2)
    print_info "Found other user ID: $OTHER_USER_ID"

    # Test messaging endpoints
    if [ -n "$OTHER_USER_ID" ] && [ "$OTHER_USER_ID" != "$USER_ID" ]; then
        print_test "GET /users/messages/:userId - Get messages with user"
        api_get "/users/messages/${OTHER_USER_ID}" "Get messages with user" 200

        print_test "POST /users/messages - Send message to user"
        api_post "/users/messages" "{
            \"receiverId\": \"${OTHER_USER_ID}\",
            \"content\": \"Hello from API test!\"
        }" "Send message" 201

        sleep_with_message 1 "Waiting for message to be stored"

        print_test "GET /users/messages/:userId - Get messages after sending"
        api_get "/users/messages/${OTHER_USER_ID}" "Get messages after sending" 200
    else
        print_info "Skipping message tests (no other user available or same user)"
    fi

    # Test sending message without content
    print_test "POST /users/messages - Send empty message (should fail)"
    api_post "/users/messages" "{
        \"receiverId\": \"${OTHER_USER_ID}\",
        \"content\": \"\"
    }" "Send empty message (should fail)" 400

    # Test sending message without receiverId
    print_test "POST /users/messages - Send message without receiver (should fail)"
    api_post "/users/messages" "{
        \"content\": \"Test message\"
    }" "Send message without receiver (should fail)" 400

    # ===== STATS TESTS =====
    print_test "GET /stats - Get platform statistics"
    response=$(api_get "/stats" "Get statistics" 200)

    # Parse stats
    TOTAL_SONGS=$(echo "$response" | grep -o '"totalSongs":[0-9]*' | cut -d':' -f2)
    TOTAL_ALBUMS=$(echo "$response" | grep -o '"totalAlbums":[0-9]*' | cut -d':' -f2)
    TOTAL_USERS=$(echo "$response" | grep -o '"totalUsers":[0-9]*' | cut -d':' -f2)
    TOTAL_ARTISTS=$(echo "$response" | grep -o '"totalArtists":[0-9]*' | cut -d':' -f2)

    echo "$response"

    print_info "Platform Statistics:"
    print_info "  - Total Songs: $TOTAL_SONGS"
    print_info "  - Total Albums: $TOTAL_ALBUMS"
    print_info "  - Total Users: $TOTAL_USERS"
    print_info "  - Total Artists: $TOTAL_ARTISTS"

    print_info "Users & Stats tests completed"
}

# Export the function
export -f test_users_stats
