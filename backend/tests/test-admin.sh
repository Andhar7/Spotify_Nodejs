#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/test-helpers.sh"

test_admin() {
    print_header "ADMIN TESTS"

    # Test 1: Check admin status
    print_test "GET /admin/check - Check admin status"
    api_get "/admin/check" "Check admin status" 200

    # Note about file uploads
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}FILE UPLOAD TESTS:${NC}"
    echo -e "File upload tests require actual audio and image files."
    echo -e "For testing purposes, you need to have test files ready."
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    # Test 2: Create test files if they don't exist
    TEST_DIR="$(dirname "$0")/test-files"
    mkdir -p "$TEST_DIR"

    # Create dummy audio file (silent MP3)
    TEST_AUDIO="$TEST_DIR/test-audio.mp3"
    if [ ! -f "$TEST_AUDIO" ]; then
        print_info "Creating test audio file..."
        # Create a minimal MP3 file (just headers, won't play but valid for upload testing)
        printf '\xFF\xFB\x90\x00' > "$TEST_AUDIO"
        for i in {1..1000}; do
            printf '\x00' >> "$TEST_AUDIO"
        done
    fi

    # Create dummy image file (1x1 pixel PNG)
    TEST_IMAGE="$TEST_DIR/test-image.png"
    if [ ! -f "$TEST_IMAGE" ]; then
        print_info "Creating test image file..."
        # Create a minimal 1x1 PNG file
        printf '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1F\x15\xC4\x89\x00\x00\x00\x0A\x49\x44\x41\x54\x78\x9C\x63\x00\x01\x00\x00\x05\x00\x01\x0D\x0A\x2D\xB4\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82' > "$TEST_IMAGE"
    fi

    print_info "Test files ready at: $TEST_DIR"

    # Test 3: Create song without authentication (should fail if auth middleware is enabled)
    print_test "POST /admin/songs - Create song (testing with files)"

    response=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/admin/songs" \
        -b "token=${ACCESS_TOKEN}" \
        -F "title=Test Song API" \
        -F "artist=Test Artist" \
        -F "duration=180" \
        -F "audioFile=@${TEST_AUDIO}" \
        -F "imageFile=@${TEST_IMAGE}")

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "201" ]; then
        print_success "Create song (Status: $http_code)"
        CREATED_SONG_ID=$(echo "$body" | grep -o '"id":[0-9]*' | cut -d':' -f2)
        print_info "Created song with ID: $CREATED_SONG_ID"
        echo "$body"
    else
        print_failure "Create song (Expected: 201, Got: $http_code)" "$body"
        echo "$body"
    fi

    # Test 4: Create song without required fields (should fail)
    print_test "POST /admin/songs - Create song without files (should fail)"
    api_post "/admin/songs" "{
        \"title\": \"Test Song\",
        \"artist\": \"Test Artist\",
        \"duration\": 180
    }" "Create song without files (should fail)" 400

    # Test 5: Create album
    print_test "POST /admin/albums - Create album"

    response=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/admin/albums" \
        -b "token=${ACCESS_TOKEN}" \
        -F "title=Test Album API" \
        -F "artist=Test Artist" \
        -F "releaseYear=2024" \
        -F "imageFile=@${TEST_IMAGE}")

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq "201" ]; then
        print_success "Create album (Status: $http_code)"
        CREATED_ALBUM_ID=$(echo "$body" | grep -o '"id":[0-9]*' | cut -d':' -f2)
        print_info "Created album with ID: $CREATED_ALBUM_ID"
        echo "$body"
    else
        print_failure "Create album (Expected: 201, Got: $http_code)" "$body"
        echo "$body"
    fi

    # Test 6: Create album without image (should fail)
    print_test "POST /admin/albums - Create album without image (should fail)"
    api_post "/admin/albums" "{
        \"title\": \"Test Album\",
        \"artist\": \"Test Artist\",
        \"releaseYear\": 2024
    }" "Create album without image (should fail)" 400

    # Test 7: Delete created song
    if [ -n "$CREATED_SONG_ID" ]; then
        print_test "DELETE /admin/songs/:id - Delete created song"
        api_delete "/admin/songs/${CREATED_SONG_ID}" "Delete song" 200
        print_info "Deleted song with ID: $CREATED_SONG_ID"
    else
        print_info "Skipping song deletion (no song was created)"
    fi

    # Test 8: Delete non-existent song
    print_test "DELETE /admin/songs/99999 - Delete non-existent song (should fail)"
    api_delete "/admin/songs/99999" "Delete non-existent song (should fail)" 404

    # Test 9: Delete created album
    if [ -n "$CREATED_ALBUM_ID" ]; then
        print_test "DELETE /admin/albums/:id - Delete created album"
        api_delete "/admin/albums/${CREATED_ALBUM_ID}" "Delete album" 200
        print_info "Deleted album with ID: $CREATED_ALBUM_ID"
    else
        print_info "Skipping album deletion (no album was created)"
    fi

    # Test 10: Delete non-existent album
    print_test "DELETE /admin/albums/99999 - Delete non-existent album (should fail)"
    api_delete "/admin/albums/99999" "Delete non-existent album (should fail)" 404

    print_info "Admin tests completed"
}

# Export the function
export -f test_admin
