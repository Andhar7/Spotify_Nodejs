#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/test-helpers.sh"

test_albums() {
    print_header "ALBUM TESTS"

    # Test 1: Get all albums
    print_test "GET /albums - Get all albums"
    response=$(api_get "/albums" "Get all albums" 200)

    # Extract first album ID for later tests
    ALBUM_ID=$(echo "$response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    print_info "Found album ID: $ALBUM_ID"

    # Test 2: Get album by ID with songs
    if [ -n "$ALBUM_ID" ]; then
        print_test "GET /albums/:id - Get album by ID with songs"
        api_get "/albums/${ALBUM_ID}" "Get album with songs" 200
    else
        print_info "Skipping album by ID test (no album ID available)"
    fi

    # Test 3: Get non-existent album
    print_test "GET /albums/99999 - Get non-existent album (should fail)"
    api_get "/albums/99999" "Get non-existent album (should fail)" 404

    print_info "Album tests completed"
}

# Export the function
export -f test_albums
