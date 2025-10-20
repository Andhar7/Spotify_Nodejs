#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/test-helpers.sh"

test_songs() {
    print_header "SONG TESTS"

    # Test 1: Get all songs
    print_test "GET /songs - Get all songs"
    response=$(api_get "/songs" "Get all songs" 200)

    # Extract first song ID for later tests
    SONG_ID=$(echo "$response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    print_info "Found song ID: $SONG_ID"

    # Test 2: Get random songs
    print_test "GET /songs/random - Get random songs"
    api_get "/songs/random" "Get 6 random songs" 200

    # Test 3: Get featured songs
    print_test "GET /songs/featured - Get featured songs"
    api_get "/songs/featured" "Get featured songs" 200

    # Test 4: Get trending songs
    print_test "GET /songs/trending - Get trending songs"
    api_get "/songs/trending" "Get trending songs" 200

    # Test 5: Get song by ID
    if [ -n "$SONG_ID" ]; then
        print_test "GET /songs/:id - Get song by ID"
        api_get "/songs/${SONG_ID}" "Get song by ID" 200
    else
        print_info "Skipping song by ID test (no song ID available)"
    fi

    # Test 6: Get non-existent song
    print_test "GET /songs/99999 - Get non-existent song (should fail)"
    api_get "/songs/99999" "Get non-existent song (should fail)" 404

    # Test 7: Get random songs with custom limit
    print_test "GET /songs/random?limit=3 - Get 3 random songs"
    api_get "/songs/random?limit=3" "Get 3 random songs" 200

    print_info "Song tests completed"
}

# Export the function
export -f test_songs
